import os
from PIL import Image, ImageFilter
import numpy as np

def get_contours_with_holes(mask, min_len=8):
    """
    Traces all boundary transitions (both 0->1 for outer and 1->0 for holes).
    """
    h, w = mask.shape
    # Pad by 1
    p = np.pad(mask.astype(np.uint8), 1, mode='constant', constant_values=0)
    
    visited_edges = set()
    contours = []
    
    # Directions: (dx, dy)
    dirs = [(1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0), (-1, -1), (0, -1), (1, -1)]
    
    for y in range(1, h + 1):
        for x in range(1, w + 1):
            val = p[y, x]
            prev_x = p[y, x - 1]
            # Transition: 0 -> 1 (outer border) or 1 -> 0 (inner hole)
            if val != prev_x:
                edge = (x, y, 0 if val > prev_x else 4)
                if edge in visited_edges:
                    continue
                
                # Trace boundary
                contour = []
                cx, cy = x, y
                # if 0 -> 1, we are on the pixel (cx, cy). If 1 -> 0, prev was inside, but we can trace along (cx-1, cy).
                target_val = 1
                curr_px, curr_py = (cx, cy) if val == 1 else (cx - 1, cy)
                
                # Follow boundary of 1s
                c_start = (curr_px, curr_py)
                curr_p = c_start
                curr_dir = 0
                
                step = 0
                path_pts = []
                while step < 10000:
                    path_pts.append((curr_p[0] - 1, curr_p[1] - 1)) # unpad
                    # Search around curr_p for next pixel equal to 1
                    # Start search from (curr_dir + 5) % 8
                    found = False
                    search_start = (curr_dir + 5) % 8
                    for i in range(8):
                        d_idx = (search_start + i) % 8
                        nx = curr_p[0] + dirs[d_idx][0]
                        ny = curr_p[1] + dirs[d_idx][1]
                        if 0 <= ny < p.shape[0] and 0 <= nx < p.shape[1] and p[ny, nx] == 1:
                            visited_edges.add((curr_p[0], curr_p[1], d_idx))
                            curr_p = (nx, ny)
                            curr_dir = d_idx
                            found = True
                            break
                    if not found or (curr_p == c_start and step > 1):
                        break
                    step += 1
                
                if len(path_pts) >= min_len:
                    contours.append(path_pts)
                    
    return contours

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

def smooth_curve(pts):
    if len(pts) < 3:
        return ""
    p = list(pts)
    if p[0] != p[-1]:
        p.append(p[0])
    n = len(p)
    d = [f"M {p[0][0]:.1f} {p[0][1]:.1f}"]
    for i in range(n - 1):
        p0 = p[(i - 1) % (n - 1)]
        p1 = p[i]
        p2 = p[i + 1]
        p3 = p[(i + 2) % (n - 1)]
        cp1x = p1[0] + (p2[0] - p0[0]) / 6.0
        cp1y = p1[1] + (p2[1] - p0[1]) / 6.0
        cp2x = p2[0] - (p3[0] - p1[0]) / 6.0
        cp2y = p2[1] - (p3[1] - p1[1]) / 6.0
        d.append(f"C {cp1x:.1f} {cp1y:.1f}, {cp2x:.1f} {cp2y:.1f}, {p2[0]:.1f} {p2[1]:.1f}")
    d.append("Z")
    return " ".join(d)

print("Contour algorithm ready")
