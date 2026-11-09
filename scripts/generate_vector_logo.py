import os
from PIL import Image, ImageFilter
import numpy as np

def label_components(mask):
    h, w = mask.shape
    labeled = np.zeros((h, w), dtype=int)
    cur_label = 0
    for y in range(h):
        for x in range(w):
            if mask[y, x] and labeled[y, x] == 0:
                cur_label += 1
                q = [(x, y)]
                labeled[y, x] = cur_label
                while q:
                    cx, cy = q.pop()
                    for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
                        nx, ny = cx + dx, cy + dy
                        if 0 <= nx < w and 0 <= ny < h:
                            if mask[ny, nx] and labeled[ny, nx] == 0:
                                labeled[ny, nx] = cur_label
                                q.append((nx, ny))
    return labeled, cur_label

def trace_component_outer(comp_mask):
    p = np.pad(comp_mask, 1, mode='constant', constant_values=False)
    ys, xs = np.where(p)
    if len(ys) == 0: return []
    idx = np.lexsort((xs, ys))[0]
    start_y, start_x = ys[idx], xs[idx]
    
    dirs = [(1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0), (-1, -1), (0, -1), (1, -1)]
    
    contour = []
    cx, cy = start_x, start_y
    cdir = 0
    start_p = (cx, cy)
    first_step = True
    
    for _ in range(10000):
        contour.append((cx - 1, cy - 1))
        found = False
        s_dir = (cdir + 5) % 8
        for i in range(8):
            d = (s_dir + i) % 8
            nx, ny = cx + dirs[d][0], cy + dirs[d][1]
            if p[ny, nx]:
                cdir = d
                cx, cy = nx, ny
                found = True
                break
        if not found:
            break
        if not first_step and (cx, cy) == start_p:
            break
        first_step = False
        
    return contour

def find_holes(comp_mask):
    ys, xs = np.where(comp_mask)
    if len(ys) == 0: return []
    min_x, max_x = xs.min(), xs.max()
    min_y, max_y = ys.min(), ys.max()
    
    sub = comp_mask[min_y:max_y+1, min_x:max_x+1]
    hole_candidates = ~sub
    sh, sw = sub.shape
    outside = np.zeros((sh, sw), dtype=bool)
    q = []
    for x in range(sw):
        if hole_candidates[0, x]: q.append((x, 0)); outside[0, x] = True
        if hole_candidates[sh-1, x]: q.append((x, sh-1)); outside[sh-1, x] = True
    for y in range(sh):
        if hole_candidates[y, 0]: q.append((0, y)); outside[y, 0] = True
        if hole_candidates[y, sw-1]: q.append((sw-1, y)); outside[y, sw-1] = True
    while q:
        cx, cy = q.pop()
        for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < sw and 0 <= ny < sh:
                if hole_candidates[ny, nx] and not outside[ny, nx]:
                    outside[ny, nx] = True
                    q.append((nx, ny))
                    
    actual_holes = hole_candidates & (~outside)
    if not np.any(actual_holes):
        return []
        
    # We may have multiple holes or one hole
    labeled_holes, n_holes = label_components(actual_holes)
    hole_contours = []
    for h_id in range(1, n_holes + 1):
        if np.sum(labeled_holes == h_id) < 5: continue
        full_hole = np.zeros_like(comp_mask)
        full_hole[min_y:max_y+1, min_x:max_x+1] = (labeled_holes == h_id)
        hc = trace_component_outer(full_hole)
        if len(hc) >= 5:
            hole_contours.append(hc)
    return hole_contours

def rdp(pts, epsilon):
    if len(pts) < 3:
        return pts
    pts = np.array(pts, dtype=float)
    start, end = pts[0], pts[-1]
    seg = end - start
    seg_len = np.linalg.norm(seg)
    if seg_len == 0:
        dists = np.linalg.norm(pts - start, axis=1)
    else:
        unit = seg / seg_len
        vecs = pts - start
        proj = np.dot(vecs, unit)[:, None] * unit
        dists = np.linalg.norm(vecs - proj, axis=1)
    max_idx = np.argmax(dists)
    max_d = dists[max_idx]
    if max_d > epsilon:
        r1 = rdp(pts[:max_idx + 1].tolist(), epsilon)
        r2 = rdp(pts[max_idx:].tolist(), epsilon)
        return r1[:-1] + r2
    return [pts[0].tolist(), pts[-1].tolist()]

def smooth_curve(pts, scale=1.0):
    if len(pts) < 3:
        return ""
    p = [[pt[0] * scale, pt[1] * scale] for pt in pts]
    if p[0] != p[-1]:
        p.append(p[0])
    n = len(p)
    d = [f"M {p[0][0]:.2f} {p[0][1]:.2f}"]
    for i in range(n - 1):
        p0 = p[(i - 1) % (n - 1)]
        p1 = p[i]
        p2 = p[i + 1]
        p3 = p[(i + 2) % (n - 1)]
        cp1x = p1[0] + (p2[0] - p0[0]) / 6.0
        cp1y = p1[1] + (p2[1] - p0[1]) / 6.0
        cp2x = p2[0] - (p3[0] - p1[0]) / 6.0
        cp2y = p2[1] - (p3[1] - p1[1]) / 6.0
        d.append(f"C {cp1x:.2f} {cp1y:.2f}, {cp2x:.2f} {cp2y:.2f}, {p2[0]:.2f} {p2[1]:.2f}")
    d.append("Z")
    return " ".join(d)

