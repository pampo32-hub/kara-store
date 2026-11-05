import React from 'react';

export interface StoryHighlight {
  id: string;
  label: string;
  title: string;
  iconBg: string;
  textColor: string;
  borderColor: string;
  type: 'info' | 'whatsapp' | 'apartados' | 'kiara' | 'reviews' | 'consignacion';
  badgeContent: React.ReactNode;
}

interface StoryHighlightsProps {
  onSelectStory: (storyId: string) => void;
  activeStoryId?: string | null;
}

export const StoryHighlights: React.FC<StoryHighlightsProps> = ({ onSelectStory }) => {
  const highlights = [
    {
      id: 'info',
      label: 'Info 🧑‍🌾',
      title: 'Información de Compras',
      bgClass: 'bg-[#881337] text-white',
      borderClass: 'border-[#BE123C]',
      icon: (
        <div className="flex flex-col items-center justify-center text-center p-1 leading-none">
          <span className="font-serif text-[10px] tracking-tight uppercase font-bold text-amber-200">Info</span>
          <span className="text-[14px]">🌿</span>
        </div>
      )
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp ❤️',
      title: 'WhatsApp Oficial',
      bgClass: 'bg-[#FFF1F2] text-[#9F1239]',
      borderClass: 'border-[#FDA4AF]',
      icon: (
        <div className="flex flex-col items-center justify-center text-center p-1 leading-none">
          <span className="text-[18px]">🍓</span>
          <span className="text-[8px] font-bold text-[#E11D48] tracking-tighter">Wpp</span>
        </div>
      )
    },
    {
      id: 'apartados',
      label: 'Apartados 🎁',
      title: 'Sistema de Apartado',
      bgClass: 'bg-[#FEF08A] text-[#854D0E]',
      borderClass: 'border-[#FACC15]',
      icon: (
        <div className="flex flex-col items-center justify-center text-center p-1 leading-none">
          <span className="text-[17px]">🎁</span>
          <span className="text-[8px] font-bold text-[#713F12]">50%</span>
        </div>
      )
    },
    {
      id: 'kiara',
      label: 'Sobre Mí 🦋',
      title: 'Conoce a Kiara',
      bgClass: 'bg-[#991B1B] text-white',
      borderClass: 'border-[#EF4444]',
      icon: (
        <div className="flex flex-col items-center justify-center text-center p-1 leading-none">
          <span className="text-[16px]">🦋</span>
          <span className="font-handwriting text-xs text-amber-200 font-bold">Kiara</span>
        </div>
      )
    },
    {
      id: 'chicas',
      label: 'Chicas 💋',
      title: 'Comunidad Kara',
      bgClass: 'bg-[#FDE047] text-[#713F12]',
      borderClass: 'border-[#EAB308]',
      icon: (
        <div className="flex flex-col items-center justify-center text-center p-1 leading-none">
          <span className="font-handwriting text-sm font-bold text-[#881337]">Chicas</span>
          <span className="text-[10px]">🌙</span>
        </div>
      )
    },
    {
      id: 'consignacion',
      label: 'Envíos CR 📦',
      title: 'Correos de Costa Rica',
      bgClass: 'bg-[#7F1D1D] text-white',
      borderClass: 'border-[#B91C1C]',
      icon: (
        <div className="flex flex-col items-center justify-center text-center p-1 leading-none">
          <span className="text-[15px]">📮</span>
          <span className="text-[8px] font-bold text-amber-100">CR</span>
        </div>
      )
    },
    {
      id: 'frase',
      label: 'Vibes ✨',
      title: 'Frase del Día',
      bgClass: 'bg-[#FEF08A] text-[#713F12]',
      borderClass: 'border-[#FBBF24]',
      icon: (
        <div className="flex flex-col items-center justify-center text-center p-1 leading-none">
          <span className="text-[16px]">𓆩♡𓆪</span>
          <span className="font-handwriting text-[10px] font-bold text-[#B45309]">Aesthetic</span>
        </div>
      )
    }
  ];

  return (
    <div className="border-b border-[#EAE4D9] bg-[#FAF7F2] py-4 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Story Circles Row */}
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-2">
          {highlights.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectStory(item.id)}
              className="group flex flex-col items-center gap-1.5 shrink-0 focus-visible:outline-none cursor-pointer"
            >
              {/* Outer double ring (Instagram story style with yellow/red/pink gradient border) */}
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#E11D48] via-[#FBBF24] to-[#F43F5E] group-hover:scale-105 transition-transform duration-200">
                <div className="p-0.5 bg-white rounded-full">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xs ${item.bgClass} border ${item.borderClass} transition-all`}>
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Label below */}
              <span className="text-[11px] sm:text-xs font-medium text-[#44403C] group-hover:text-[#1C1917] tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
