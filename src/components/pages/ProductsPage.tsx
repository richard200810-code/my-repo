import ApplicationMegaMenu from '@/components/ApplicationMegaMenu';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { HairExtensionsandWigs } from '@/entities';
import { BaseCrudService, useCurrency } from '@/integrations';
import { motion } from 'framer-motion';
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
    ['Extensiones Genius Weft','Genius Weft','https://thehairshop.com/cdn/shop/files/Main_Image_Smart_Weft_02_300x300.png?v=1733175586'],
    ['Extensiones Hand Tied Weft','Hand Tied Weft','https://thehairshop.com/cdn/shop/products/one-step-weft_hair_extensions_the_hair_shop_st_1__52648.1604697498.1280.1280_300x300.jpg?v=1678492544'],
    ['Extensiones Flat Weft','Flat Weft','https://thehairshop.com/cdn/shop/products/weft_808_hair_extensions_the_hair_shop_5__57993.1542309127.1280.1280_300x300.jpg?v=1678746590'],
    ['Extensiones Machine Weft','Machine Weft','https://thehairshop.com/cdn/shop/files/Main_Image_Smart_Weft_02_300x300.png?v=1733175586'],
    ['Extensiones Volume Weft','Volume Weft','https://thehairshop.com/cdn/shop/files/Features_Smart_Weft_300x300.jpg?v=1733175469'],
    ['Extensiones Clip in','Clip in','https://thehairshop.com/cdn/shop/products/26in_clipins3-NEW-2__29197_300x300.jpg?v=1680912989'],
    ['Extensiones Tape in','Tape in','https://thehairshop.com/cdn/shop/products/smart_tab_tape_in_hair_extensions_the_hair_shop_edit__38488.1556046196.1280.1280_300x300.jpg?v=1678666872'],
    ['Extensiones Seamless Tape in','Seamless Tape in','https://thehairshop.com/cdn/shop/products/skinweft_tape_in_hair_extensions_the_hair_shop_1__44145.1556322582.1280.1280_300x300.jpg?v=1678488297'],
    ['Extensiones Invisible Tape in','Invisible Tape in','https://thehairshop.com/cdn/shop/products/skinweft_tape_in_hair_extensions_the_hair_shop_1__44145.1556322582.1280.1280_300x300.jpg?v=1678488297'],
    ['Extensiones I-Tip','I-Tip hair extensions','https://thehairshop.com/cdn/shop/products/i_tip_808_hair_extensions_the_hair_shop_st_1__11985.1546542073.1280.1280_300x300.jpg?v=1710455969'],
    ['Extensiones K-Tip','K Tip hair extensions','https://thehairshop.com/cdn/shop/products/keratip_808_hair_extensions_the_hair_shop_st_1__01293.1641514967.1280.1280_300x300.jpg?v=1710456002'],
    ['Extensiones U-Tip','U-Tip hair extensions','https://thehairshop.com/cdn/shop/products/keratip_808_exclusive_hair_extensions_the_hair_shop_st_1.jpg__08204.1541034445.1280.1280_300x300.jpg?v=1710455968'],
    ['Extensiones Lace Clip in','Lace Clip in','https://thehairshop.com/cdn/shop/products/26in_clipins3-NEW-2__29197_300x300.jpg?v=1680912989'],
    ['Extensiones PU Clip in','PU Clip in','https://thehairshop.com/cdn/shop/files/skinny_clip_in_3_piece_hair_extensions_the_hair_shop_300x300.jpg?v=1760554406'],
    ['Extensiones Mini Tape in','Mini Tape in','https://thehairshop.com/cdn/shop/files/IMG_7509_300x300.jpg?v=1710201861'],
    ['Extensiones Nano-Tip','Nano-Tip hair extensions','https://thehairshop.com/cdn/shop/files/microtip_300x300.jpg?v=1737574105'],
    ['Extensiones V-Tip','V-Tip hair extensions','https://thehairshop.com/cdn/shop/products/keratip_808_hair_extensions_the_hair_shop_st_1__01293.1641514967.1280.1280_300x300.jpg?v=1710456002'],
    ['Extensiones Y-Tip','Y-Tip hair extensions','https://thehairshop.com/cdn/shop/products/keratip_808_hair_extensions_the_hair_shop_st_1__01293.1641514967.1280.1280_300x300.jpg?v=1710456002'],
    ['Extensiones Micro Loop','Micro Loop hair extension','https://thehairshop.com/cdn/shop/files/microtip_300x300.jpg?v=1737574105'],
    ['Extensiones Feather Weft','Feather hair weft','https://thehairshop.com/cdn/shop/products/one-step-weft_hair_extensions_the_hair_shop_st_1__52648.1604697498.1280.1280_300x300.jpg?v=1678492544'],
    ['Extensiones H6 Feather','H6 Feather hair extensions','https://thehairshop.com/cdn/shop/products/one-step-weft_hair_extensions_the_hair_shop_st_1__52648.1604697498.1280.1280_300x300.jpg?v=1678492544'],
    ['Color Ombre','Ombre','https://thehairshop.com/cdn/shop/products/1_BLACK_Color_swatches_2019final_2e66a2a4-630d-452f-8fd7-b4b7b2c643e6_300x300.jpg?v=1678755397'],
    ['Color Piano','Piano Color','https://thehairshop.com/cdn/shop/products/1_BLACK_Color_swatches_2019final_2e66a2a4-630d-452f-8fd7-b4b7b2c643e6_300x300.jpg?v=1678755397'],
    ['Color Balayage','Balayage','https://thehairshop.com/cdn/shop/products/1_BLACK_Color_swatches_2019final_2e66a2a4-630d-452f-8fd7-b4b7b2c643e6_300x300.jpg?v=1678755397'],
  ].map(([title, application, image]) => ({ title, application, image, href: '/products?application=' + encodeURIComponent(application) }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-primary mb-6">
            Tipos de producto
          </h1>
          <p className="font-paragraph text-lg text-primary max-w-2xl mx-auto">
            Explora nuestras categorías profesionales de extensiones de cabello y pelucas
          </p>
        </div>

        {/* Horizontal Filters Row - Desktop Only */}
        <div className="hidden">
          {/* Application Filter */}
          <div className="space-y-3 px-5 pb-5 pt-4">
            <h3 className="font-paragraph text-sm text-primary font-semibold">
              Aplicación
            </h3>
            <ApplicationMegaMenu
              selectedApplication={selectedApplicationMethod}
              onSelect={setSelectedApplicationMethod}
            />
          </div>

          {/* Length Filter */}
          <div className="space-y-3 px-5 pb-5 pt-4">
            <h3 className="font-paragraph text-sm text-primary font-semibold">
              Longitud
            </h3>
            <select
              value={selectedLength}
              onChange={(e) => setSelectedLength(e.target.value)}
              className="w-full px-4 py-2 border border-primary/20 bg-white text-primary font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {lengths.map(length => (
                <option key={length} value={length}>
                  {length === 'all' ? 'Todas las Longitudes' : `${length}"`}
                </option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div className="space-y-3 px-5 pb-5 pt-4">
            <h3 className="font-paragraph text-sm text-primary font-semibold">
              Color
            </h3>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-4 py-2 border border-primary/20 bg-white text-primary font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {colors.map(color => (
                <option key={color} value={color}>
                  {color === 'all' ? 'Todos los Colores' : color}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Filters - Accordion Style */}
        <div className="hidden">
          {/* Application Filter */}
          <div className="space-y-3 px-5 pb-5 pt-4">
            <h3 className="font-paragraph text-sm text-primary font-semibold">
              Aplicación
            </h3>
            <ApplicationMegaMenu
              selectedApplication={selectedApplicationMethod}
              onSelect={setSelectedApplicationMethod}
            />
          </div>

          {/* Length Filter */}
          <div className="space-y-3 px-5 pb-5 pt-4">
            <h3 className="font-paragraph text-sm text-primary font-semibold">
              Longitud
            </h3>
            <select
              value={selectedLength}
              onChange={(e) => setSelectedLength(e.target.value)}
              className="w-full px-4 py-2 border border-primary/20 bg-white text-primary font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {lengths.map(length => (
                <option key={length} value={length}>
                  {length === 'all' ? 'Todas las Longitudes' : `${length}"`}
                </option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div className="space-y-3 px-5 pb-5 pt-4">
            <h3 className="font-paragraph text-sm text-primary font-semibold">
              Color
            </h3>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-4 py-2 border border-primary/20 bg-white text-primary font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {colors.map(color => (
                <option key={color} value={color}>
                  {color === 'all' ? 'Todos los Colores' : color}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={() => {
              setSelectedApplicationMethod('all');
              setSelectedLength('all');
              setSelectedColor('all');
            }}
            className="w-full px-4 py-2 border border-buttonborder bg-buttonbackground text-primary font-paragraph text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Limpiar Filtros
          </button>
        </div>

        {/* Products Section */}
        <div className="w-full">
          {/* Products Grid */}
          <div className="min-h-[600px]">
            {isLoading && skip === 0 ? null : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="font-paragraph text-lg text-primary/60">
                      No se encontraron productos que coincidan con tus filtros
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                  >
                    {CATEGORY_CARDS.map((category, index) => (
                      <motion.div
                        key={category.application}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group overflow-hidden rounded-2xl border border-primary/10 bg-white/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        {/* Product Image */}
                        <Link to={category.href} className="block">
                          <div className="aspect-[4/5] overflow-hidden rounded-t-2xl bg-primary/5">
                            <Image
                              src={category.image}
                              alt={category.title}
                              width={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="space-y-3 px-5 pb-5 pt-4">
                          <Link to={category.href}>
                            <h3 className="font-heading text-xl text-primary hover:opacity-70 transition-opacity">
                              {category.title}
                            </h3>
                          </Link>

                          <Link
                            to={category.href}
                            className="inline-flex w-full items-center justify-center rounded-xl border border-primary/20 bg-buttonbackground/70 px-6 py-3 text-primary font-paragraph text-base transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                          >
                            Ver categoría
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Load More Button */}
                {false && (
                  <div className="text-center">
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="px-10 py-4 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? 'Cargando...' : 'Cargar Más'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
