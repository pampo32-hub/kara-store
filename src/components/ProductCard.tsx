import React, { useState } from 'react';
import { Product, ProductColor } from '../types/store';
import { Eye, Plus, Check, Bookmark, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [imgSrc, setImgSrc] = useState<string>(product.image);
  const [addedNotice, setAddedNotice] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Sync if product changes
  React.useEffect(() => {
    setImgSrc(product.image);
  }, [product.image]);

  const handleImageError = () => {
    if (product.fallbackImage && imgSrc !== product.fallbackImage) {
      setImgSrc(product.fallbackImage);
    } else if (!imgSrc.startsWith('/images/')) {
      const match = imgSrc.match(/(kara_real_[^./"\s]+\.jpg)/);
      if (match) {
        setImgSrc(`/images/${match[1]}`);
      }
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    onQuickAdd(product, defaultSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1600);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group relative flex flex-col bg-white border border-[#EAE4D9] shadow-xs hover:shadow-md hover:border-[#D5CDC0] transition-all duration-300 cursor-pointer overflow-hidden rounded-sm"
    >
      {/* Decorative Washi Tape Accent at top */}
      <div className="washi-tape washi-pink -top-1.5 left-6" />

      {/* Product Image Stage (Polaroid / Catalog cut) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2]">
        
        {/* Soft placeholder backing */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#FAF7F2] text-[#78716C] p-3 text-center">
          <span className="font-handwriting text-base opacity-40">{product.name}</span>
        </div>

        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] z-10"
        />

        {/* Quiet Tag styled as cute scrapbook sticker */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-[#FFF1F2]/95 backdrop-blur-xs px-2.5 py-1 text-[10px] tracking-wider uppercase font-bold text-[#9F1239] border border-[#FDA4AF] shadow-2xs rotate-[-1deg]">
            {product.tag}
          </div>
        )}

        {/* Heart like button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-label="Guardar en favoritos"
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-[#881337] shadow-xs hover:scale-110 transition-transform"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#78716C]'}`} />
        </button>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            disabled={addedNotice}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1C1917]/95 hover:bg-[#881337] text-white text-xs font-medium tracking-wider uppercase backdrop-blur-xs transition-colors cursor-pointer"
          >
            {addedNotice ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Añadido</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir a Bolsa</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            aria-label="Ver detalles"
            className="p-2.5 bg-white/95 hover:bg-white text-[#1C1917] border border-[#DDD5C7] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3 bg-white">
        
        <div>
          {/* Category & Material Kicker */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#9F1239] font-medium mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[140px] text-[#78716C]">{product.fabric}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg text-[#1C1917] group-hover:text-[#881337] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#78716C] line-clamp-1 mt-0.5">
            {product.fit}
          </p>
        </div>

        {/* Color Swatches, Price in Colones & Apartado note */}
        <div className="pt-2 border-t border-[#F0EBE1] space-y-2">
          <div className="flex items-center justify-between">
            {/* Swatches */}
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                      isSelected ? 'ring-1 ring-[#881337] ring-offset-2 scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>

            {/* Price (in Costa Rican colones) */}
            <div className="flex items-baseline gap-2">
              {product.originalPriceCRC && (
                <span className="text-xs text-[#A8A29E] line-through font-mono tabular-nums">
                  ₡ {product.originalPriceCRC.toLocaleString('es-CR')}
                </span>
              )}
              <span className="font-mono tabular-nums text-sm sm:text-base font-bold text-[#881337]">
                ₡ {product.priceCRC.toLocaleString('es-CR')}
              </span>
            </div>
          </div>

          {/* Apartado note with gold badge */}
          <div className="flex items-center justify-between text-[10px] text-[#713F12] pt-0.5 font-medium">
            <span className="flex items-center gap-1 bg-[#FEF9C3] px-2 py-0.5 rounded-xs border border-[#FDE047]">
              <Bookmark className="w-3 h-3 text-[#A16207]" />
              <span>Apartá: <strong>₡ {(product.priceCRC * 0.5).toLocaleString('es-CR')}</strong></span>
            </span>
            <span className="text-[#8C8275]">Tallas: {product.sizes.map(s => s.split(' ')[0]).join(', ')}</span>
          </div>
        </div>

      </div>
    </article>
  );
};
