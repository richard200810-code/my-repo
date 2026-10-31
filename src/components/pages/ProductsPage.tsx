import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { HairExtensionsandWigs } from '@/entities';
import { BaseCrudService, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Asymmetric Magazine Style */}
      <section className="w-full max-w-[120rem] mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Large Image - Left */}
          <motion.div
            className="md:col-span-2 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative overflow-hidden rounded-2xl h-96 md:h-[500px]">
              <Image
                src="https://static.wixstatic.com/media/37e681_c59916f2ea464b55a7f07601f820b544~mv2.png?originWidth=576&originHeight=448"
                alt="Extensiones de cabello premium"
                width={600}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Floating Numbers & Content - Right */}
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">
                Extensiones Premium
              </h1>
              <p className="font-paragraph text-lg text-secondary/80">
                Descubre nuestra colección de extensiones de cabello de alta calidad con múltiples sistemas de aplicación.
              </p>
            </div>

            {/* Floating Numbers */}
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-4 p-4 bg-buttonbackground rounded-lg"
                whileHover={{ y: -4 }}
              >
                <span className="text-4xl font-heading text-primary">50+</span>
                <span className="font-paragraph text-sm">Sistemas de aplicación</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-4 p-4 bg-buttonbackground rounded-lg"
                whileHover={{ y: -4 }}
              >
                <span className="text-4xl font-heading text-primary">100%</span>
                <span className="font-paragraph text-sm">Cabello natural</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* "Cómo elegir" Section */}
      <section className="w-full max-w-[100rem] mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            Cómo elegir
          </h2>
          <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
            Encuentra el sistema perfecto para tus necesidades
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHOICE_OPTIONS.map((option, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-background rounded-xl border border-buttonborder/20 hover:border-buttonborder/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mb-4">
                <Check size={24} />
              </div>
              <h3 className="font-heading text-xl text-primary mb-2">{option.title}</h3>
              <p className="font-paragraph text-sm text-secondary/70">{option.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="w-full max-w-[100rem] mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            Matriz Comparativa
          </h2>
        </motion.div>

        <motion.div
          className="overflow-x-auto rounded-xl border border-buttonborder/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-4 text-left font-heading">Sistema</th>
                <th className="px-6 py-4 text-left font-heading">Aplicación</th>
                <th className="px-6 py-4 text-left font-heading">Punto de unión</th>
                <th className="px-6 py-4 text-left font-heading">Uso ideal</th>
                <th className="px-6 py-4 text-left font-heading">Mantenimiento</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-background/30' : 'bg-white'}>
                  <td className="px-6 py-4 font-heading text-primary">{row.sistema}</td>
                  <td className="px-6 py-4 font-paragraph text-secondary">{row.aplicacion}</td>
                  <td className="px-6 py-4 font-paragraph text-secondary">{row.union}</td>
                  <td className="px-6 py-4 font-paragraph text-secondary">{row.ideal}</td>
                  <td className="px-6 py-4 font-paragraph text-secondary">{row.mantenimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="w-full max-w-[100rem] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-heading text-sm text-primary mb-2 block">Método de aplicación</label>
            <select
              value={selectedApplicationMethod}
              onChange={(e) => setSelectedApplicationMethod(e.target.value)}
              className="w-full px-4 py-2 border border-buttonborder rounded-lg font-paragraph text-sm"
            >
              <option value="all">Todos</option>
              {Object.keys(APPLICATION_ALIAS_MAP).map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-heading text-sm text-primary mb-2 block">Largo (pulgadas)</label>
            <select
              value={selectedLength}
              onChange={(e) => setSelectedLength(e.target.value)}
              className="w-full px-4 py-2 border border-buttonborder rounded-lg font-paragraph text-sm"
            >
              {lengths.map(length => (
                <option key={length} value={length}>
                  {length === 'all' ? 'Todos' : `${length}"`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-heading text-sm text-primary mb-2 block">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-4 py-2 border border-buttonborder rounded-lg font-paragraph text-sm"
            >
              {colors.map(color => (
                <option key={color} value={color}>
                  {color === 'all' ? 'Todos' : color}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Products by Category */}
      <section className="w-full max-w-[100rem] mx-auto px-4 py-16">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <motion.div
            key={category}
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="font-heading text-3xl text-primary mb-4">{category}</h3>
              {CATEGORY_DETAILS[category] && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="font-heading text-primary">Sistema</p>
                    <p className="font-paragraph text-secondary/70">{CATEGORY_DETAILS[category].sistema}</p>
                  </div>
                  <div>
                    <p className="font-heading text-primary">Aplicación</p>
                    <p className="font-paragraph text-secondary/70">{CATEGORY_DETAILS[category].aplicacion}</p>
                  </div>
                  <div>
                    <p className="font-heading text-primary">Punto de unión</p>
                    <p className="font-paragraph text-secondary/70">{CATEGORY_DETAILS[category].union}</p>
                  </div>
                  <div>
                    <p className="font-heading text-primary">Uso ideal</p>
                    <p className="font-paragraph text-secondary/70">{CATEGORY_DETAILS[category].ideal}</p>
                  </div>
                  <div>
                    <p className="font-heading text-primary">Mantenimiento</p>
                    <p className="font-paragraph text-secondary/70">{CATEGORY_DETAILS[category].mantenimiento}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.slice(0, 6).map((product, idx) => (
                <motion.div
                  key={product._id}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Link to={`/products/${product._id}`} className="block">
                    <div className="relative overflow-hidden rounded-2xl mb-4 h-64 md:h-72">
                      {/* Layered rounded image */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <Image
                          src={product.itemImage || 'https://static.wixstatic.com/media/37e681_d251183a168b4faab31a53ff7f91a2d6~mv2.png?originWidth=384&originHeight=256'}
                          alt={product.itemName || 'Producto'}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Floating label overlay */}
                      <motion.div
                        className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <span className="font-heading text-sm">{product.length}"</span>
                      </motion.div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-heading text-lg text-primary line-clamp-2">
                        {product.itemName}
                      </h4>
                      <p className="font-paragraph text-sm text-secondary/70 line-clamp-2">
                        {product.itemDescription}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-heading text-xl text-primary">
                          {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                        </span>
                        <motion.div
                          className="text-primary"
                          whileHover={{ x: 4 }}
                        >
                          <ArrowRight size={20} />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {categoryProducts.length > 6 && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <button className="px-8 py-3 bg-primary text-white rounded-lg font-heading hover:bg-secondary transition-colors">
                  Ver más en {category}
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Load More */}
      {hasNext && (
        <motion.div
          className="w-full max-w-[100rem] mx-auto px-4 py-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-8 py-3 bg-primary text-white rounded-lg font-heading hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Cargando...' : 'Cargar más productos'}
          </button>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
