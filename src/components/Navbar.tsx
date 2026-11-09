import React from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearchToggle: () => void;
  isSearchOpen: boolean;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSearchToggle,
  isSearchOpen,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EAE4D9]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark / Logo */}
          <Logo
            variant="badge"
            size="md"
            onClick={() => handleNavClick('hero')}
          />

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-[12px] tracking-widest uppercase font-medium text-[#78716C]">
            <button
              onClick={() => handleNavClick('catalog')}
              className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#1C1917] pb-1 cursor-pointer"
            >
              Prendas (10)
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#1C1917] pb-1 cursor-pointer"
            >
              Categorías
            </button>
            <button
              onClick={() => handleNavClick('apartados')}
              className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#1C1917] pb-1 cursor-pointer"
            >
              Sistema de Apartado
            </button>
            <button
              onClick={() => handleNavClick('lookbook')}
              className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#1C1917] pb-1 cursor-pointer"
            >
              Estilismos
            </button>
            <a
              href="https://instagram.com/kara_shop_cr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 border-b border-transparent hover:border-[#1C1917] pb-1 cursor-pointer"
            >
              @kara_shop_cr
            </a>
          </nav>

          {/* Zone 3: 1 primary action with search affordance and shopping bag */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={onSearchToggle}
              aria-label="Buscar en la tienda"
              className={`p-2 text-[#44403C] hover:text-[#1C1917] transition-colors rounded-md focus-visible:ring-1 focus-visible:ring-[#1C1917] ${
                isSearchOpen ? 'bg-[#EFE9DF] text-[#1C1917]' : ''
              }`}
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={onOpenCart}
              aria-label={`Ver bolsa de compras con ${cartCount} prendas`}
              className="group flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase text-[#1C1917] bg-[#FFF1F2] hover:bg-[#881337] hover:text-white border border-[#FDA4AF] rounded-sm transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.8] text-[#881337] group-hover:text-white" />
              <span className="hidden sm:inline">Bolsa</span>
              <span className="font-mono tabular-nums text-xs font-bold px-1.5 py-0.2 bg-[#881337] text-white group-hover:bg-white group-hover:text-[#881337] transition-colors rounded-xs">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú de navegación"
              className="md:hidden p-2 text-[#44403C] hover:text-[#1C1917] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F5] border-b border-[#EAE4D9] px-6 py-6 animate-fadeIn">
          <div className="flex flex-col gap-4 text-xs font-medium tracking-widest uppercase text-[#57534E]">
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-left py-2 hover:text-[#1C1917] border-b border-[#EAE4D9]/50"
            >
              Catálogo de Prendas (10)
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-left py-2 hover:text-[#1C1917] border-b border-[#EAE4D9]/50"
            >
              Categorías
            </button>
            <button
              onClick={() => handleNavClick('apartados')}
              className="text-left py-2 hover:text-[#1C1917] border-b border-[#EAE4D9]/50"
            >
              Sistema de Apartado (50%)
            </button>
            <button
              onClick={() => handleNavClick('lookbook')}
              className="text-left py-2 hover:text-[#1C1917] border-b border-[#EAE4D9]/50"
            >
              Estilismos & Outfits
            </button>
            <a
              href="https://instagram.com/kara_shop_cr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left py-2 hover:text-[#1C1917]"
            >
              Instagram @kara_shop_cr
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
