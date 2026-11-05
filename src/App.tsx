/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, FilterState, ProductColor } from './types/store';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { StoryHighlights } from './components/StoryHighlights';
import { StoryModal } from './components/StoryModal';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { LookbookSection } from './components/LookbookSection';
import { ValuesSection } from './components/ValuesSection';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  category: 'todos',
  searchQuery: '',
  sortBy: 'featured',
  maxPriceCRC: 30000,
};

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kara_shop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter and modal states
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kara_shop_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Show transient toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity: number = 1,
    purchaseType: 'direct' | 'apartado' = 'direct'
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name &&
          item.purchaseType === purchaseType
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity, purchaseType }];
    });

    const isApartado = purchaseType === 'apartado';
    triggerToast(
      isApartado
        ? `🎁 Apartada con 50%: "${product.name}"`
        : `🛍️ Añadido a la bolsa: "${product.name}"`
    );
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    triggerToast('Prenda eliminada de la bolsa');
  };

  const handleOrderComplete = () => {
    setCart([]);
  };

  // Filter change handlers
  const handleFilterChange = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Filtered & sorted products computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (filters.category !== 'todos' && product.category !== filters.category) {
        return false;
      }
      if (product.priceCRC > filters.maxPriceCRC) {
        return false;
      }
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesCategory && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceCRC - b.priceCRC;
      if (filters.sortBy === 'price-desc') return b.priceCRC - a.priceCRC;
      if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [filters]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dot-grid text-[#1C1917] flex flex-col font-sans selection:bg-[#FCE7F3] selection:text-[#881337]">
      
      {/* 1. Announcement Bar with Costa Rica shipping & Apartados */}
      <AnnouncementBar />

      {/* 2. Top Bar Navigation Contract: KARA SHOP CR */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSearchToggle={() => {
          scrollToSection('categories');
          setTimeout(() => {
            const input = document.querySelector('input[type="text"]') as HTMLInputElement | null;
            if (input) input.focus();
          }, 350);
        }}
        isSearchOpen={filters.searchQuery !== ''}
        onNavigate={scrollToSection}
      />

      {/* 3. Instagram Story Highlights Circles (matching user image) */}
      <StoryHighlights onSelectStory={(id) => setActiveStoryId(id)} />

      {/* 4. Hero Campaign Section (Scrapbook Diary theme) */}
      <Hero
        onExplore={() => scrollToSection('categories')}
        onOpenStory={(id) => setActiveStoryId(id)}
      />

      {/* 5. Category Nav & Filter Section */}
      <CategoryNav
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      {/* 6. Main Product Catalog Section with the 10 garments */}
      <main id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 max-w-md mx-auto p-6 bg-white border border-[#EAE4D9] rounded shadow-xs">
            <span className="text-4xl">🦋</span>
            <p className="font-serif text-2xl text-[#881337] italic">
              No encontramos prendas con estos filtros
            </p>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Prueba cambiando la categoría o ampliando el rango de precio para ver las 10 prendas disponibles.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#881337] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#9F1239] transition-colors cursor-pointer rounded-xs"
            >
              Ver las 10 Prendas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
                onQuickAdd={(p, size, color) => handleAddToCart(p, size, color, 1, 'direct')}
              />
            ))}
          </div>
        )}
      </main>

      {/* 7. Apartados & Correos de CR Section */}
      <CraftsmanshipSection />

      {/* 8. Outfits & Lookbook Section */}
      <LookbookSection
        products={PRODUCTS}
        onSelectProduct={setSelectedProduct}
      />

      {/* 9. Highlights & Values Section */}
      <ValuesSection />

      {/* 10. Minimalist Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Interactive Story Modal (Bullet journal / Clipboard / Frase / WhatsApp) */}
      <StoryModal
        storyId={activeStoryId}
        onClose={() => setActiveStoryId(null)}
      />

      {/* Product Detail Modal (PDP) with Apartado Option */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, size, color, qty, purchaseType) => handleAddToCart(p, size, color, qty, purchaseType)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Frictionless Checkout Modal with Costa Rica details */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={handleOrderComplete}
      />

      {/* Discrete Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#881337] text-white px-4 py-3 border border-[#9F1239] shadow-xl flex items-center gap-2.5 text-xs font-medium tracking-wide animate-slideUp rounded-sm">
          <Check className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
