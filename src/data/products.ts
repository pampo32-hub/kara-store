import { Product } from '../types/store';

// Direct ES imports so Vite bundles and hashes them into dist/assets for 100% reliable production publishing
import imgVestidoRojo from '../assets/images/kara_real_vestido_rojo_lentejuelas_1792153969507.jpg';
import imgTopGris from '../assets/images/kara_real_top_hombros_caidos_denim_1792153970420.jpg';
import imgTopPlomo from '../assets/images/kara_real_top_rib_plomo_flatlay_1792153971415.jpg';
import imgFaldaGris from '../assets/images/kara_real_falda_tablas_gris_flatlay_1792153971829.jpg';
import imgCorsetDenim from '../assets/images/kara_real_corset_denim_volantes_1792153972182.jpg';
import imgHalterAzul from '../assets/images/kara_real_halter_azul_lunares_1792153989787.jpg';
import imgChalecoCamel from '../assets/images/kara_real_chaleco_corset_camel_1792153990369.jpg';
import imgSetRibCrema from '../assets/images/kara_real_set_rib_crema_corset_1792153991355.jpg';
import imgPoloCrema from '../assets/images/kara_real_polo_crema_denim_1792153991966.jpg';
import imgEnterizoTurquesa from '../assets/images/kara_real_enterizo_turquesa_exhibicion_1792153991918.jpg';

