import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { HERO_IMAGE, HERO_FALLBACK_IMAGE } from '../data/products';

interface HeroProps {
  onExplore: () => void;
  onOpenStory?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenStory }) => {
  const [heroSrc, setHeroSrc] = useState(HERO_IMAGE);

  const handleHeroError = () => {
    if (heroSrc !== HERO_FALLBACK_IMAGE) {
      setHeroSrc(HERO_FALLBACK_IMAGE);
    }
  };

  return (
    <section id="hero" className="relative border-b border-[#EAE4D9] bg-dot-grid overflow-hidden">
      
      {/* Decorative Washi Tapes */}
      <div className="washi-tape washi-yellow top-4 left-8 rotate-[-6deg]" />
      <div className="washi-tape washi-pink top-6 right-10 rotate-[8deg]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Scrapbook Diary Style */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 lg:space-y-6">
            
            {/* Cutout Letter Kicker: KARA SHOP CR */}
            <div className="flex items-center gap-1.5 flex-wrap select-none">
              <span className="cutout-box bg-[#881337] text-white text-xs" style={{ '--rot': '-2deg' } as any}>K</span>
              <span className="cutout-box bg-[#F43F5E] text-white text-xs" style={{ '--rot': '3deg' } as any}>A</span>
              <span className="cutout-box bg-[#F59E0B] text-white text-xs" style={{ '--rot': '-1deg' } as any}>R</span>
              <span className="cutout-box bg-[#3B82F6] text-white text-xs" style={{ '--rot': '2deg' } as any}>A</span>
              <span className="w-1.5" />
              <span className="cutout-box bg-[#10B981] text-white text-xs" style={{ '--rot': '-3deg' } as any}>S</span>
              <span className="cutout-box bg-[#8B5CF6] text-white text-xs" style={{ '--rot': '1deg' } as any}>H</span>
              <span className="cutout-box bg-[#EC4899] text-white text-xs" style={{ '--rot': '-2deg' } as any}>O</span>
              <span className="cutout-box bg-[#EF4444] text-white text-xs" style={{ '--rot': '2deg' } as any}>P</span>
              <span className="w-2" />
              <span className="cutout-box bg-[#FEF08A] text-[#713F12] border border-[#FACC15] text-xs font-bold" style={{ '--rot': '-1deg' } as any}>CR 🇨🇷</span>
            </div>

            <div className="space-y-2">
              <span className="font-handwriting text-2xl text-[#881337] block">
                ✨ ¡Bienvenida a nuestro clóset soñado!
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-[#1C1917] font-normal [text-wrap:balance]">
                Moda aesthetic, outfits en tendencia y siluetas para brillar.
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed max-w-xl">
              Prendas escogidas y fotografiadas por Kiara en Costa Rica. Colores claros, corsets, faldas de tablas, rib y piezas para armar los mejores looks.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExplore}
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#881337] hover:bg-[#9F1239] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm rounded-sm"
              >
                <span>Explorar Catálogo (10)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {onOpenStory && (
                <button
                  onClick={() => onOpenStory('kiara')}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-white border border-[#FDA4AF] text-[#881337] text-xs font-semibold tracking-wider uppercase hover:bg-[#FFF1F2] transition-colors rounded-sm cursor-pointer shadow-2xs"
                >
                  <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
                  <span>Conocer a Kiara</span>
                </button>
              )}
            </div>

            {/* Scrapbook Diary Snippets */}
            <div className="pt-4 border-t border-[#EAE4D9] grid grid-cols-3 gap-3 text-left">
              <div className="p-3 bg-white/90 border border-[#E8E2D7] rounded-sm rotate-[-0.5deg] shadow-2xs">
                <span className="text-sm">🦋</span>
                <p className="font-serif text-lg font-bold text-[#881337] tabular-nums mt-0.5">10</p>
                <p className="text-[11px] text-[#78716C] leading-tight">Prendas reales en stock</p>
              </div>
              <div className="p-3 bg-white/90 border border-[#E8E2D7] rounded-sm rotate-[0.5deg] shadow-2xs">
                <span className="text-sm">🎁</span>
                <p className="font-serif text-lg font-bold text-[#881337] tabular-nums mt-0.5">50%</p>
                <p className="text-[11px] text-[#78716C] leading-tight">Sistema de apartado</p>
              </div>
              <div className="p-3 bg-white/90 border border-[#E8E2D7] rounded-sm rotate-[-0.5deg] shadow-2xs">
                <span className="text-sm">📮</span>
                <p className="font-serif text-lg font-bold text-[#881337] tabular-nums mt-0.5">24-48h</p>
                <p className="text-[11px] text-[#78716C] leading-tight">Correos de Costa Rica</p>
              </div>
            </div>

          </div>

          {/* Right Column: Polaroid Showcase on Mannequin with tape */}
          <div className="lg:col-span-6 relative">
            <div className="relative p-3 sm:p-4 bg-white border border-[#EAE4D9] shadow-md rounded-xs rotate-[1deg]">
              
              {/* Washi tape on top center */}
              <div className="washi-tape washi-yellow -top-3 left-1/2 -translate-x-1/2" />

              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2]">
                <img
                  src={heroSrc}
                  alt="Outfit estrella de Kara Shop CR en maniquí"
                  loading="eager"
                  decoding="async"
                  onError={handleHeroError}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-[#FFF1F2]/95 backdrop-blur-xs px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9F1239] border border-[#FDA4AF] shadow-2xs">
                  ✨ Outfit Favorito de Instagram
                </div>

                <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-3 border border-[#EAE4D9] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#881337]">Look Viral</span>
                    <p className="font-serif text-sm font-semibold text-[#1C1917]">Top Manga Campana & Minifalda Cargo</p>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#881337]">₡ 16.500</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="border-t border-[#EAE4D9] bg-[#FFF1F2]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[#57534E]">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Truck className="w-4 h-4 text-[#881337] shrink-0" />
              <span>Correos de CR (₡3.000)</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <RefreshCw className="w-4 h-4 text-[#881337] shrink-0" />
              <span>Apartá con el 50%</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-[#881337] shrink-0" />
              <span>SINPE Móvil 8888-5272</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-[#881337] shrink-0" />
              <span>Fotos 100% reales en maniquí</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
