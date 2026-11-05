import React from 'react';
import { ProductCategory, FilterState } from '../types/store';
import { CATEGORIES } from '../data/products';
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles } from 'lucide-react';

interface CategoryNavProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const hasActiveFilters =
    filters.category !== 'todos' ||
    filters.searchQuery !== '' ||
    filters.maxPriceCRC < 30000 ||
    filters.sortBy !== 'featured';

  return (
    <section id="categories" className="py-7 border-b border-[#EAE4D9] bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Section Heading & Results Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#881337] font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Colección en Maniquí & Flatlay</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal">
              Prendas de @kara_shop_cr
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <span className="font-mono tabular-nums font-bold text-[#881337] bg-white px-2 py-0.5 border border-[#EAE4D9] rounded-xs shadow-2xs">
              {totalResults} prendas
            </span>
            <span aria-hidden="true">·</span>
            <span>Costa Rica 🇨🇷</span>
            {hasActiveFilters && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  onClick={onResetFilters}
                  className="text-[#881337] underline hover:text-[#B91C1C] transition-colors font-semibold cursor-pointer"
                >
                  Restablecer
                </button>
              </>
            )}
          </div>
        </div>

        {/* Category Segmented Buttons */}
        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 border-b border-[#EAE4D9]/80">
            {CATEGORIES.map((cat) => {
              const isActive = filters.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onFilterChange({ category: cat.id as ProductCategory })}
                  className={`px-4 py-2 text-xs tracking-wider uppercase font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer rounded-xs ${
                    isActive
                      ? 'bg-[#881337] text-white shadow-xs'
                      : 'bg-white text-[#57534E] hover:text-[#881337] hover:bg-[#FFF1F2] border border-[#EAE4D9]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Utility Bar: Search, Sort & Filter Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
            <input
              type="text"
              placeholder="Buscar por corset, falda, suéter, lentejuelas..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#DDD5C7] text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#881337] rounded-xs transition-all shadow-2xs"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-[#1C1917]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Filter Toggle */}
          <div className="flex items-center gap-2.5">
            
            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <label htmlFor="sort-select" className="sr-only">Ordenar prendas</label>
              <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-[#881337] pointer-events-none" />
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="pl-8 pr-8 py-2.5 bg-white border border-[#DDD5C7] text-xs font-semibold text-[#1C1917] appearance-none focus:outline-none focus:border-[#881337] cursor-pointer rounded-xs shadow-2xs"
              >
                <option value="featured">Destacadas de Instagram</option>
                <option value="price-asc">Precio: de menor a mayor (₡)</option>
                <option value="price-desc">Precio: de mayor a menor (₡)</option>
                <option value="name">Alfabético: A - Z</option>
              </select>
            </div>

            {/* Toggle Price Filter Panel */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 px-3.5 py-2.5 border text-xs font-semibold transition-colors cursor-pointer rounded-xs shadow-2xs ${
                showAdvanced || filters.maxPriceCRC < 30000
                  ? 'border-[#881337] bg-[#881337] text-white'
                  : 'border-[#DDD5C7] bg-white text-[#1C1917] hover:bg-[#FFF1F2]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Precio (₡)</span>
            </button>

          </div>
        </div>

        {/* Expandable Price Range Filter */}
        {showAdvanced && (
          <div className="p-4 bg-white border border-[#EAE4D9] space-y-3 rounded-xs shadow-xs animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#57534E] font-medium">Presupuesto Máximo por Prenda:</span>
              <span className="font-mono tabular-nums font-bold text-[#881337] text-sm">
                Hasta ₡ {filters.maxPriceCRC.toLocaleString('es-CR')}
              </span>
            </div>
            <input
              type="range"
              min="9000"
              max="30000"
              step="1000"
              value={filters.maxPriceCRC}
              onChange={(e) => onFilterChange({ maxPriceCRC: Number(e.target.value) })}
              className="w-full accent-[#881337] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono tabular-nums text-[#8C8275]">
              <span>₡ 9.000</span>
              <span>₡ 18.000</span>
              <span>₡ 30.000</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
