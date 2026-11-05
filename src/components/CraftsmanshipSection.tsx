import React, { useState } from 'react';
import { Truck, Bookmark, Smartphone, MessageCircle, Instagram } from 'lucide-react';
import { CRAFT_CHALECO_IMAGE, CRAFT_FALLBACK_IMAGE } from '../data/products';

export const CraftsmanshipSection: React.FC = () => {
  const [craftSrc, setCraftSrc] = useState(CRAFT_CHALECO_IMAGE);

  const handleCraftError = () => {
    if (craftSrc !== CRAFT_FALLBACK_IMAGE) {
      setCraftSrc(CRAFT_FALLBACK_IMAGE);
    }
  };

  return (
    <section id="apartados" className="py-16 sm:py-24 border-b border-[#EAE4D9] bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual: Boutique Look */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-[#EAE4D9] border border-[#DDD5C7]">
            <div className="absolute inset-0 flex items-center justify-center text-[#78716C]">
              <span className="font-serif italic text-lg">KARA SHOP CR · San José, Costa Rica</span>
            </div>

            <img
              src={craftSrc}
              alt="Prendas reales de Kara Shop Costa Rica en maniquí de boutique"
              loading="lazy"
              decoding="async"
              onError={handleCraftError}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            <div className="absolute bottom-4 left-4 bg-[#FBF9F5]/90 backdrop-blur-xs px-3.5 py-1.5 text-[11px] uppercase tracking-widest text-[#57534E] border border-[#DDD5C7]">
              Instagram @kara_shop_cr · Costa Rica
            </div>
          </div>

          {/* Right Copy: Apartados & Envíos */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#8C8275]">
              <span>Compras Fáciles & Seguras</span>
              <span aria-hidden="true">·</span>
              <span>Costa Rica</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal leading-tight [text-wrap:balance]">
              ¿Cómo comprar o apartar tu prenda favorita en Kara Shop?
            </h2>

            <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
              Sabemos que tus prendas favoritas vuelan rápido en Instagram. Por eso te ofrecemos nuestro popular <strong>Sistema de Apartado</strong> para asegurar tu talla sin que te la ganen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              <div className="flex items-start gap-3">
                <Bookmark className="w-5 h-5 text-[#8C8275] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#1C1917] font-medium">1. Apartá con el 50%</h4>
                  <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                    Reservás la prenda hoy mismo abonando la mitad del valor y disponés de 30 días para retirar o solicitar envío.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#8C8275] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#1C1917] font-medium">2. SINPE Móvil Inmediato</h4>
                  <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                    Transferencia instantánea desde cualquier banco de Costa Rica a nuestro número comercial registrado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#8C8275] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#1C1917] font-medium">3. Correos de Costa Rica</h4>
                  <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                    Enviamos por ₡3.000 a cualquier parte del país (o gratis en compras mayores a ₡35.000) con número de guía.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-[#8C8275] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#1C1917] font-medium">4. Atención @kara_shop_cr</h4>
                  <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                    Respondemos por DM de Instagram o WhatsApp para asesorarte con medidas y videos de las prendas.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://instagram.com/kara_shop_cr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold uppercase tracking-widest hover:bg-[#38332E] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir a @kara_shop_cr en Instagram</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
