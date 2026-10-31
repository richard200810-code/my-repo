import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { HairExtensionsandWigs } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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

  const LIMIT = 12;

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

  const normalizeString = (str: string | undefined): string => {
    if (!str) return '';
    return str.toLowerCase().replace(/[\s\-_]/g, '').replace(/[^a-z0-9]/g, '');
  };

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

  const getApplicationValue = (product: HairExtensionsandWigs): string => {
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
    ['Extensiones Genius Weft', 'Genius Weft', 'https://static.wixstatic.com/media/37e681_425359dee0394c43a1e81722cecb231f~mv2.png?originWidth=192&originHeight=192'],
    ['Extensiones Hand Tied Weft', 'Hand Tied Weft', 'https://static.wixstatic.com/media/37e681_f673605ffb4e4ccaa90f195532411dea~mv2.png?originWidth=192&originHeight=192'],
    ['Extensiones Flat Weft', 'Flat Weft', 'https://static.wixstatic.com/media/37e681_f441944f0604442da9a9000439a4f34b~mv2.png?originWidth=192&originHeight=192'],
    ['Extensiones Machine Weft', 'Machine Weft', 'https://static.wixstatic.com/media/37e681_3ef9d05378f642f6903f2f3bcd06d068~mv2.png?originWidth=192&originHeight=192'],
    ['Extensiones Volume Weft', 'Volume Weft', 'https://static.wixstatic.com/media/37e681_a9729fe488844738b6b47fbd7249b4cb~mv2.png?originWidth=192&originHeight=192'],
  ];

  const CHOICE_OPTIONS = [
    { title: 'Máxima Invisibilidad', desc: 'Para un look natural impecable' },
    { title: 'Incremento Continuo', desc: 'Volumen gradual y progresivo' },
    { title: 'Precisión por Mechón', desc: 'Control fino y detallado' },
    { title: 'Intercambio Removible', desc: 'Flexibilidad y versatilidad' }
  ];

  const COMPARISON_DATA = [
    { sistema: 'Weft', aplicacion: 'Cosido', union: 'Puntada', ideal: 'Volumen máximo', mantenimiento: 'Moderado' },
    { sistema: 'Keratin & Strand', aplicacion: 'Fusión térmica', union: 'Queratina', ideal: 'Precisión', mantenimiento: 'Alto' },
    { sistema: 'Tape-in', aplicacion: 'Adhesivo', union: 'Cinta', ideal: 'Versatilidad', mantenimiento: 'Bajo' },
    { sistema: 'Ready to Wear', aplicacion: 'Clip', union: 'Clip', ideal: 'Facilidad', mantenimiento: 'Mínimo' },
    { sistema: 'Color & Blends', aplicacion: 'Mixta', union: 'Variada', ideal: 'Personalización', mantenimiento: 'Variable' }
  ];

  const CATEGORY_DETAILS: Record<string, { sistema: string; aplicacion: string; union: string; ideal: string; mantenimiento: string }> = {
    'Extensiones Weft': { sistema: 'Weft', aplicacion: 'Cosido', union: 'Puntada', ideal: 'Volumen máximo', mantenimiento: 'Moderado' },
    'Extensiones de queratina': { sistema: 'Keratin & Strand', aplicacion: 'Fusión térmica', union: 'Queratina', ideal: 'Precisión', mantenimiento: 'Alto' },
    'Extensiones Tape in': { sistema: 'Tape-in', aplicacion: 'Adhesivo', union: 'Cinta', ideal: 'Versatilidad', mantenimiento: 'Bajo' },
    'Pelucas': { sistema: 'Ready to Wear', aplicacion: 'Clip', union: 'Clip', ideal: 'Facilidad', mantenimiento: 'Mínimo' },
    'Extensiones Clip in': { sistema: 'Ready to Wear', aplicacion: 'Clip', union: 'Clip', ideal: 'Facilidad', mantenimiento: 'Mínimo' }
  };

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = getCatalogCategory(product);
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, HairExtensionsandWigs[]>);



  const CATEGORY_SECTIONS = [
    { key: 'weft', eyebrow: '01 / VOLUMEN CONTINUO', title: 'Weft profesional', copy: 'Una base continua para crear volumen limpio, uniforme y cómodo en el salón.', detail: 'Cosido o beads · Base continua · Mantenimiento moderado', application: 'Genius Weft', keys: ['Extensiones Weft','Extensiones Genius Weft','Extensiones Hand Tied Weft','Extensiones Flat Weft','Extensiones Machine Weft','Extensiones Volume Weft'], image: CATEGORY_CARDS[0][2] },
    { key: 'keratin', eyebrow: '02 / PRECISIÓN POR MECHÓN', title: 'Keratin & Strand', copy: 'Sistemas por mechón para trabajar zonas concretas con un acabado preciso y natural.', detail: 'Fusión térmica o anilla · Punta definida · Control por mechón', application: 'K-Tip', keys: ['Extensiones de queratina','Extensiones K-Tip','Extensiones I-Tip','Extensiones U-Tip','Extensiones Nano-Tip'], image: 'https://static.wixstatic.com/media/37e681_c59916f2ea464b55a7f07601f820b544~mv2.png?originWidth=576&originHeight=448' },
    { key: 'tape', eyebrow: '03 / INTEGRACIÓN INVISIBLE', title: 'Tape-in', copy: 'Una aplicación rápida y plana para cambios de longitud y densidad que se integran con discreción.', detail: 'Adhesivo profesional · Cinta plana · Reposición sencilla', application: 'Tape In', keys: ['Extensiones Tape in','Extensiones Seamless Tape in','Extensiones Invisible Tape in','Extensiones Mini Tape in'], image: 'https://static.wixstatic.com/media/37e681_d251183a168b4faab31a53ff7f91a2d6~mv2.png?originWidth=384&originHeight=256' },
    { key: 'ready', eyebrow: '04 / CAMBIO REMOVIBLE', title: 'Ready to Wear', copy: 'Volumen y longitud para transformar el look sin compromiso de instalación permanente.', detail: 'Clip o base PU · Retiro diario · Flexibilidad total', application: 'Clip In', keys: ['Extensiones Clip in','Pelucas'], image: 'https://static.wixstatic.com/media/37e681_f673605ffb4e4ccaa90f195532411dea~mv2.png?originWidth=192&originHeight=192' },
    { key: 'color', eyebrow: '05 / COLOR Y DIMENSIÓN', title: 'Color & Blends', copy: 'Mezclas, contrastes y acabados de color para completar una propuesta personalizada.', detail: 'Color uniforme · Mezcla de tonos · Consulta de disponibilidad', application: 'all', keys: ['Extensiones de cabello'], image: 'https://static.wixstatic.com/media/37e681_a9729fe488844738b6b47fbd7249b4cb~mv2.png?originWidth=192&originHeight=192' }
  ];

  const collectProducts = (keys: string[]) => keys.flatMap(key => groupedProducts[key] || []).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-primary">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 -z-10"><Image src="https://static.wixstatic.com/media/37e681_c59916f2ea464b55a7f07601f820b544~mv2.png?originWidth=576&originHeight=448" alt="Cabello humano LUX HAIR" width={1600} height={900} className="h-full w-full object-cover opacity-45" /><div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" /></div>
          <div className="mx-auto grid min-h-[680px] max-w-[120rem] items-end gap-12 px-6 pb-16 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-16 md:pb-24 lg:px-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">Catálogo profesional · LUX HAIR</p>
              <h1 className="max-w-4xl font-heading text-5xl leading-[0.95] md:text-7xl lg:text-8xl">Elige la construcción que define el resultado.</h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl">Una vista completa de nuestros sistemas de extensión para que el salón pueda comparar aplicación, integración y mantenimiento antes de elegir.</p>
              <div className="mt-10 flex flex-wrap gap-4"><a href="#sistemas" className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-1">Explorar sistemas</a><Link to="/contact" className="rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">Hablar con un asesor</Link></div>
            </motion.div>
            <motion.div className="justify-self-end md:max-w-sm" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}><div className="border-l border-primary-foreground/30 pl-6"><p className="text-6xl font-heading md:text-8xl">05</p><p className="mt-2 text-sm uppercase tracking-[0.2em] text-primary-foreground/60">familias de aplicación</p><p className="mt-8 text-3xl font-heading">Una selección pensada para profesionales.</p></div></motion.div>
          </div>
        </section>

        <section className="border-b border-primary/10 bg-background px-6 py-10 md:px-16 lg:px-24"><div className="mx-auto grid max-w-[120rem] gap-4 md:grid-cols-3"><div className="flex items-center gap-4 border-l-2 border-primary px-5 py-3"><span className="text-xs font-semibold tracking-[0.2em] text-primary/45">01</span><span className="font-heading text-xl">Elige el sistema</span></div><div className="flex items-center gap-4 border-l-2 border-primary/30 px-5 py-3"><span className="text-xs font-semibold tracking-[0.2em] text-primary/45">02</span><span className="font-heading text-xl">Define el largo</span></div><div className="flex items-center gap-4 border-l-2 border-primary/15 px-5 py-3"><span className="text-xs font-semibold tracking-[0.2em] text-primary/45">03</span><span className="font-heading text-xl">Ajusta el color</span></div></div></section>

        <section id="sistemas" className="mx-auto max-w-[120rem] px-6 py-20 md:px-16 md:py-28 lg:px-24"><div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary/50">Mapa de selección</p><h2 className="max-w-3xl font-heading text-4xl leading-tight md:text-6xl">Cinco maneras de construir una mejor experiencia.</h2></div><p className="max-w-md text-base leading-relaxed text-primary/65">No todas las extensiones resuelven lo mismo. Compara el punto de unión, la rutina de mantenimiento y el acabado que busca tu cliente.</p></div>
          <div className="space-y-20">{CATEGORY_SECTIONS.map((section, index) => { const items = collectProducts(section.keys); return <motion.article key={section.key} className={
            'grid gap-10 border-t border-primary/15 pt-8 md:grid-cols-[0.32fr_0.68fr] md:gap-16 ' + (index % 2 === 1 ? 'md:[&>div:first-child]:order-2' : '')
          } initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div className="flex flex-col justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/45">{section.eyebrow}</p><h3 className="mt-5 font-heading text-4xl leading-none md:text-5xl">{section.title}</h3><p className="mt-6 max-w-md text-base leading-relaxed text-primary/70">{section.copy}</p><p className="mt-6 text-sm font-semibold leading-relaxed text-primary/55">{section.detail}</p></div><Link to={section.application === 'all' ? '/products' :               `/products?application=${encodeURIComponent(section.application)}`            } className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-primary/25 px-5 py-3 text-sm font-semibold transition-all hover:bg-primary hover:text-primary-foreground">Ver categoría <ArrowRight className="h-4 w-4" /></Link></div>
            <div><div className="relative mb-8 overflow-hidden rounded-[2rem] bg-primary/10"><Image src={section.image} alt={section.title} width={1200} height={520} className="h-[280px] w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[360px]" /><div className="absolute bottom-5 left-5 rounded-full bg-background/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em]">{String(index + 1).padStart(2, '0')} / 05</div></div><div className="grid gap-4 sm:grid-cols-3">{(items.length ? items : [{ _id: section.key, itemName: 'Consulta de disponibilidad', itemDescription: 'Solicita información de colores, largos y formatos disponibles.', itemImage: section.image, length: undefined, color: 'Por confirmar' } as HairExtensionsandWigs]).map((product) => <Link key={product._id} to={product._id === section.key ? '/contact' : `/products/${product._id}`} className="group border-t border-primary/15 pt-4"><div className="mb-4 overflow-hidden rounded-xl bg-primary/5"><Image src={product.itemImage || section.image} alt={product.itemName || section.title} width={500} height={360} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/45">{product.length ? product.length + '"' : product.color || 'LUX HAIR'}</p><h4 className="mt-2 font-heading text-lg leading-tight">{product.itemName || section.title}</h4><span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">Ver ficha <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div>
          </motion.article>})}</div>
        </section>

        <section className="bg-primary px-6 py-20 text-primary-foreground md:px-16 md:py-28 lg:px-24"><div className="mx-auto max-w-[120rem]"><div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/55">Decisión de salón</p><h2 className="font-heading text-4xl leading-tight md:text-6xl">Compara antes de recomendar.</h2></div><p className="max-w-xl text-base leading-relaxed text-primary-foreground/70">Una guía rápida para alinear el sistema con el estilo de vida, el volumen y la rutina de mantenimiento de cada cliente.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/20 bg-primary-foreground/15 md:grid-cols-5">{['Sistema','Aplicación','Unión','Uso ideal','Mantenimiento'].map(label => <div key={label} className="bg-primary px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">{label}</div>)}{COMPARISON_DATA.map(row => <React.Fragment key={row.sistema}><div className="bg-background px-5 py-5 font-heading text-lg text-primary">{row.sistema}</div><div className="bg-background px-5 py-5 text-sm text-primary/70">{row.aplicacion}</div><div className="bg-background px-5 py-5 text-sm text-primary/70">{row.union}</div><div className="bg-background px-5 py-5 text-sm text-primary/70">{row.ideal}</div><div className="bg-background px-5 py-5 text-sm text-primary/70">{row.mantenimiento}</div></React.Fragment>)}</div></div></section>

        <section className="mx-auto max-w-[120rem] px-6 py-20 md:px-16 lg:px-24"><div className="flex flex-col gap-8 rounded-[2rem] bg-primary/5 p-8 md:flex-row md:items-center md:justify-between md:p-12"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/50">Filtro profesional</p><h2 className="mt-3 font-heading text-3xl md:text-4xl">Encuentra una referencia concreta.</h2><p className="mt-3 max-w-xl text-primary/65">Filtra por método, largo y color sin perder la vista general del catálogo.</p></div><div className="grid w-full gap-3 md:max-w-2xl md:grid-cols-3"><select aria-label="Método de aplicación" value={selectedApplicationMethod} onChange={(e) => setSelectedApplicationMethod(e.target.value)} className="rounded-full border border-primary/20 bg-background px-4 py-3 text-sm"><option value="all">Todos los métodos</option>{Object.keys(APPLICATION_ALIAS_MAP).map(method => <option key={method} value={method}>{method}</option>)}</select><select aria-label="Largo" value={selectedLength} onChange={(e) => setSelectedLength(e.target.value)} className="rounded-full border border-primary/20 bg-background px-4 py-3 text-sm"><option value="all">Todos los largos</option>{lengths.filter(length => length !== 'all').map(length => <option key={length} value={length}>{length}"</option>)}</select><select aria-label="Color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="rounded-full border border-primary/20 bg-background px-4 py-3 text-sm"><option value="all">Todos los colores</option>{colors.filter(color => color !== 'all').map(color => <option key={color} value={color}>{color}</option>)}</select></div></div></section>

        {isLoading && <div className="px-6 pb-12 text-center text-sm text-primary/55">Cargando referencias...</div>}
      </main>
      <Footer />
    </div>
  );
}
