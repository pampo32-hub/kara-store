import React from 'react';
import { Product } from '../types/store';
import { ArrowUpRight } from 'lucide-react';

interface LookbookSectionProps {
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onSelectProduct,
  products
}) => {
  const looks = [
    {
      title: 'Look 01: Streetwear & Cargo Chic',
      description: 'Top en punto canalé off-the-shoulder con manga acampanada y minifalda denim cargo con faja.',
      productId: 'kara-002',
      palette: ['#949599', '#5B86B6', '#1C1917'],
      category: 'Top Ventas'
    },
    {
      title: 'Look 02: Sastrería Old Money',
      description: 'Chaleco corset camel strapless con botonadura central y minifalda blanca de tablas prensadas.',
      productId: 'kara-007',
      palette: ['#C29B68', '#FFFFFF', '#D1D5DB'],
      category: 'Elegancia Casual'
    },
    {
      title: 'Look 03: Silueta Palazzo Turquesa',
      description: 'Enterizo de exhibición en crepé elástico con escote cuadrado y bota acampanada flare.',
      productId: 'kara-010',
      palette: ['#0D9488', '#FBF9F5', '#8C8275'],
      category: 'Exhibición Boutique'
    }
  ];

  return (
    <section id="lookbook" className="py-16 sm:py-24 border-b border-[#EAE4D9] bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8C8275]">
              Estilismos de Instagram
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal mt-1">
              Outfits Inspirados en @kara_shop_cr
            </h2>
          </div>
          <p className="text-xs text-[#78716C] max-w-sm leading-relaxed">
            Ideas de combinaciones con nuestras 10 prendas estrella para armar un clóset cápsula versátil y aesthetic.
          </p>
        </div>

        {/* 3 Looks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {looks.map((look) => {
            const product = products.find((p) => p.id === look.productId);
            if (!product) return null;

            return (
              <div
                key={look.title}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col justify-between bg-[#F4EFE6]/50 border border-[#EAE4D9] p-6 hover:border-[#D0C7B8] transition-all duration-300 cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE4D9]">
                    <img
                      src={product.image}
                      alt={look.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (product.fallbackImage && target.src !== product.fallbackImage) {
                          target.src = product.fallbackImage;
                        } else if (!target.src.includes('/images/')) {
                          const match = target.src.match(/(kara_real_[^./"\s]+\.jpg)/);
                          if (match) target.src = `/images/${match[1]}`;
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#FBF9F5]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#57534E]">
                      {look.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl text-[#1C1917] group-hover:text-[#57534E] transition-colors">
                        {look.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-[#8C8275] group-hover:text-[#1C1917] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {look.description}
                    </p>
                  </div>
                </div>

                {/* Color swatches in look */}
                <div className="pt-4 mt-4 border-t border-[#EAE4D9] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {look.palette.map((color, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8275] ml-1">Tonos Claros</span>
                  </div>

                  <span className="text-xs font-mono tabular-nums font-semibold text-[#1C1917]">
                    ₡ {product.priceCRC.toLocaleString('es-CR')}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
