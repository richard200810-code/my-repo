import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { HairExtensionsandWigs } from '@/entities';
import { BaseCrudService, useCurrency } from '@/integrations';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
  const [products, setProducts] = useState<HairExtensionsandWigs[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<HairExtensionsandWigs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [selectedApplicationMethod, setSelectedApplicationMethod] = useState<string>('all');
  const [selectedLength, setSelectedLength] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');

  const { currency } = useCurrency();

  const LIMIT = 12;

  // Predefined lengths - only even numbers from 14 to 30 inches
  const PREDEFINED_LENGTHS = [14, 16, 18, 20, 22, 24, 26, 28, 30].map(n => n.toString());

  useEffect(() => {
    loadProducts();
  }, [skip]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedApplicationMethod, selectedLength, selectedColor]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<HairExtensionsandWigs>(
        'hairextensions',
        {},
        { limit: LIMIT, skip }
      );

      if (skip === 0) {
        setProducts(result.items);
      } else {
        setProducts(prev => [...prev, ...result.items]);
      }

      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Normalize string: lowercase, remove spaces, hyphens, and non-alphanumeric characters
  const normalizeString = (str: string | undefined): string => {
    if (!str) return '';
    return str.toLowerCase().replace(/[\s\-_]/g, '').replace(/[^a-z0-9]/g, '');
  };

  // Explicit alias map for application methods
  // Maps visible UI options to actual database values
  const APPLICATION_ALIAS_MAP: Record<string, string[]> = {
    'K-Tip': ['ktip', 'k-tip'],
    'I-Tip': ['itip', 'i-tip'],
    'Clip In': ['clipin', 'clip-in', 'clipinextension', 'clip-in extension'],
    'Tape In': ['tapein', 'tape-in', 'tapenormal', 'tape normal', 'tapeinextension', 'tape-in extension'],
    'Invisible Tape In': ['tapeinvisible', 'tape invisible'],
    'U-Tip': ['prebonded', 'pre-bonded', 'utip', 'u-tip'],
    'Machine Weft': ['sewin', 'sew-in'],
    'Nano-Tip': ['nanotip', 'nano-tip'],
    'V-Tip': ['vtip', 'v-tip'],
    'Y-Tip': ['ytip', 'y-tip'],
    'Genius Weft': ['geniusweft', 'genius weft'],
    'Hand Tied Weft': ['handtiedweft', 'hand tied weft'],
    'Flat Weft': ['flatweft', 'flat weft'],
    'Double Piece Flat Weft': ['doublepieceflatweft', 'double piece flat weft'],
    'Volume Weft': ['volumeweft', 'volume weft'],
    'Genius Weft with Hole': ['geniusweftwithhole', 'genius weft with hole'],
    'Genius UP with Hole': ['geniusupwithhole', 'genius up with hole'],
    'Halo': ['halo'],
    'Ponytail': ['ponytail'],
    'One Piece Clip In': ['onepiececlipin', 'one piece clip in'],
    'Lace Clip In': ['laceclipin', 'lace clip in'],
    'PU Clip In': ['puclipin', 'pu clip in'],
    'Mini Tape In': ['minitapein', 'mini tape in'],
    'Seamless Tape In': ['seamlesstapein', 'seamless tape in'],
    'PU Invisible with Hole': ['puinvisiblewithhole', 'pu invisible with hole'],
    'PU with Hole': ['puwithhole', 'pu with hole'],
    'Long Invisible Tape In': ['longinvisibletapein', 'long invisible tape in'],
    'Long Tape In': ['longtapein', 'long tape in'],
    'Stitched Tape In': ['stitchedtapein', 'stitched tape in'],
    'Micro Loop Hair Extension': ['microloophairextension', 'micro loop hair extension'],
    'Feather Hair Weft': ['featherhairweft', 'feather hair weft'],
    'H6 Feather Hair Extension': ['h6featherhairextension', 'h6 feather hair extension'],
    'Plastic Nano Tip': ['plasticnanotip', 'plastic nano tip']
  };

  // Get application value from product - checks multiple fields with fallback
  const getApplicationValue = (product: HairExtensionsandWigs): string => {
    // Check in order: applicationMethod, productType, then fallback to name
    const value = product.applicationMethod || product.productType || product.itemName || '';
    return normalizeString(value);
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedApplicationMethod !== 'all') {
      const acceptedValues = APPLICATION_ALIAS_MAP[selectedApplicationMethod] || [normalizeString(selectedApplicationMethod)];

      filtered = filtered.filter(p => {
        const normalizedProductValue = getApplicationValue(p);
        return acceptedValues.includes(normalizedProductValue);
      });
    }

    if (selectedLength !== 'all') {
      filtered = filtered.filter(p => p.length?.toString() === selectedLength);
    }

    if (selectedColor !== 'all') {
      filtered = filtered.filter(p => p.color === selectedColor);
    }

    setFilteredProducts(filtered);
  };

  const loadMore = () => {
    setSkip(prev => prev + LIMIT);
  };

  // Extract unique values for filters
  const lengths = ['all', ...PREDEFINED_LENGTHS];
  const colors = ['all', ...Array.from(new Set(products.map(p => p.color).filter(Boolean)))];

  const getCatalogCategory = (product: HairExtensionsandWigs): string => {
    const name = (product.itemName || '').toLowerCase();
    if (name.includes('double') && name.includes('flat')) return 'Extensiones Double Piece Flat Weft';
    if (name.includes('hand tied')) return 'Extensiones Hand Tied Weft';
    if (name.includes('machine')) return 'Extensiones Machine Weft';
    if (name.includes('volume')) return 'Extensiones Volume Weft';
    if (name.includes('flat weft')) return 'Extensiones Flat Weft';
    if (name.includes('genius') && name.includes('hole')) return 'Extensiones Genius Weft with Hole';
    if (name.includes('genius')) return 'Extensiones Genius Weft';
    if (name.includes('seamless') && name.includes('tape')) return 'Extensiones Seamless Tape in';
    if (name.includes('invisible') && name.includes('tape')) return 'Extensiones Invisible Tape in';
    if (name.includes('mini tape')) return 'Extensiones Mini Tape in';
    if (name.includes('long tape')) return 'Extensiones Long Tape in';
    if (name.includes('clip')) return 'Extensiones Clip in';
    if (name.includes('i-tip')) return 'Extensiones I-Tip';
    if (name.includes('nano-tip')) return 'Extensiones Nano-Tip';
    if (name.includes('k-tip')) return 'Extensiones K-Tip';
    if (name.includes('u-tip')) return 'Extensiones U-Tip';
    if (name.includes('wig')) return 'Pelucas';
    if (name.includes('fusion') || name.includes('keratin')) return 'Extensiones de queratina';
    if (name.includes('weft') || name.includes('sew-in')) return 'Extensiones Weft';
    const type = product.productType || '';
    const fallback: Record<string, string> = {
      'Tape Invisible': 'Extensiones Invisible Tape in',
      'Tape Normal': 'Extensiones Tape in',
      'Tape-in Extension': 'Extensiones Tape in',
      'K-tip': 'Extensiones K-Tip',
      'I-tip': 'Extensiones I-Tip',
      'Clip-in': 'Extensiones Clip in',
      'Clip-in Extension': 'Extensiones Clip in',
      'Sew-in': 'Extensiones Weft',
      'Fusion': 'Extensiones de queratina',
      'Pre-bonded': 'Extensiones U-Tip',
      'Wig': 'Pelucas'
    };
    return fallback[type] || 'Extensiones de cabello';
  };

  const CATEGORY_CARDS = [
    ['Extensiones Genius Weft','Genius Weft','https://thehairshop.com/cdn/shop/products/weft_808_hair_extensions_the_hair_shop_5__57993.1542309127.1280.1280_900x.jpg?v=1678746590'],
    ['Extensiones Hand Tied Weft','Hand Tied Weft','https://thehairshop.com/cdn/shop/products/weft_808_hair_extensions_the_hair_shop_5__57993.1542309127.1280.1280_900x.jpg?v=1678746590'],
    ['Extensiones Flat Weft','Flat Weft','https://thehairshop.com/cdn/shop/products/weft_808_hair_extensions_the_hair_shop_5__57993.1542309127.1280.1280_900x.jpg?v=1678746590'],
    ['Extensiones Machine Weft','Machine Weft','https://thehairshop.com/cdn/shop/products/weft_808_hair_extensions_the_hair_shop_5__57993.1542309127.1280.1280_900x.jpg?v=1678746590'],
    ['Extensiones Volume Weft','Volume Weft','https://thehairshop.com/cdn/shop/products/weft_808_hair_extensions_the_hair_shop_5__57993.1542309127.1280.1280_900x.jpg?v=1678746590'],
    ['Extensiones Feather Weft','Feather hair weft','https://thehairshop.com/cdn/shop/products/weft_808_hair_extensions_the_hair_shop_5__57993.1542309127.1280.1280_900x.jpg?v=1678746590'],
    ['Extensiones H6 Feather','H6 Feather hair extensions','https://thehairshop.com/cdn/shop/products/weft_808_hair_extensions_the_hair_shop_5__57993.1542309127.1280.1280_900x.jpg?v=1678746590'],
    ['Extensiones I-Tip','I-Tip hair extensions','https://thehairshop.com/cdn/shop/products/i_tip_808_hair_extensions_the_hair_shop_st_1__11985.1546542073.1280.1280_900x.jpg?v=1710455969'],
    ['Extensiones K-Tip','K Tip hair extensions','https://thehairshop.com/cdn/shop/products/keratip_808_hair_extensions_the_hair_shop_st_1__01293.1641514967.1280.1280_900x.jpg?v=1710456002'],
    ['Extensiones U-Tip','U-Tip hair extensions','https://thehairshop.com/cdn/shop/products/keratip_808_exclusive_hair_extensions_the_hair_shop_st_1.jpg__08204.1541034445.1280.1280_900x.jpg?v=1710455968'],
    ['Extensiones V-Tip','V-Tip hair extensions','https://thehairshop.com/cdn/shop/products/keratip_808_hair_extensions_the_hair_shop_st_1__01293.1641514967.1280.1280_900x.jpg?v=1710456002'],
    ['Extensiones Y-Tip','Y-Tip hair extensions','https://thehairshop.com/cdn/shop/products/keratip_808_hair_extensions_the_hair_shop_st_1__01293.1641514967.1280.1280_900x.jpg?v=1710456002'],
    ['Extensiones Nano-Tip','Nano-Tip hair extensions','https://thehairshop.com/cdn/shop/files/microtip_900x.jpg?v=1737574105'],
    ['Extensiones Micro Loop','Micro Loop hair extension','https://thehairshop.com/cdn/shop/files/microtip_900x.jpg?v=1737574105'],
    ['Extensiones Tape in','Tape in','https://thehairshop.com/cdn/shop/products/skinweft_tape_in_hair_extensions_the_hair_shop_1__44145.1556322582.1280.1280_900x.jpg?v=1678488297'],
    ['Extensiones Seamless Tape in','Seamless Tape in','https://thehairshop.com/cdn/shop/products/skinweft_tape_in_hair_extensions_the_hair_shop_1__44145.1556322582.1280.1280_900x.jpg?v=1678488297'],
    ['Extensiones Invisible Tape in','Invisible Tape in','https://thehairshop.com/cdn/shop/products/skinweft_tape_in_hair_extensions_the_hair_shop_1__44145.1556322582.1280.1280_900x.jpg?v=1678488297'],
    ['Extensiones Mini Tape in','Mini Tape in','https://thehairshop.com/cdn/shop/products/IMG_4116__45207.1637100208.1280.1280_900x.jpg?v=1678488308'],
    ['Extensiones Clip in','Clip in','https://thehairshop.com/cdn/shop/products/26in_clipins3-NEW-2__29197_900x.jpg?v=1680912989'],
    ['Extensiones Lace Clip in','Lace Clip in','https://thehairshop.com/cdn/shop/products/26in_clipins3-NEW-2__29197_900x.jpg?v=1680912989'],
    ['Extensiones PU Clip in','PU Clip in','https://thehairshop.com/cdn/shop/products/26in_clipins3-NEW-2__29197_900x.jpg?v=1680912989'],
    ['Color Ombre','Ombre','https://thehairshop.com/cdn/shop/products/1_BLACK_Color_swatches_2019final_2e66a2a4-630d-452f-8fd7-b4b7b2c643e6_300x300.jpg?v=1678755397'],
    ['Color Piano','Piano Color','https://thehairshop.com/cdn/shop/products/1_BLACK_Color_swatches_2019final_2e66a2a4-630d-452f-8fd7-b4b7b2c643e6_300x300.jpg?v=1678755397'],
    ['Color Balayage','Balayage','https://thehairshop.com/cdn/shop/products/1_BLACK_Color_swatches_2019final_2e66a2a4-630d-452f-8fd7-b4b7b2c643e6_300x300.jpg?v=1678755397'],
  ].map(([title, application, image]) => ({ title, application, image, href: '/products?application=' + encodeURIComponent(application) }));

  const CATEGORY_GROUPS = [
    { id: 'weft', eyebrow: 'PROFESIONAL', title: 'Weft', description: 'Construcciones continuas para instalación cosida o con filas de beads. Compara el grosor, la costura y la facilidad de corte.', cta: 'Ver extensiones Weft', applications: ['Genius Weft','Hand Tied Weft','Flat Weft','Machine Weft','Volume Weft','Feather hair weft','H6 Feather hair extensions'] },
    { id: 'keratin', eyebrow: 'PRE-BONDED', title: 'Keratin & Strand', description: 'Extensiones por mechón con diferentes formas de unión. Elige entre puntas para calor, anilla o aplicaciones discretas.', cta: 'Ver sistemas Keratin', applications: ['I-Tip hair extensions','K Tip hair extensions','U-Tip hair extensions','V-Tip hair extensions','Y-Tip hair extensions','Nano-Tip hair extensions','Micro Loop hair extension'] },
    { id: 'tape', eyebrow: 'SALÓN', title: 'Tape-in', description: 'Sistemas pre-encintados para una aplicación rápida, limpia y uniforme. Ideales para mantenimiento y reposición profesional.', cta: 'Ver sistemas Tape-in', applications: ['Tape in','Seamless Tape in','Invisible Tape in','Mini Tape in'] },
    { id: 'ready', eyebrow: 'REMOVIBLE', title: 'Ready to Wear', description: 'Opciones removibles para cambios rápidos de volumen y longitud sin compromiso de instalación permanente.', cta: 'Ver opciones removibles', applications: ['Clip in','Lace Clip in','PU Clip in'] },
    { id: 'color', eyebrow: 'ACABADOS', title: 'Color & Blends', description: 'Combinaciones de color para crear mezclas, contrastes y acabados personalizados para cada cliente.', cta: 'Explorar acabados', applications: ['Ombre','Piano Color','Balayage'] },
  ];

  const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    'Genius Weft': 'Base fina y ligera para una instalación profesional.',
    'Hand Tied Weft': 'Costura delicada para una sensación flexible y ligera.',
    'Flat Weft': 'Perfil plano para una integración discreta.',
    'Machine Weft': 'Construcción cosida resistente para uso profesional.',
    'Volume Weft': 'Más densidad para crear volumen de forma uniforme.',
    'Feather hair weft': 'Weft ligero para acabados suaves y naturales.',
    'H6 Feather hair extensions': 'Formato ligero para movimiento y textura.',
    'I-Tip hair extensions': 'Punta para instalación con anilla, sin calor.',
    'K Tip hair extensions': 'Unión de queratina para aplicación con calor.',
    'U-Tip hair extensions': 'Punta en U para una unión segura y uniforme.',
    'V-Tip hair extensions': 'Punta en V para una unión pequeña y precisa.',
    'Y-Tip hair extensions': 'Punta flexible para instalación con beads.',
    'Nano-Tip hair extensions': 'Sistema discreto para puntos de unión pequeños.',
    'Micro Loop hair extension': 'Aplicación mecánica para instalación reutilizable.',
    'Tape in': 'Sistema encintado para aplicación rápida en salón.',
    'Seamless Tape in': 'Borde fino para una integración más natural.',
    'Invisible Tape in': 'Base discreta para un acabado prácticamente invisible.',
    'Mini Tape in': 'Formato compacto para zonas pequeñas y retoques.',
    'Clip in': 'Clips visibles y prácticos para colocación removible.',
    'Lace Clip in': 'Base de encaje para una integración suave.',
    'PU Clip in': 'Base PU para mayor estabilidad y cobertura.',
    'Ombre': 'Transición gradual de color para un acabado moderno.',
    'Piano Color': 'Mezcla de tonos para dimensión y contraste.',
    'Balayage': 'Combinación de tonos inspirada en coloración profesional.',
  };

  const getCategoryCard = (application: string) => CATEGORY_CARDS.find(card => card.application === application);
  return (
    <div className="min-h-screen bg-background text-primary">
      <Header />

      <main className="w-full">
        <section className="relative overflow-hidden border-b border-primary/10 bg-primary/5 px-6 py-20 md:px-16 lg:px-24 lg:py-28">
          <div className="mx-auto grid max-w-[100rem] gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="mb-5 font-paragraph text-xs font-semibold uppercase tracking-[0.22em] text-primary/60">Guía profesional de extensiones</p>
              <h1 className="max-w-4xl font-heading text-5xl leading-[0.95] md:text-7xl lg:text-8xl">Compara los tipos de extensiones para tu servicio</h1>
              <p className="mt-8 max-w-2xl font-paragraph text-lg leading-relaxed text-primary/75 md:text-xl">Explora las principales construcciones, métodos de aplicación y acabados de LUX HAIR. Elige la estructura que mejor se adapta a tu salón y a las necesidades de cada cliente.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#weft" className="inline-flex items-center rounded-full bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary hover:ring-1 hover:ring-primary">Explorar categorías</a>
                <Link to="/contact" className="inline-flex items-center rounded-full border border-primary/30 px-7 py-3 text-xs font-semibold uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground">Solicitar asesoría</Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/45 shadow-2xl">
              <Image src={CATEGORY_CARDS[0].image} alt="Detalle de la costura de una extensión Weft" width={1000} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute bottom-5 left-5 rounded-full bg-background/90 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">Detalle de construcción</div>
            </div>
          </div>
        </section>

        <section className="border-b border-primary/10 bg-background px-6 py-8 md:px-16 lg:px-24">
          <div className="mx-auto grid max-w-[100rem] grid-cols-2 divide-x divide-primary/10 md:grid-cols-4">
            <div className="px-5 py-3 first:pl-0"><p className="font-heading text-3xl md:text-4xl">05</p><p className="mt-1 text-xs uppercase tracking-widest text-primary/60">Sistemas de aplicación</p></div>
            <div className="px-5 py-3"><p className="font-heading text-3xl md:text-4xl">03</p><p className="mt-1 text-xs uppercase tracking-widest text-primary/60">Acabados de color</p></div>
            <div className="px-5 py-3"><p className="font-heading text-3xl md:text-4xl">100%</p><p className="mt-1 text-xs uppercase tracking-widest text-primary/60">Enfoque profesional</p></div>
            <div className="px-5 py-3"><p className="font-heading text-3xl md:text-4xl">1:1</p><p className="mt-1 text-xs uppercase tracking-widest text-primary/60">Asesoría personalizada</p></div>
          </div>
        </section>

        <nav className="sticky top-0 z-20 border-b border-primary/10 bg-background/95 px-6 py-4 backdrop-blur md:px-16 lg:px-24">
          <div className="mx-auto flex max-w-[100rem] flex-wrap gap-x-7 gap-y-2 text-xs font-semibold uppercase tracking-widest text-primary/65">
            {CATEGORY_GROUPS.map(group => <a key={group.id} href={'#' + group.id} className="transition-colors hover:text-primary">{group.title}</a>)}
          </div>
        </nav>

        <section className="mx-auto max-w-[100rem] px-6 md:px-16 lg:px-24">
          {CATEGORY_GROUPS.map((group, groupIndex) => {
            const cards = group.applications.map(getCategoryCard).filter(Boolean);
            return (
              <section id={group.id} key={group.id} className="scroll-mt-20 border-b border-primary/10 py-20 md:py-28">
                <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                  <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/55">{group.eyebrow}</p><h2 className="font-heading text-5xl leading-none md:text-6xl">{group.title}</h2></div>
                  <div className="flex flex-col items-start gap-5 lg:items-end"><p className="max-w-2xl font-paragraph text-lg leading-relaxed text-primary/70 lg:text-right">{group.description}</p><Link to={cards[0]?.href || '/products'} className="inline-flex items-center gap-3 border-b border-primary pb-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-60">{group.cta}<ArrowRight className="h-4 w-4" /></Link></div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {cards.map((category, index) => (
                    <motion.article key={category.application} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.45, delay: index * 0.04 }} className="group overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white/45 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <Link to={category.href} className="block overflow-hidden"><Image src={category.image} alt={category.title + ' — detalle de conexión'} width={900} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></Link>
                      <div className="space-y-4 p-6"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/45">Método profesional</p><Link to={category.href}><h3 className="font-heading text-2xl leading-tight transition-opacity hover:opacity-65">{category.title}</h3></Link><p className="mt-3 font-paragraph text-sm leading-relaxed text-primary/65">{CATEGORY_DESCRIPTIONS[category.application] || 'Explora esta construcción profesional de LUX HAIR.'}</p></div><Link to={category.href} className="inline-flex items-center gap-3 rounded-full border border-primary/25 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-primary-foreground">Ver detalles<ArrowRight className="h-3.5 w-3.5" /></Link></div>
                    </motion.article>
                  ))}
                </div>
              </section>
            );
          })}
        </section>

        <section className="mx-auto max-w-[100rem] px-6 py-20 md:px-16 lg:px-24 lg:py-28"><div className="rounded-[2rem] bg-primary px-8 py-12 text-primary-foreground md:px-14 md:py-16"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">¿Necesitas ayuda?</p><div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="max-w-3xl font-heading text-4xl leading-tight md:text-6xl">Encuentra la construcción adecuada para cada cliente</h2><p className="mt-5 max-w-2xl font-paragraph text-lg leading-relaxed text-primary-foreground/70">Compara el método, la visibilidad del punto de unión y el mantenimiento antes de elegir. Nuestro equipo puede orientarte.</p></div><Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-background px-7 py-3 text-xs font-semibold uppercase tracking-widest text-primary transition-opacity hover:opacity-80">Hablar con el equipo<ArrowRight className="h-4 w-4" /></Link></div></div></section>
      </main>

      <Footer />
    </div>
  );
}
