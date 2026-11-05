import React from 'react';
import { KARA_HIGHLIGHTS } from '../data/products';

export const ValuesSection: React.FC = () => {
  return (
    <section id="values" className="py-16 sm:py-20 border-b border-[#EAE4D9] bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8C8275]">
            Beneficios Kara Shop CR
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
            ¿Por Qué Comprar con Nosotras?
          </h2>
          <p className="text-xs text-[#78716C] leading-relaxed">
            Una boutique costarricense pensada para que compres tus prendas favoritas con total tranquilidad y facilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {KARA_HIGHLIGHTS.map((val, index) => (
            <div
              key={val.title}
              className="p-6 bg-[#F7F4EE]/60 border border-[#EAE4D9] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#8C8275] tracking-widest">
                  0{index + 1}.
                </span>
                <h3 className="font-serif text-lg text-[#1C1917] font-medium leading-snug">
                  {val.title}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
