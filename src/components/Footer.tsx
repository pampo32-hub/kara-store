import React, { useState } from 'react';
import { ArrowRight, Check, Instagram } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#EDE8DF] pt-16 pb-12 border-t border-[#2E2A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Top Newsletter & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2E2A27]">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo variant="badge" size="md" />
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm">
              Boutique femenina en línea en Costa Rica. Ropa aesthetic, colores claros, siluetas cómodas y versátiles. Envíos por Correos de CR y sistema de apartado.
            </p>
            <div className="pt-1">
              <a
                href="https://instagram.com/kara_shop_cr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#FBF9F5] hover:text-[#D6D0C5] transition-colors border border-[#3E3A36] px-3.5 py-2"
              >
                <Instagram className="w-4 h-4 text-[#A8A29E]" />
                <span>@kara_shop_cr en Instagram</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#A8A29E] font-medium">
              Comunidad Kara VIP
            </span>
            <p className="text-xs text-[#D6D0C5]">
              Recibe avisos de reposición de tallas antes de que se agoten en historias y un <strong>10% de descuento</strong>.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#2E2A27] text-xs text-[#FBF9F5] border border-[#3E3A36]">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Bienvenida a Kara Shop! Usa el cupón <strong className="font-mono text-white">KARA10</strong> en tu pedido.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Tu correo o WhatsApp..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#262320] border border-[#3E3A36] text-xs text-[#FBF9F5] placeholder:text-[#78716C] focus:outline-none focus:border-[#EDE8DF]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#FBF9F5] hover:bg-[#E2DACD] text-[#1C1917] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Unirme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-[#A8A29E]">
          
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FBF9F5]">Prendas Reales</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors cursor-pointer">
                  Outfits & Sets en Maniquí
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors cursor-pointer">
                  Tops & Rib (Maniquí y Flatlay)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors cursor-pointer">
                  Faldas & Minis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors cursor-pointer">
                  Vestidos & Enterizos
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FBF9F5]">Atención al Cliente</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors cursor-pointer">
                  Guía de Tallas (S, M, L)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('apartados')} className="hover:text-white transition-colors cursor-pointer">
                  Reglamento de Apartados
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Correos de Costa Rica (₡3.000)</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Pagos por SINPE Móvil</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FBF9F5]">Kara Shop CR</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('lookbook')} className="hover:text-white transition-colors cursor-pointer">
                  Outfits Recomendados
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('apartados')} className="hover:text-white transition-colors cursor-pointer">
                  ¿Cómo Comprar?
                </button>
              </li>
              <li>
                <a href="https://instagram.com/kara_shop_cr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram @kara_shop_cr
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors">San José, Costa Rica 🇨🇷</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FBF9F5]">Moneda & Pago</h4>
            <p className="text-[11px] text-[#78716C] leading-relaxed">
              Precios en Colones Costarricenses (₡ CRC). Aceptamos SINPE Móvil, transferencias bancarias y tarjetas.
            </p>
            <div className="pt-2 text-[11px] text-[#D6D0C5] bg-[#262320] p-2.5 border border-[#3E3A36]">
              <span>📱 SINPE Oficial: </span>
              <strong className="font-mono text-white">8888-KARA (8888-5272)</strong>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 border-t border-[#2E2A27] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716C]">
          <p>© {new Date().getFullYear()} KARA SHOP CR (@kara_shop_cr). Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Envíos a todo Costa Rica</span>
            <span aria-hidden="true">·</span>
            <span>Sistema de Apartado</span>
            <span aria-hidden="true">·</span>
            <span>SINPE Móvil</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
