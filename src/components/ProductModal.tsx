import React, { useState } from 'react';
import { Product, ProductColor } from '../types/store';
import { X, Check, ShieldCheck, Ruler, ArrowRight, Truck, Bookmark, MessageCircle } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number, purchaseType?: 'direct' | 'apartado') => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [purchaseType, setPurchaseType] = useState<'direct' | 'apartado'>('direct');
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'apartado'>('details');
  const [addedNotice, setAddedNotice] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState<string>(product.image);

  React.useEffect(() => {
    if (product) {
      setModalImgSrc(product.image);
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleModalImgError = () => {
    if (product.fallbackImage && modalImgSrc !== product.fallbackImage) {
      setModalImgSrc(product.fallbackImage);
    } else if (!modalImgSrc.startsWith('/images/')) {
      const match = modalImgSrc.match(/(kara_real_[^./"\s]+\.jpg)/);
      if (match) {
        setModalImgSrc(`/images/${match[1]}`);
      }
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity, purchaseType);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  const currentPriceCRC = purchaseType === 'apartado'
    ? Math.round(product.priceCRC * 0.5)
    : product.priceCRC;

  const whatsappMessage = encodeURIComponent(
    `¡Hola Kara Shop CR! Me interesa la prenda "${product.name}" en talla ${selectedSize} y color ${selectedColor.name}. ¿Sigue disponible para envío o apartado?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1917]/60 backdrop-blur-sm animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FBF9F5] border border-[#DDD5C7] shadow-2xl z-10 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalles"
          className="absolute top-4 right-4 z-20 p-2 text-[#78716C] hover:text-[#1C1917] bg-[#FBF9F5]/90 border border-[#DDD5C7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">
          
          {/* Left Column: Product Visual Stage */}
          <div className="md:col-span-6 bg-[#F4EFE6] relative min-h-[380px] md:min-h-full border-b md:border-b-0 md:border-r border-[#EAE4D9]">
            <img
              src={modalImgSrc}
              alt={product.name}
              loading="eager"
              decoding="async"
              onError={handleModalImgError}
              className="w-full h-full object-cover object-center max-h-[520px] md:max-h-full"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#FBF9F5] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#57534E] border border-[#DDD5C7]">
                {product.tag}
              </span>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category & Shop info */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C8275]">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>@kara_shop_cr</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal leading-tight">
                {product.name}
              </h2>

              {/* Price in Colones */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  ₡ {product.priceCRC.toLocaleString('es-CR')}
                </span>
                {product.originalPriceCRC && (
                  <span className="text-sm font-mono tabular-nums text-[#A8A29E] line-through">
                    ₡ {product.originalPriceCRC.toLocaleString('es-CR')}
                  </span>
                )}
                <span className="text-xs text-[#78716C] font-mono">(~${product.priceUSD.toFixed(1)} USD)</span>
              </div>

              <p className="text-sm text-[#57534E] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Purchase Type Selector: Direct vs Apartado */}
              <div className="p-3 bg-[#F4EFE6] border border-[#E0D8CA] space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] block">
                  Modalidad de Compra:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setPurchaseType('direct')}
                    className={`py-2 px-3 border text-left transition-colors cursor-pointer ${
                      purchaseType === 'direct'
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5] font-medium'
                        : 'border-[#DDD5C7] bg-white text-[#57534E]'
                    }`}
                  >
                    <span>Pago Completo</span>
                    <strong className="block font-mono text-[11px] mt-0.5">
                      ₡ {product.priceCRC.toLocaleString('es-CR')}
                    </strong>
                  </button>

                  <button
                    onClick={() => setPurchaseType('apartado')}
                    className={`py-2 px-3 border text-left transition-colors cursor-pointer ${
                      purchaseType === 'apartado'
                        ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5] font-medium'
                        : 'border-[#DDD5C7] bg-white text-[#57534E]'
                    }`}
                  >
                    <span>Apartar (50%)</span>
                    <strong className="block font-mono text-[11px] mt-0.5">
                      ₡ {Math.round(product.priceCRC * 0.5).toLocaleString('es-CR')}
                    </strong>
                  </button>
                </div>
                {purchaseType === 'apartado' && (
                  <p className="text-[10px] text-[#78716C] leading-normal pt-1">
                    Apartás hoy con el 50% y disponés de hasta 30 días para cancelar el saldo restante al retirar o enviar por Correos de CR.
                  </p>
                )}
              </div>

              {/* Color Selector */}
              <div className="space-y-2 pt-1 border-t border-[#EAE4D9]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#78716C] uppercase tracking-wider">Color disponible:</span>
                  <span className="font-medium text-[#1C1917]">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#1C1917] bg-[#EFE9DF] text-[#1C1917]'
                            : 'border-[#DDD5C7] text-[#57534E] hover:border-[#8C8275]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full inline-block border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector + Size Guide Link */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#78716C] uppercase tracking-wider">Talla:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1 text-[#1C1917] underline hover:text-[#78716C] transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Guía de Tallas</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 text-xs font-mono font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1C1917] text-[#FBF9F5] border-[#1C1917]'
                            : 'bg-white/80 text-[#1C1917] border-[#DDD5C7] hover:border-[#1C1917]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs text-[#78716C] uppercase tracking-wider">Unidades:</span>
                <div className="flex items-center border border-[#DDD5C7] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-xs text-[#57534E] hover:text-[#1C1917] disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-mono text-xs tabular-nums font-semibold text-[#1C1917]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Buy CTA & Feedback */}
            <div className="space-y-3 pt-3 border-t border-[#EAE4D9]">
              <button
                onClick={handleAdd}
                disabled={addedNotice}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#1C1917] hover:bg-[#38332E] text-[#FBF9F5] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer shadow-sm"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>¡Prenda Añadida!</span>
                  </>
                ) : (
                  <>
                    <span>
                      {purchaseType === 'apartado' ? 'Apartar Prenda' : 'Añadir a la Bolsa'} · ₡ {(currentPriceCRC * quantity).toLocaleString('es-CR')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* WhatsApp direct consult button */}
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 border border-[#3E3A36] text-[#1C1917] hover:bg-[#EFE9DF] text-xs font-medium uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#8C8275]" />
                <span>Consultar por WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-[#78716C] pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#8C8275]" />
                  <span>Correos de CR (₡3.000)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#8C8275]" />
                  <span>Apartado hasta 30 días</span>
                </div>
              </div>
            </div>

            {/* Tabs: Details, Care, Apartado Info */}
            <div className="pt-2 border-t border-[#EAE4D9]">
              <div className="flex items-center gap-6 border-b border-[#EAE4D9] text-xs tracking-wider uppercase pb-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 font-medium transition-colors cursor-pointer ${
                    activeTab === 'details' ? 'text-[#1C1917] border-b-2 border-[#1C1917]' : 'text-[#8C8275] hover:text-[#1C1917]'
                  }`}
                >
                  Detalles
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-1 font-medium transition-colors cursor-pointer ${
                    activeTab === 'care' ? 'text-[#1C1917] border-b-2 border-[#1C1917]' : 'text-[#8C8275] hover:text-[#1C1917]'
                  }`}
                >
                  Cuidados
                </button>
                <button
                  onClick={() => setActiveTab('apartado')}
                  className={`pb-1 font-medium transition-colors cursor-pointer ${
                    activeTab === 'apartado' ? 'text-[#1C1917] border-b-2 border-[#1C1917]' : 'text-[#8C8275] hover:text-[#1C1917]'
                  }`}
                >
                  Sistema Apartado
                </button>
              </div>

              <div className="pt-3 text-xs text-[#57534E] leading-relaxed">
                {activeTab === 'details' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                    <li className="font-medium text-[#1C1917] pt-1">Composición: {product.composition}</li>
                  </ul>
                )}
                {activeTab === 'care' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.care.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'apartado' && (
                  <div className="space-y-1.5">
                    <p><strong>1.</strong> Apartás esta prenda con el 50% vía SINPE Móvil o tarjeta.</p>
                    <p><strong>2.</strong> Te guardamos la prenda en bodega durante un máximo de 30 días naturales.</p>
                    <p><strong>3.</strong> Cancelás el 50% restante cuando estés lista para el envío por Correos de CR.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
