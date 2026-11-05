import React, { useState } from 'react';
import { CartItem } from '../types/store';
import { X, Trash2, ArrowRight, Truck, Tag, ShieldCheck, Bookmark } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD_CRC = 35000;
const SHIPPING_FEE_CRC = 3000;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate subtotal considering full price vs 50% deposit for apartados
  const rawSubtotalCRC = items.reduce((acc, item) => {
    const itemPrice = item.purchaseType === 'apartado'
      ? Math.round(item.product.priceCRC * 0.5)
      : item.product.priceCRC;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round(rawSubtotalCRC * (discountPercent / 100));
  const subtotalAfterDiscount = rawSubtotalCRC - discountAmount;
  const isFreeShipping = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD_CRC || items.length === 0;
  const shippingCostCRC = isFreeShipping ? 0 : SHIPPING_FEE_CRC;
  const grandTotalCRC = subtotalAfterDiscount + shippingCostCRC;

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_CRC - subtotalAfterDiscount);
  const freeShippingProgress = Math.min(100, (subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD_CRC) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'KARA10' || code === 'INSTA10' || code === 'BIENVENIDA') {
      setDiscountPercent(10);
      setPromoMessage('Cupón del 10% aplicado con éxito');
    } else {
      setPromoMessage('Código no válido. Prueba con KARA10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1917]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] border-l border-[#DDD5C7] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EAE4D9] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl text-[#1C1917] font-normal">Bolsa de Compras</h2>
              <span className="font-mono text-xs tabular-nums text-[#8C8275]">
                ({items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'prenda' : 'prendas'})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar bolsa"
              className="p-1.5 text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Strip (Correos de Costa Rica) */}
          {items.length > 0 && (
            <div className="bg-[#F4EFE6] px-6 py-3.5 border-b border-[#EAE4D9] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#57534E] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#8C8275]" />
                  {isFreeShipping ? (
                    <span className="font-medium text-[#1C1917]">¡Envío gratis por Correos de CR!</span>
                  ) : (
                    <span>
                      Te faltan <strong className="font-mono tabular-nums text-[#1C1917]">₡ {missingForFreeShipping.toLocaleString('es-CR')}</strong> para envío gratis
                    </span>
                  )}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-[#8C8275]">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full bg-[#E2DACD] h-1.5 overflow-hidden rounded-full">
                <div
                  className="bg-[#1C1917] h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <p className="font-serif text-2xl text-[#78716C] italic">Tu bolsa está vacía</p>
                <p className="text-xs text-[#A8A29E] max-w-xs leading-relaxed">
                  Explorá las 10 prendas exclusivas de @kara_shop_cr y apartá o pedí con envío.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1C1917] text-[#FBF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#38332E] transition-colors"
                >
                  Ver Prendas
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const effectiveUnitPrice = item.purchaseType === 'apartado'
                  ? Math.round(item.product.priceCRC * 0.5)
                  : item.product.priceCRC;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${item.purchaseType}`}
                    className="flex gap-4 pb-5 border-b border-[#EAE4D9]/80"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-26 bg-[#F4EFE6] shrink-0 overflow-hidden border border-[#DDD5C7]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (item.product.fallbackImage && target.src !== item.product.fallbackImage) {
                            target.src = item.product.fallbackImage;
                          } else if (!target.src.includes('/images/')) {
                            const match = target.src.match(/(kara_real_[^./"\s]+\.jpg)/);
                            if (match) target.src = `/images/${match[1]}`;
                          }
                        }}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base text-[#1C1917] leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            aria-label="Eliminar prenda"
                            className="text-[#A8A29E] hover:text-[#1C1917] transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Variant Specs */}
                        <div className="flex items-center gap-2 text-xs text-[#78716C] mt-1">
                          <span>Talla: <strong className="text-[#1C1917] font-mono">{item.selectedSize}</strong></span>
                          <span aria-hidden="true">·</span>
                          <span>{item.selectedColor.name}</span>
                        </div>

                        {item.purchaseType === 'apartado' && (
                          <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 mt-1 border border-amber-200">
                            <Bookmark className="w-3 h-3" />
                            <span>Apartado (50% pagado hoy)</span>
                          </div>
                        )}
                      </div>

                      {/* Stepper & Line Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#DDD5C7] bg-white">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="px-2.5 py-1 text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-1 font-mono text-xs tabular-nums text-[#1C1917]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="px-2.5 py-1 text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono text-sm tabular-nums font-semibold text-[#1C1917]">
                          ₡ {(effectiveUnitPrice * item.quantity).toLocaleString('es-CR')}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EAE4D9] bg-[#F7F4EE] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C8275]" />
                  <input
                    type="text"
                    placeholder="Cupón (ej: KARA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-white border border-[#DDD5C7] text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#EAE4D9] hover:bg-[#DDD5C7] text-xs font-medium uppercase tracking-wider text-[#1C1917] transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${discountPercent > 0 ? 'text-emerald-700' : 'text-amber-800'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Calculations in tabular nums and colones */}
              <div className="space-y-2 text-xs font-mono tabular-nums text-[#57534E] pt-1">
                <div className="flex justify-between">
                  <span className="font-sans">Subtotal</span>
                  <span>₡ {rawSubtotalCRC.toLocaleString('es-CR')}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span className="font-sans">Descuento ({discountPercent}%)</span>
                    <span>-₡ {discountAmount.toLocaleString('es-CR')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="font-sans">Envío Correos de CR</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-sans font-medium uppercase text-[11px]">Gratis</span>
                    ) : (
                      `₡ ${shippingCostCRC.toLocaleString('es-CR')}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#1C1917] pt-2 border-t border-[#EAE4D9]">
                  <span className="font-sans">Total a Pagar Hoy</span>
                  <span>₡ {grandTotalCRC.toLocaleString('es-CR')}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#1C1917] hover:bg-[#38332E] text-[#FBF9F5] text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>Tramitar Pedido / Apartado</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[#8C8275]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pagas por SINPE Móvil oficial o Tarjeta</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
