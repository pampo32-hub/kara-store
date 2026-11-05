import React, { useState } from 'react';
import { CartItem, CheckoutDetails } from '../types/store';
import { X, CheckCircle, Smartphone, CreditCard, Landmark, Bookmark, ShieldCheck, ArrowRight, Package, MessageCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

const COSTA_RICA_PROVINCES = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete
}) => {
  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    instagramUser: '',
    address: '',
    province: 'San José',
    canton: '',
    paymentMethod: 'sinpe',
    notes: ''
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const rawSubtotalCRC = items.reduce((acc, item) => {
    const itemPrice = item.purchaseType === 'apartado'
      ? Math.round(item.product.priceCRC * 0.5)
      : item.product.priceCRC;
    return acc + itemPrice * item.quantity;
  }, 0);

  const isFreeShipping = rawSubtotalCRC >= 35000;
  const shippingCostCRC = isFreeShipping ? 0 : 3000;
  const totalCRC = rawSubtotalCRC + shippingCostCRC;

  const hasApartados = items.some(i => i.purchaseType === 'apartado');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrder = `KARA-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderNumber(generatedOrder);
      setOrderConfirmed(true);
      onOrderComplete();
    }, 1200);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola Kara Shop CR! Acabo de completar el pedido ${orderNumber} a nombre de ${formData.fullName} (Instagram: ${formData.instagramUser || 'N/A'}). Total a pagar: ₡ ${totalCRC.toLocaleString('es-CR')} mediante ${formData.paymentMethod.toUpperCase()}. Adjunto mi comprobante.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={orderConfirmed ? handleFinish : onClose} />

      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#FBF9F5] border border-[#DDD5C7] shadow-2xl z-10 p-6 sm:p-10">
        
        {/* Close button */}
        {!orderConfirmed && (
          <button
            onClick={onClose}
            aria-label="Cerrar pasarela"
            className="absolute top-5 right-5 p-2 text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {orderConfirmed ? (
          /* Order Confirmation View */
          <div className="text-center py-6 space-y-6 animate-fadeIn">
            <div className="w-16 h-16 mx-auto bg-[#EFE9DF] rounded-full flex items-center justify-center text-[#1C1917]">
              <CheckCircle className="w-8 h-8 text-emerald-700 stroke-[1.8]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C8275] font-semibold">
                ¡Pedido Registrado con Éxito en Kara Shop CR!
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">
                Gracias, {formData.fullName.split(' ')[0] || 'Chica Kara'}
              </h2>
              <p className="text-sm font-mono text-[#57534E]">
                Número de Pedido: <strong className="text-[#1C1917] font-semibold">{orderNumber}</strong>
              </p>
            </div>

            {/* SINPE info box if SINPE was selected */}
            {(formData.paymentMethod === 'sinpe' || formData.paymentMethod === 'apartado') && (
              <div className="max-w-md mx-auto p-4 bg-amber-50/80 border border-amber-200 text-left text-xs space-y-1.5 text-amber-900">
                <p className="font-semibold flex items-center gap-1.5 text-sm">
                  <Smartphone className="w-4 h-4" />
                  <span>Datos de SINPE Móvil Oficial:</span>
                </p>
                <p className="font-mono text-base font-bold text-amber-950">
                  📱 Teléfono: 8888-KARA (8888-5272)
                </p>
                <p>A nombre de: <strong>Kara Shop Costa Rica</strong></p>
                <p>En el detalle colocá: <strong>{orderNumber} + Tu Nombre</strong></p>
                <p className="text-[11px] text-amber-800 pt-1">
                  Monto a transferir hoy: <strong>₡ {totalCRC.toLocaleString('es-CR')}</strong>
                </p>
              </div>
            )}

            <div className="max-w-md mx-auto p-5 bg-[#F4EFE6] border border-[#DDD5C7] text-left text-xs space-y-2.5 font-mono tabular-nums">
              <div className="flex justify-between pb-2 border-b border-[#EAE4D9]">
                <span className="font-sans text-[#57534E]">Destino Correos de CR:</span>
                <span className="text-right text-[#1C1917] font-sans font-medium">
                  {formData.canton}, {formData.province}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAE4D9]">
                <span className="font-sans text-[#57534E]">Instagram de contacto:</span>
                <span className="text-right text-[#1C1917] font-sans font-medium">
                  {formData.instagramUser ? `@${formData.instagramUser.replace('@', '')}` : 'No indicado'}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAE4D9]">
                <span className="font-sans text-[#57534E]">Tipo de Orden:</span>
                <span className="text-right text-[#1C1917] font-sans font-medium">
                  {hasApartados ? 'Apartado (30 días de retiro)' : 'Compra Directa'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1C1917] pt-1">
                <span className="font-sans">Total Registrado Hoy:</span>
                <span>₡ {totalCRC.toLocaleString('es-CR')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Comprobante por WhatsApp</span>
              </a>

              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#1C1917] text-[#FBF9F5] text-xs font-semibold tracking-widest uppercase hover:bg-[#38332E] transition-colors"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C8275] font-semibold">
                Costa Rica · Correos de CR & SINPE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] mt-1 font-normal">
                Datos de Envío & Apartado
              </h2>
            </div>

            {/* Customer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-medium text-[#1C1917]">Nombre y Apellidos *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sofía Chaves Vargas"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C7] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-[#1C1917]">Usuario de Instagram (Para etiquetarte) *</label>
                <input
                  type="text"
                  required
                  placeholder="@tu_usuario_ig"
                  value={formData.instagramUser}
                  onChange={(e) => setFormData({ ...formData, instagramUser: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C7] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-[#1C1917]">Teléfono / WhatsApp (Para coordinar y SINPE) *</label>
                <input
                  type="tel"
                  required
                  placeholder="8888-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C7] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-[#1C1917]">Provincia *</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C7] focus:outline-none focus:border-[#1C1917]"
                >
                  {COSTA_RICA_PROVINCES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-[#1C1917]">Cantón / Distrito *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Escazú, Montes de Oca, San Ramón..."
                  value={formData.canton}
                  onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C7] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-[#1C1917]">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="nombre@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C7] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-medium text-[#1C1917]">Dirección Exacta para Correos de Costa Rica o Sucursal *</label>
                <input
                  type="text"
                  required
                  placeholder="De la iglesia 200m norte o 'Retirar en Sucursal Correos de CR Escazú'"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD5C7] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-2 border-t border-[#EAE4D9]">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] block">
                Forma de Pago en Costa Rica
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'sinpe' })}
                  className={`p-3 border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'sinpe'
                      ? 'border-[#1C1917] bg-[#EFE9DF] text-[#1C1917] font-semibold'
                      : 'border-[#DDD5C7] bg-white text-[#57534E]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-800" />
                  <span>SINPE Móvil</span>
                  <span className="text-[10px] text-[#8C8275]">(Recomendado)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apartado' })}
                  className={`p-3 border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'apartado'
                      ? 'border-[#1C1917] bg-[#EFE9DF] text-[#1C1917] font-semibold'
                      : 'border-[#DDD5C7] bg-white text-[#57534E]'
                  }`}
                >
                  <Bookmark className="w-4 h-4 text-amber-800" />
                  <span>Apartado 50%</span>
                  <span className="text-[10px] text-[#8C8275]">(30 días)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#1C1917] bg-[#EFE9DF] text-[#1C1917] font-semibold'
                      : 'border-[#DDD5C7] bg-white text-[#57534E]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Tarjeta</span>
                  <span className="text-[10px] text-[#8C8275]">(Link seguro)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                  className={`p-3 border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    formData.paymentMethod === 'transfer'
                      ? 'border-[#1C1917] bg-[#EFE9DF] text-[#1C1917] font-semibold'
                      : 'border-[#DDD5C7] bg-white text-[#57534E]'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>BAC / BCR</span>
                  <span className="text-[10px] text-[#8C8275]">(Transferencia)</span>
                </button>

              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-4 border-t border-[#EAE4D9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left font-mono tabular-nums">
                <span className="text-xs font-sans text-[#78716C] block">Monto Total a Cancelar:</span>
                <span className="text-2xl font-bold text-[#1C1917]">
                  ₡ {totalCRC.toLocaleString('es-CR')}
                </span>
                <span className="text-[10px] text-[#8C8275] block font-sans">
                  {isFreeShipping ? 'Envío gratis por Correos de CR incluido' : 'Incluye ₡ 3.000 de envío nacional'}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-[#1C1917] hover:bg-[#38332E] text-[#FBF9F5] text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Registrando pedido...</span>
                ) : (
                  <>
                    <span>Confirmar y Enviar Pedido</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8275] uppercase tracking-wider text-center pt-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garantía de atención personalizada desde Costa Rica</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
