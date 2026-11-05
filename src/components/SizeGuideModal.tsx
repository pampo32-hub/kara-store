import React from 'react';
import { X, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#DDD5C7] shadow-2xl p-6 sm:p-8 z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-[#EAE4D9] pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C8275] font-semibold">Atelier Sizing</span>
            <h3 className="font-serif text-2xl text-[#1C1917]">Guía de Tallas & Medidas</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar guía"
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#57534E] leading-relaxed">
          Nuestras siluetas están diseñadas con un corte relajado y elegante. Si te encuentras entre dos tallas, te recomendamos elegir la menor para un encaje más estructurado o la mayor si buscas la caída fluida original de pasarela.
        </p>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-[#EAE4D9]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4EFE6] text-[#1C1917] uppercase tracking-wider font-semibold border-b border-[#EAE4D9]">
              <tr>
                <th className="py-3 px-4">Talla</th>
                <th className="py-3 px-4">Equivalencia UE</th>
                <th className="py-3 px-4">Pecho (cm)</th>
                <th className="py-3 px-4">Cintura (cm)</th>
                <th className="py-3 px-4">Cadera (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9] font-mono tabular-nums text-[#44403C]">
              <tr className="hover:bg-[#F7F4EE]">
                <td className="py-3 px-4 font-sans font-semibold text-[#1C1917]">XS</td>
                <td className="py-3 px-4">34</td>
                <td className="py-3 px-4">80 - 84</td>
                <td className="py-3 px-4">62 - 66</td>
                <td className="py-3 px-4">88 - 92</td>
              </tr>
              <tr className="hover:bg-[#F7F4EE]">
                <td className="py-3 px-4 font-sans font-semibold text-[#1C1917]">S</td>
                <td className="py-3 px-4">36</td>
                <td className="py-3 px-4">85 - 89</td>
                <td className="py-3 px-4">67 - 71</td>
                <td className="py-3 px-4">93 - 97</td>
              </tr>
              <tr className="hover:bg-[#F7F4EE]">
                <td className="py-3 px-4 font-sans font-semibold text-[#1C1917]">M</td>
                <td className="py-3 px-4">38</td>
                <td className="py-3 px-4">90 - 95</td>
                <td className="py-3 px-4">72 - 77</td>
                <td className="py-3 px-4">98 - 103</td>
              </tr>
              <tr className="hover:bg-[#F7F4EE]">
                <td className="py-3 px-4 font-sans font-semibold text-[#1C1917]">L</td>
                <td className="py-3 px-4">40</td>
                <td className="py-3 px-4">96 - 102</td>
                <td className="py-3 px-4">78 - 84</td>
                <td className="py-3 px-4">104 - 110</td>
              </tr>
              <tr className="hover:bg-[#F7F4EE]">
                <td className="py-3 px-4 font-sans font-semibold text-[#1C1917]">XL</td>
                <td className="py-3 px-4">42</td>
                <td className="py-3 px-4">103 - 109</td>
                <td className="py-3 px-4">85 - 92</td>
                <td className="py-3 px-4">111 - 117</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Advice */}
        <div className="flex items-start gap-3 p-4 bg-[#F4EFE6]/80 text-xs text-[#57534E]">
          <HelpCircle className="w-4 h-4 text-[#8C8275] shrink-0 mt-0.5" />
          <p>
            ¿Dudas con las medidas? Ofrecemos <strong>cambios de talla gratuitos a domicilio</strong> durante los primeros 30 días tras la recepción de tu pedido.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#1C1917] text-[#FBF9F5] text-xs font-medium tracking-widest uppercase hover:bg-[#38332E] transition-colors"
        >
          Entendido
        </button>

      </div>
    </div>
  );
};