export const HERO_IMAGE = imgTopGris;
export const HERO_FALLBACK_IMAGE = '/images/kara_real_top_hombros_caidos_denim_1792153970420.jpg';
export const CRAFT_CHALECO_IMAGE = imgChalecoCamel;
export const CRAFT_FALLBACK_IMAGE = '/images/kara_real_chaleco_corset_camel_1792153990369.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'kara-001',
    name: 'Vestido Mini Lentejuelas Rojas con Flor al Cuello',
    category: 'vestidos',
    categoryLabel: 'Vestidos de Fiesta',
    priceCRC: 17500,
    originalPriceCRC: 21500,
    priceUSD: 33.5,
    fabric: 'Lentejuelas Brillantes sobre Malla Elástica',
    composition: 'Tejido elástico de lentejuelas rojo rubí con forro interior suave antipicores',
    fit: 'Silueta ajustada al cuerpo con escote halter y chocker de flor incluido',
    colors: [
      { name: 'Rojo Rubí', hex: '#B91C1C' },
      { name: 'Negro Noche', hex: '#1C1917' }
    ],
    sizes: ['XS / S (Talla 0-4)', 'M (Talla 6-8)'],
    image: imgVestidoRojo,
    fallbackImage: '/images/kara_real_vestido_rojo_lentejuelas_1792153969507.jpg',
    tag: 'Edición Fiesta',
    description: 'Vestido mini de impacto confeccionado en lentejuelas rojas con reflejos destellantes. Incorpora el accesorio choker con flor tridimensional a juego para llevar al cuello, tal como lo viste en las historias de @kara_shop_cr.',
    details: [
      'Flor artesanal desmontable al cuello con cinta a tono',
      'Espalda descubierta con tirantes ajustables cruzados',
      'Forro completo de tacto suave que no raspa la piel',
      'Ideal para combinar con botas altas con plataforma'
    ],
    care: [
      'Lavado a mano con cuidado en agua fría',
      'No retorcer ni escurrir con fuerza',
      'Secado en plano sobre toalla'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-002',
    name: 'Top Hombros Caídos Manga Campana & Minifalda Cargo',
    category: 'sets',
    categoryLabel: 'Outfits Completos',
    priceCRC: 16500,
    originalPriceCRC: 19500,
    priceUSD: 31.5,
    fabric: 'Knit Ribbed Jaspeado & Denim Lavado',
    composition: 'Top en punto canalé gris cálido elástico + Falda en 100% denim de algodón con bolsillos fuelle',
    fit: 'Top doblado off-the-shoulder con mangas amplias y minifalda tiro medio con faja negra',
    colors: [
      { name: 'Gris Jaspeado & Denim Claro', hex: '#949599' },
      { name: 'Crema & Denim Celeste', hex: '#EAE4D9' }
    ],
    sizes: ['S (Talla 4-6)', 'M (Talla 8-10)'],
    image: imgTopGris,
    fallbackImage: '/images/kara_real_top_hombros_caidos_denim_1792153970420.jpg',
    tag: 'Outfit Viral Instagram',
    description: 'El conjunto más pedido de Kara Shop. Combina el suéter crop de hombros descubiertos en punto grueso acanalado y mangas campana, junto con la minifalda denim de bolsillos cargo y cinturón con hebilla circular.',
    details: [
      'Cuello vuelto elástico que se mantiene firme en los hombros',
      'Mangas largas con apertura acampanada tipo flared',
      'Minifalda con bolsillos cargo utilitarios laterales',
      'Incluye faja negra con hebilla metálica'
    ],
    care: [
      'Lavar por separado en agua fría',
      'No usar secadora para proteger la elasticidad del tejido',
      'Planchar la falda denim a temperatura media'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-003',
    name: 'Top Crop Rib Plomo Espalda Deportiva (Flatlay)',
    category: 'tops',
    categoryLabel: 'Tops & Blusas',
    priceCRC: 11500,
    originalPriceCRC: 14000,
    priceUSD: 22.0,
    fabric: 'Rib Spandex de Alta Densidad',
    composition: '95% Algodón peinado elástico, 5% Spandex de compresión anatómica',
    fit: 'Ajuste ceñido con corte curvado en bajo y espalda nadadora racerback',
    colors: [
      { name: 'Gris Plomo / Dark Gray', hex: '#4B4D52' },
      { name: 'Negro Carbón', hex: '#1C1917' },
      { name: 'Blanco Crudo', hex: '#FBF9F5' }
    ],
    sizes: ['XS (Extra Small)', 'S (Small)', 'M (Medium)'],
    image: imgTopPlomo,
    fallbackImage: '/images/kara_real_top_rib_plomo_flatlay_1792153971415.jpg',
    tag: 'Básico Esencial',
    description: 'Top deportivo crop en canalé gris plomo con silueta curva en la parte baja que estiliza la cintura. Perfecto para usar con faldas de tablas, jeans anchos o shorts.',
    details: [
      'Espalda estilo racerback que despeja los omóplatos',
      'Rib grueso que no trasluce ni deforma',
      'Bajo en media luna favorecedor',
      'Costuras planas reforzadas'
    ],
    care: [
      'Lavado a máquina programa suave con agua fría',
      'Secado en percha a la sombra',
      'No requiere planchado'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-004',
    name: 'Falda de Tablas Plisada Gris Marengo (Flatlay)',
    category: 'faldas',
    categoryLabel: 'Faldas & Minis',
    priceCRC: 13500,
    originalPriceCRC: 16000,
    priceUSD: 26.0,
    fabric: 'Sarga Texturizada Anti-Arrugas',
    composition: '80% Poliéster estructural con tablas prensadas al calor, 20% Viscosa',
    fit: 'Tiro medio-alto con tablas uniformes tipo colegial / tennis skirt',
    colors: [
      { name: 'Gris Marengo', hex: '#525459' },
      { name: 'Blanco Nieve', hex: '#F8F7F4' },
      { name: 'Negro Clásico', hex: '#1C1917' }
    ],
    sizes: ['S (Cintura 64-68cm)', 'M (Cintura 69-74cm)', 'L (Cintura 75-80cm)'],
    image: imgFaldaGris,
    fallbackImage: '/images/kara_real_falda_tablas_gris_flatlay_1792153971829.jpg',
    tag: 'Tendencia Aesthetic',
    description: 'Minifalda plisada de tablas anchas en tejido sastre gris marengo con cierre frontal y botón. Diseñada con pretina estructurada para armar looks aesthetic estilo Y2K o colegial moderno.',
    details: [
      'Tablas permanentes prensadas que no se desarman al lavar',
      'Cierre de cremallera metálica con botón oculto',
      'Trabillas para faja delgada',
      'Vuelo limpio y estructurado'
    ],
    care: [
      'Lavar al revés en ciclo delicado',
      'Colgar en percha con pinzas de la pretina para conservar las tablas',
      'Planchar con vapor vertical si es necesario'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-005',
    name: 'Corset Denim Lavado con Hebillas & Falda con Volantes',
    category: 'sets',
    categoryLabel: 'Outfits Completos',
    priceCRC: 18000,
    originalPriceCRC: 22000,
    priceUSD: 34.5,
    fabric: 'Denim Ácido & Popelín Crema',
    composition: 'Top en mezclilla oscura desgastada con varillas de soporte + Falda en capas de popelín algodón',
    fit: 'Corset strapless con cremallera expuesta al frente y falda mini escalonada de vuelo',
    colors: [
      { name: 'Denim Negro Lavado & Crema', hex: '#3B3E45' },
      { name: 'Denim Azul Marino & Blanco', hex: '#2A3447' }
    ],
    sizes: ['S', 'M'],
    image: imgCorsetDenim,
    fallbackImage: '/images/kara_real_corset_denim_volantes_1792153972182.jpg',
    tag: 'Look Estrella',
    description: 'Outfit emblemático de @kara_shop_cr. Incluye el corset de denim ácido con cremallera plateada al frente y hebillas laterales ajustables, combinado con la minifalda de volantes en doble capa tono crema marfil.',
    details: [
      'Varillas internas flexibles que definen la silueta',
      'Hebillas metálicas funcionales a los lados para graduar el ajuste',
      'Cremallera frontal metálica resistente',
      'Falda en corte evasé con cintura elástica cómoda'
    ],
    care: [
      'Lavar a mano por separado para no tintar la falda clara',
      'Secado al aire libre a la sombra',
      'No usar blanqueadores'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-006',
    name: 'Top Halter Azul Lunares Blancos & Short con Encaje',
    category: 'tops',
    categoryLabel: 'Tops & Blusas',
    priceCRC: 14500,
    originalPriceCRC: 17500,
    priceUSD: 28.0,
    fabric: 'Lycra Estampada Suave & Encaje Bordado',
    composition: 'Top en microfibra azul marino con topos blancos + Short en encaje floral en capas',
    fit: 'Escote en V profundo pronunciado con lazada al cuello y short fluido con blondas',
    colors: [
      { name: 'Azul Polka & Blanco', hex: '#1E3A8A' },
      { name: 'Rojo Polka & Blanco', hex: '#DC2626' }
    ],
    sizes: ['XS / S', 'M'],
    image: imgHalterAzul,
    fallbackImage: '/images/kara_real_halter_azul_lunares_1792153989787.jpg',
    tag: 'Romantic Vintage',
    description: 'Look fresco y femenino con aire retro. El top halter en azul profundo con lunares blancos presenta un escote frontal vertiginoso atado al cuello, complementado por los shorts con volados de encaje blanco.',
    details: [
      'Lazada ancha al cuello para regular la elevación del escote',
      'Copa suave con pinzas que enmarcan el pecho',
      'Short con pretina elástica fruncida suave',
      'Capas de blonda floral con forro interior'
    ],
    care: [
      'Lavado a mano delicado con jabón neutro',
      'No retorcer el encaje',
      'Secar extendido a la sombra'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-007',
    name: 'Chaleco Corset Camel Strapless & Falda Tablas Blanca',
    category: 'sets',
    categoryLabel: 'Sets & Coordinados',
    priceCRC: 16000,
    originalPriceCRC: 19000,
    priceUSD: 30.5,
    fabric: 'Paño Sastre Suave & Gabardina',
    composition: 'Chaleco en tejido sastre camel con botones forrados + Minifalda en gabardina blanca de tablas',
    fit: 'Top entallado con escote corazón y bajo en pico, falda corta de tablas prensadas',
    colors: [
      { name: 'Camel & Blanco Marfil', hex: '#C29B68' },
      { name: 'Gris Perla & Negro', hex: '#9CA3AF' }
    ],
    sizes: ['S (Talla 4-6)', 'M (Talla 8-10)'],
    image: imgChalecoCamel,
    fallbackImage: '/images/kara_real_chaleco_corset_camel_1792153990369.jpg',
    tag: 'Old Money Chic',
    description: 'Estética de sastrería pura y femenina. El chaleco corset strapless en tono camel tostado estiliza la cintura con su botonadura frontal y bajo en punta, combinado con la clásica falda de tablas blanca inmaculada.',
    details: [
      'Escote corazón estructurado con copas modeladas',
      'Botones forrados en la misma tela a lo largo del frente',
      'Costuras princesa que afinan visualmente el talle',
      'Falda con elástico interno y tablas limpias'
    ],
    care: [
      'Limpieza en seco o lavado a mano muy delicado',
      'Planchar con paño protector',
      'Guardar colgado para mantener las formas'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-008',
    name: 'Set Costillita Rib Crema: Corset de Ganchillos & Minifalda',
    category: 'sets',
    categoryLabel: 'Sets & Coordinados',
    priceCRC: 15500,
    originalPriceCRC: 18500,
    priceUSD: 29.5,
    fabric: 'Rib Costillita Grueso de Alta Densidad',
    composition: '90% Algodón trenzado en canalé ancho, 10% Elastano de compresión media',
    fit: 'Corset con tirantes anchos y cierre frontal de broches + falda mini tubo ceñida',
    colors: [
      { name: 'Crema Almendra', hex: '#EDE8DF' },
      { name: 'Negro Ónix', hex: '#1C1917' }
    ],
    sizes: ['S', 'M'],
    image: imgSetRibCrema,
    fallbackImage: '/images/kara_real_set_rib_crema_corset_1792153991355.jpg',
    tag: 'Set Exclusivo 2 Piezas',
    description: 'Conjunto de dos piezas confeccionado en costillita rib crema de textura táctil deliciosa. El corset cuenta con detalles de ganchillos metálicos al frente y copas pespunteadas, haciendo juego perfecto con su minifalda ceñida.',
    details: [
      'Fila frontal de broches metálicos tipo corsetería clásica',
      'Costuras anatómicas marcadas bajo el busto',
      'Minifalda con pretina elástica y bajo festoneado',
      'Tejido grueso que no trasluce en absoluto'
    ],
    care: [
      'Lavar al revés en bolsa de lavado',
      'Secado en horizontal para que el punto no ceda',
      'No usar secadora'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-009',
    name: 'Top Polo Cuello V Manga Larga & Minifalda Denim Deshilachada',
    category: 'tops',
    categoryLabel: 'Tops & Blusas',
    priceCRC: 15000,
    originalPriceCRC: 18000,
    priceUSD: 28.5,
    fabric: 'Punto Acanalado Fino & Denim Rigido',
    composition: 'Top en hilo fino elástico blanco marfil + Minifalda en denim 100% algodón lavado',
    fit: 'Top al cuerpo con cuello polo abierto y falda vaquera recta con bajo deshilachado',
    colors: [
      { name: 'Blanco Marfil & Denim Claro', hex: '#F5F2EB' },
      { name: 'Gris Claro & Denim Medio', hex: '#D1D5DB' }
    ],
    sizes: ['S (Talla 4-6)', 'M (Talla 8-10)', 'L (Talla 10-12)'],
    image: imgPoloCrema,
    fallbackImage: '/images/kara_real_polo_crema_denim_1792153991966.jpg',
    tag: 'Look Casual Diario',
    description: 'La combinación perfecta de confort y tendencia. Un top de manga larga en punto acanalado fino con cuello camisero en V sin botones que resalta la clavícula, emparejado con una minifalda de mezclilla clásica con flecos en el bajo.',
    details: [
      'Cuello polo tipo Johnny collar sin botones',
      'Mangas largas ceñidas con puño limpio',
      'Falda con cinco bolsillos tradicionales y costura cruzada frontal',
      'Bajo rústico deshilachado con pespunte de seguridad'
    ],
    care: [
      'Lavado a máquina con prendas del mismo color',
      'Secado en percha al aire libre',
      'Planchar el top a temperatura baja'
    ],
    inStock: true,
    isApartadoAvailable: true
  },
  {
    id: 'kara-010',
    name: 'Enterizo Palazzo Turquesa Escote Cuadrado (Exhibición)',
    category: 'vestidos',
    categoryLabel: 'Vestidos & Enterizos',
    priceCRC: 17000,
    originalPriceCRC: 20000,
    priceUSD: 32.5,
    fabric: 'Crepé Elástico de Caída Pesada',
    composition: '92% Poliéster crepé con elasticidad en 4 direcciones, 8% Elastano',
    fit: 'Cuerpo ajustado con tirantes anchos y pernera ancha acampanada tipo campana/palazzo',
    colors: [
      { name: 'Turquesa / Teal Vibrante', hex: '#0D9488' },
      { name: 'Verde Esmeralda', hex: '#059669' },
      { name: 'Naranja Cítrico', hex: '#EA580C' }
    ],
    sizes: ['S (Talla 4-6)', 'M (Talla 8-10)', 'L (Talla 10-12)'],
    image: imgEnterizoTurquesa,
    fallbackImage: '/images/kara_real_enterizo_turquesa_exhibicion_1792153991918.jpg',
    tag: 'Pieza de Exhibición',
    description: 'Extraído directamente de la colección de @kara_shop_cr y presentado en maniquí de exhibición. Este enterizo en un vibrante tono turquesa estiliza de inmediato gracias a su escote cuadrado limpio y su bota palazzo acampanada.',
    details: [
      'Escote cuadrado geométrico en pecho y espalda',
      'Corte de cintura alta con pinzas anatómicas',
      'Pernera ancha flare con caída fluida y movimiento',
      'Cierre de cremallera invisible en la espalda'
    ],
    care: [
      'Lavado delicado en agua fría',
      'Colgar en percha inmediatamente para evitar arrugas',
      'Planchar con vapor medio'
    ],
    inStock: true,
    isApartadoAvailable: true
  }
];

export const CATEGORIES = [
  { id: 'todos', label: 'Todo el Catálogo (10)' },
  { id: 'sets', label: 'Outfits & Sets' },
  { id: 'tops', label: 'Tops & Rib' },
  { id: 'faldas', label: 'Faldas & Minis' },
  { id: 'vestidos', label: 'Vestidos & Enterizos' }
] as const;

export const KARA_HIGHLIGHTS = [
  {
    title: 'Prendas Reales en Maniquí & Flatlay',
    description: 'Fotografías de las prendas exactamente como se exhiben en @kara_shop_cr, sin modelos para que aprecies los cortes y telas reales.'
  },
  {
    title: 'Sistema de Apartado con 50%',
    description: 'Apartá cualquier prenda hoy abonando solo la mitad y tenés hasta 30 días para retirar o solicitar envío.'
  },
  {
    title: 'Envíos por Correos de CR',
    description: 'Llegamos a todo Costa Rica con número de guía rastreable (₡3.000 o gratis a partir de ₡35.000).'
  },
  {
    title: 'Pagos por SINPE Móvil',
    description: 'Transferí de inmediato a nuestro número comercial registrado sin comisiones ni esperas.'
  }
];
