import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-[#1C1917] text-[#FBF9F5] text-[11px] sm:text-xs font-medium tracking-wide py-2.5 px-4 text-center select-none border-b border-[#292524] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 truncate pr-6 sm:pr-0">
        <span>Envíos a todo Costa Rica por Correos de CR</span>
        <span className="hidden sm:inline opacity-40">·</span>
        <span className="hidden sm:inline">Sistema de Apartado con 50%</span>
        <span className="hidden md:inline opacity-40">·</span>
        <span className="hidden md:inline">Pagos rápidos por SINPE Móvil & Tarjeta</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Cerrar aviso"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#FBF9F5] p-1 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