def main():
    img_path = r'C:\Users\Juan\.gemini\antigravity\brain\66aa3396-e8f7-4b6b-9942-70cc099e0f5f\.user_uploaded\media_1794258032541_262aa8a2.png'
    orig = Image.open(img_path).convert('RGB')
    w, h = orig.size
    
    # Scale up 4x for smooth edge interpolation
    S = 4
    large = orig.resize((w * S, h * S), Image.Resampling.LANCZOS)
    arr = np.array(large)
    
    # White mask
    white_mask = (arr[:,:,0] > 220) & (arr[:,:,1] > 220) & (arr[:,:,2] > 220)
    # Heart mask
    heart_mask = (arr[:,:,2] > 220) & (arr[:,:,1] > 200) & (arr[:,:,0] < 210)
    # Star mask
    star_mask = (arr[:,:,0] > 235) & (arr[:,:,1] > 225) & (arr[:,:,2] < 205)
    
    # Trace white letters
    w_labeled, n_w = label_components(white_mask)
    white_paths = []
    
    for c_id in range(1, n_w + 1):
        comp = (w_labeled == c_id)
        if np.sum(comp) < 15 * S * S:
            continue
        outer = trace_component_outer(comp)
        outer_simp = rdp(outer, epsilon=1.8)
        outer_d = smooth_curve(outer_simp, scale=1.0 / S)
        
        # Check holes
        holes = find_holes(comp)
        hole_d_list = []
        for hole in holes:
            hole_simp = rdp(hole, epsilon=1.8)
            hole_d_list.append(smooth_curve(hole_simp, scale=1.0 / S))
            
        full_d = outer_d + (" " + " ".join(hole_d_list) if hole_d_list else "")
        white_paths.append(full_d)
        
    # Trace heart
    h_labeled, n_h = label_components(heart_mask)
    heart_paths = []
    for c_id in range(1, n_h + 1):
        comp = (h_labeled == c_id)
        if np.sum(comp) < 5 * S * S: continue
        outer = trace_component_outer(comp)
        outer_simp = rdp(outer, epsilon=1.2)
        heart_paths.append(smooth_curve(outer_simp, scale=1.0 / S))
        
    # Trace star
    s_labeled, n_s = label_components(star_mask)
    star_paths = []
    for c_id in range(1, n_s + 1):
        comp = (s_labeled == c_id)
        if np.sum(comp) < 5 * S * S: continue
        outer = trace_component_outer(comp)
        outer_simp = rdp(outer, epsilon=1.2)
        star_paths.append(smooth_curve(outer_simp, scale=1.0 / S))
        
    print(f"Traced: {len(white_paths)} white letters, {len(heart_paths)} heart, {len(star_paths)} star")
    
    # Create complete SVG with original aspect ratio and cropped version
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 115" width="144" height="115" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D8BCF4" />
      <stop offset="100%" stop-color="#F3CCFA" />
    </linearGradient>
  </defs>
  
  <!-- Optional background -->
  <rect width="144" height="115" rx="16" fill="url(#bgGrad)" />
  
  <!-- Letters "by fio" -->
  <g fill="#FFFFFF" fill-rule="evenodd">
    {"".join(f'<path d="{p}" />' for p in white_paths)}
  </g>
  
  <!-- Heart divider (period) -->
  <g fill="#B7E2F4">
    {"".join(f'<path d="{p}" />' for p in heart_paths)}
  </g>
  
  <!-- Star over "i" -->
  <g fill="#FCF1B2">
    {"".join(f'<path d="{p}" />' for p in star_paths)}
  </g>
</svg>'''

    with open('public/logo-with-bg.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print("Saved public/logo-with-bg.svg")
    
    # Also create a tightly cropped transparent version (viewBox ~ 5 28 135 62)
    cropped_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="5 28 135 62" width="135" height="62" fill="none">
  <!-- Letters "by fio" -->
  <g fill="currentColor" fill-rule="evenodd">
    {"".join(f'<path d="{p}" />' for p in white_paths)}
  </g>
  
  <!-- Heart divider (period) -->
  <g fill="#A5EBF2">
    {"".join(f'<path d="{p}" />' for p in heart_paths)}
  </g>
  
  <!-- Star over "i" -->
  <g fill="#FCF1B2">
    {"".join(f'<path d="{p}" />' for p in star_paths)}
  </g>
</svg>'''

    with open('public/logo.svg', 'w', encoding='utf-8') as f:
        f.write(cropped_svg)
    print("Saved public/logo.svg")

if __name__ == '__main__':
    main()
