import React from 'react';
import { X, MessageCircle, Heart, Star, Sparkles } from 'lucide-react';

interface StoryModalProps {
  storyId: string | null;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ storyId, onClose }) => {
  if (!storyId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#FAF7F2] border-2 border-[#DDD5C7] shadow-2xl z-10 overflow-hidden rounded-lg">
        
        {/* Top tape / close button */}
        <div className="washi-tape washi-pink -top-2 left-1/2 -translate-x-1/2" />
        
        <button
          onClick={onClose}
          aria-label="Cerrar historia"
          className="absolute top-3 right-3 z-30 p-1.5 rounded-full bg-white/90 text-[#78716C] hover:text-[#1C1917] border border-[#DDD5C7] shadow-xs cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 1. INFO DE COMPRAS (Bullet Journal Notebook style from user image) */}
        {storyId === 'info' && (
          <div className="relative p-6 sm:p-8 bg-dot-grid border-l-8 border-dashed border-[#57534E]/30 min-h-[460px] flex flex-col justify-between">
            {/* Spiral binding rings simulation on left */}
            <div className="absolute left-1 top-6 bottom-6 flex flex-col justify-between pointer-events-none opacity-40">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-3 h-2 border-2 border-black rounded-full" />
              ))}
            </div>

            <div className="pl-4 space-y-5">
              {/* Butterfly Icon */}
              <div className="text-center">
                <span className="text-3xl select-none inline-block hover:scale-110 transition-transform">🦋</span>
              </div>

              {/* Cutout Letters Title: INFORMACION DE COMPRAS */}
              <div className="text-center space-y-1.5 select-none">
                <div className="flex items-center justify-center gap-1 flex-wrap">
                  <span className="cutout-box bg-[#DC2626] text-white" style={{ '--rot': '-2deg' } as any}>I</span>
                  <span className="cutout-box bg-[#F43F5E] text-white" style={{ '--rot': '3deg' } as any}>n</span>
                  <span className="cutout-box bg-[#3B82F6] text-white" style={{ '--rot': '-1deg' } as any}>f</span>
                  <span className="cutout-box bg-[#10B981] text-white" style={{ '--rot': '2deg' } as any}>o</span>
                  <span className="cutout-box bg-[#8B5CF6] text-white" style={{ '--rot': '-3deg' } as any}>r</span>
                  <span className="cutout-box bg-[#EC4899] text-white" style={{ '--rot': '1deg' } as any}>m</span>
                  <span className="cutout-box bg-[#F59E0B] text-white" style={{ '--rot': '-2deg' } as any}>a</span>
                  <span className="cutout-box bg-[#06B6D4] text-white" style={{ '--rot': '2deg' } as any}>c</span>
                  <span className="cutout-box bg-[#EF4444] text-white" style={{ '--rot': '-1deg' } as any}>i</span>
                  <span className="cutout-box bg-[#F43F5E] text-white" style={{ '--rot': '3deg' } as any}>o</span>
                  <span className="cutout-box bg-[#8B5CF6] text-white" style={{ '--rot': '-2deg' } as any}>n</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="cutout-box bg-[#B91C1C] text-amber-200 text-lg" style={{ '--rot': '3deg' } as any}>D</span>
                  <span className="cutout-box bg-[#F472B6] text-white text-lg" style={{ '--rot': '-2deg' } as any}>e</span>
                </div>
                <div className="flex items-center justify-center gap-1 flex-wrap">
                  <span className="cutout-box bg-[#A855F7] text-white text-lg" style={{ '--rot': '-3deg' } as any}>C</span>
                  <span className="cutout-box bg-[#EC4899] text-white text-lg" style={{ '--rot': '2deg' } as any}>o</span>
                  <span className="cutout-box bg-[#10B981] text-white text-lg" style={{ '--rot': '-1deg' } as any}>m</span>
                  <span className="cutout-box bg-[#3B82F6] text-white text-lg" style={{ '--rot': '3deg' } as any}>p</span>
                  <span className="cutout-box bg-[#F59E0B] text-white text-lg" style={{ '--rot': '-2deg' } as any}>r</span>
                  <span className="cutout-box bg-[#F43F5E] text-white text-lg" style={{ '--rot': '1deg' } as any}>a</span>
                  <span className="cutout-box bg-[#6366F1] text-white text-lg" style={{ '--rot': '-2deg' } as any}>s</span>
                </div>
              </div>

              {/* Journal Notes */}
              <div className="space-y-3 font-handwriting text-lg sm:text-xl text-[#3E3835] leading-snug pt-2">
                <div className="p-3 bg-white/80 border border-[#E8E2D7] rounded-sm shadow-2xs rotate-[-0.5deg]">
                  <p>✨ <strong>Envíos por Correos de CR:</strong> ₡3.000 a cualquier parte del país. ¡Gratis en compras superiores a ₡35.000!</p>
                </div>
                <div className="p-3 bg-white/80 border border-[#E8E2D7] rounded-sm shadow-2xs rotate-[0.5deg]">
                  <p>🎁 <strong>Sistema de Apartado:</strong> Apartás cualquier prenda con solo el 50% y tenés 30 días para retirar.</p>
                </div>
                <div className="p-3 bg-white/80 border border-[#E8E2D7] rounded-sm shadow-2xs rotate-[-0.5deg]">
                  <p>📱 <strong>Pagos rápidos:</strong> Por SINPE Móvil al 8888-5272 o con tarjeta de crédito/débito.</p>
                </div>
                <div className="p-3 bg-white/80 border border-[#E8E2D7] rounded-sm shadow-2xs rotate-[0.5deg]">
                  <p>💌 <strong>Atención personalizada:</strong> Fotos reales tomadas por Kiara en maniquí o en flatlay.</p>
                </div>
              </div>
            </div>

            <div className="pl-4 pt-4 text-center">
              <span className="font-handwriting text-xs text-[#8C8275]">
                — Con amor, Kara Shop CR 💕
              </span>
            </div>
          </div>
        )}

        {/* 2. SOBRE MI - KIARA (Clipboard style from user image) */}
        {storyId === 'kiara' && (
          <div className="relative p-6 sm:p-8 bg-[#FDF2F4] border-t-8 border-[#38BDF8] min-h-[480px] flex flex-col justify-between">
            {/* Blue clipboard clip simulation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 bg-[#38BDF8] w-24 h-6 rounded-b-md shadow-md flex items-center justify-center">
              <div className="w-8 h-2 bg-white/60 rounded-full" />
            </div>

            <div className="space-y-4 pt-2">
              {/* Cutout title: Sobre Mi */}
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <span className="cutout-box bg-[#F43F5E] text-white" style={{ '--rot': '-3deg' } as any}>S</span>
                  <span className="cutout-box bg-[#10B981] text-white" style={{ '--rot': '2deg' } as any}>o</span>
                  <span className="cutout-box bg-[#F59E0B] text-white" style={{ '--rot': '-2deg' } as any}>b</span>
                  <span className="cutout-box bg-[#EC4899] text-white" style={{ '--rot': '1deg' } as any}>r</span>
                  <span className="cutout-box bg-[#3B82F6] text-white" style={{ '--rot': '-1deg' } as any}>e</span>
                  <span className="w-2" />
                  <span className="cutout-box bg-[#8B5CF6] text-white" style={{ '--rot': '3deg' } as any}>m</span>
                  <span className="cutout-box bg-[#EF4444] text-white" style={{ '--rot': '-2deg' } as any}>i</span>
                </div>
                <div className="inline-block bg-[#881337] text-amber-200 px-4 py-1 text-xs tracking-widest uppercase font-bold rounded-sm mt-1">
                  KIARA · 20 Años
                </div>
              </div>

              {/* Scrapbook Doodle Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs font-handwriting text-lg text-[#3E3835]">
                <div className="p-3 bg-white rounded-md border border-[#FBCFE8] shadow-2xs rotate-[-1deg]">
                  <p className="font-bold text-[#E11D48] text-sm">🐱 Mamá de Olivia</p>
                  <p className="text-sm text-[#78716C] mt-0.5">La consentida de 4 patitas del taller.</p>
                </div>
                <div className="p-3 bg-white rounded-md border border-[#FBCFE8] shadow-2xs rotate-[1.5deg]">
                  <p className="font-bold text-[#E11D48] text-sm">🎓 Estudiante</p>
                  <p className="text-sm text-[#78716C] mt-0.5">Ingeniería Industrial en Costa Rica.</p>
                </div>
                <div className="p-3 bg-white rounded-md border border-[#FBCFE8] shadow-2xs rotate-[1deg]">
                  <p className="font-bold text-[#E11D48] text-sm">🎀 Creé Kara a los 14</p>
                  <p className="text-sm text-[#78716C] mt-0.5">Empecé este sueño de moda desde el colegio.</p>
                </div>
                <div className="p-3 bg-white rounded-md border border-[#FBCFE8] shadow-2xs rotate-[-1.5deg]">
                  <p className="font-bold text-[#E11D48] text-sm">📸 Fotos Reales</p>
                  <p className="text-sm text-[#78716C] mt-0.5">Yo misma escojo, preparo y tomo las fotos.</p>
                </div>
              </div>

              <div className="p-3 bg-white/90 border border-[#FBCFE8] rounded text-center font-handwriting text-xl text-[#881337]">
                <span className="text-sm mr-1">🍓</span>
                <span>¡Gracias por apoyar este emprendimiento costarricense!</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <a
                href="https://instagram.com/kara_shop_cr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#881337] text-white text-xs font-semibold rounded-full hover:bg-[#9F1239] transition-colors"
              >
                <span>Ver Instagram @kara_shop_cr</span>
              </a>
            </div>
          </div>
        )}

        {/* 3. FRASE DEL DIA (Cherry red starburst painting from user image) */}
        {storyId === 'frase' && (
          <div className="p-8 bg-[#991B1B] text-white min-h-[460px] flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Starburst rays illustration */}
            <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full border-8 border-dashed border-white" />
            </div>

            <div className="space-y-6 relative z-10 max-w-xs">
              <span className="text-3xl">✨</span>
              
              <h3 className="font-serif text-3xl sm:text-4xl leading-tight font-normal text-amber-200 uppercase tracking-tight [text-wrap:balance]">
                «Hasta lo que sale mal, nos lleva a algo mejor»
              </h3>

              <div className="flex items-center justify-center gap-2 text-xs font-handwriting text-xl text-rose-200">
                <span>Inspira +</span>
                <span>·</span>
                <span>Kara Shop CR</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white text-[#991B1B] font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-amber-100 transition-colors"
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. WHATSAPP */}
        {storyId === 'whatsapp' && (
          <div className="p-8 bg-[#FFF1F2] min-h-[380px] flex flex-col justify-between text-center space-y-6">
            <div className="space-y-3 pt-4">
              <span className="text-4xl inline-block">🍓</span>
              <h3 className="font-serif text-3xl text-[#881337]">WhatsApp Kara Shop CR</h3>
              <p className="text-xs text-[#57534E] max-w-sm mx-auto leading-relaxed">
                ¿Querés apartar una prenda, pedir video de la tela o confirmar tu talla antes del envío por Correos de CR?
              </p>
              <div className="font-mono text-lg font-bold text-[#881337] bg-white p-3 border border-[#FDA4AF] rounded inline-block">
                📱 +506 8888-KARA (8888-5272)
              </div>
            </div>

            <a
              href="https://wa.me/?text=Hola%20Kara%20Shop%20CR!%20Vengo%20desde%20la%20p%C3%A1gina%20web%20y%20me%20gustar%C3%ADa%20hacer%20una%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Abrir WhatsApp Ahora</span>
            </a>
          </div>
        )}

        {/* 5. APARTADOS */}
        {storyId === 'apartados' && (
          <div className="p-8 bg-[#FEF9C3] min-h-[420px] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-4xl">🎁</span>
                <h3 className="font-serif text-2xl text-[#854D0E] mt-1">Reglamento de Apartados</h3>
              </div>

              <div className="space-y-2.5 font-handwriting text-xl text-[#713F12]">
                <div className="p-3 bg-white/90 border border-[#FDE047] rounded">
                  📌 <strong>Paso 1:</strong> Apartás la prenda con el 50% de su valor por SINPE Móvil o tarjeta.
                </div>
                <div className="p-3 bg-white/90 border border-[#FDE047] rounded">
                  📌 <strong>Paso 2:</strong> Guardamos tu prenda en bodega durante 30 días naturales.
                </div>
                <div className="p-3 bg-white/90 border border-[#FDE047] rounded">
                  📌 <strong>Paso 3:</strong> Cancelás el 50% restante y se despacha de inmediato por Correos de CR.
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#854D0E] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#713F12] transition-colors"
            >
              Ver Prendas para Apartar
            </button>
          </div>
        )}

        {/* 6. CHICAS / REVIEWS */}
        {storyId === 'chicas' && (
          <div className="p-8 bg-[#FAF7F2] min-h-[420px] flex flex-col justify-between space-y-4">
            <div className="space-y-3 text-center">
              <span className="text-3xl">💋</span>
              <h3 className="font-serif text-2xl text-[#881337]">Chicas Kara Shop</h3>
              <p className="text-xs text-[#78716C]">Lo que dicen nuestras clientas en Costa Rica</p>
            </div>

            <div className="space-y-3 text-xs text-[#44403C]">
              <div className="p-3 bg-white border border-[#EAE4D9] rounded shadow-2xs rotate-[-0.5deg]">
                <p className="font-medium text-[#1C1917]">«Me llegó el conjunto de suéter gris y falda denim en 24h por Correos de CR a Heredia, ¡la tela es divina!»</p>
                <span className="text-[10px] text-[#A8A29E] block mt-1">— Mariana G. (@mari_cr)</span>
              </div>
              <div className="p-3 bg-white border border-[#EAE4D9] rounded shadow-2xs rotate-[0.5deg]">
                <p className="font-medium text-[#1C1917]">«Aparté el vestido rojo para mi cumpleaños con el 50% y la atención de Kiara fue un 100/10.»</p>
                <span className="text-[10px] text-[#A8A29E] block mt-1">— Camila S. (@cami_costarica)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#881337] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#9F1239] transition-colors"
            >
              Cerrar y Ver Catálogo
            </button>
          </div>
        )}

        {/* 7. CONSIGNACION / ENVIOS */}
        {storyId === 'consignacion' && (
          <div className="p-8 bg-[#FEF2F2] min-h-[400px] flex flex-col justify-between space-y-4">
            <div className="space-y-3 text-center">
              <span className="text-4xl">📮</span>
              <h3 className="font-serif text-2xl text-[#991B1B]">Envíos por Correos de Costa Rica</h3>
              <p className="text-xs text-[#57534E]">Entregas a domicilio o sucursal en todo el país</p>
            </div>

            <div className="space-y-2 text-xs font-mono text-[#57534E]">
              <div className="flex justify-between p-2.5 bg-white border border-rose-200">
                <span>Tarifa GAM y Rural:</span>
                <strong className="text-[#991B1B]">₡ 3.000</strong>
              </div>
              <div className="flex justify-between p-2.5 bg-white border border-rose-200">
                <span>Compras mayores a ₡35.000:</span>
                <strong className="text-emerald-700">GRATIS</strong>
              </div>
              <div className="flex justify-between p-2.5 bg-white border border-rose-200">
                <span>Tiempo de entrega estimado:</span>
                <strong>24 a 48 horas</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#991B1B] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#7F1D1D] transition-colors"
            >
              Listo
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
