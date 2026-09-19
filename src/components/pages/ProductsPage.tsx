import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [products, setProducts] = useState<HairExtensionsandWigs[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<HairExtensionsandWigs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [selectedApplicationMethod, setSelectedApplicationMethod] = useState<string>('all');
  const [selectedLength, setSelectedLength] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  const LIMIT = 12;

  // Predefined application methods (Aplicación)
  const PREDEFINED_APPLICATIONS = [
    'TAPE INVISIBLE',
    'TAPE NORMAL',
    'K-TIP',
    'I-TIP',
    'FUSION',
    'CLIP-IN',
    'SEW-IN'
  ];

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

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedApplicationMethod !== 'all') {
      filtered = filtered.filter(p => p.applicationMethod === selectedApplicationMethod);
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
  const applicationMethods = ['all', ...PREDEFINED_APPLICATIONS];
  const lengths = ['all', ...PREDEFINED_LENGTHS];
  const colors = ['all', ...Array.from(new Set(products.map(p => p.color).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-primary mb-6">
            Nuestra Colección
          </h1>
          <p className="font-paragraph text-lg text-primary max-w-2xl mx-auto">
            Explora nuestra selección premium de extensiones de cabello y pelucas
          </p>
        </div>

        {/* Main Layout: Sidebar + Products */}
        <div className="flex gap-8">
          {/* Vertical Sidebar Filter */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8 p-6 border border-primary/10 bg-background">
              <h2 className="font-heading text-2xl text-primary">Filtros</h2>

              {/* Application Method Filter (Aplicación) */}
              <div className="space-y-4">
                <h3 className="font-paragraph text-base text-primary font-semibold">
                  Aplicación
                </h3>
                <select
                  value={selectedApplicationMethod}
                  onChange={(e) => setSelectedApplicationMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-primary/20 bg-white text-primary font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {applicationMethods.map(method => (
                    <option key={method} value={method}>
                      {method === 'all' ? 'Todas las Aplicaciones' : method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Length Filter */}
              <div className="space-y-4">
                <h3 className="font-paragraph text-base text-primary font-semibold">
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
              <div className="space-y-4">
                <h3 className="font-paragraph text-base text-primary font-semibold">
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
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-h-[600px]">
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
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group space-y-4"
                      >
                        {/* Product Image */}
                        <Link to={`/products/${product._id}`} className="block">
                          <div className="aspect-[3/4] overflow-hidden mb-4">
                            <Image
                              src={product.itemImage || 'https://static.wixstatic.com/media/37e681_9e787a2481d1449eac415e51fe35f9ff~mv2.png?originWidth=384&originHeight=512'}
                              alt={product.itemName || 'Product'}
                              width={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="space-y-2">
                          <Link to={`/products/${product._id}`}>
                            <h3 className="font-heading text-xl text-primary hover:opacity-70 transition-opacity">
                              {product.itemName}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center gap-3 text-sm font-paragraph text-primary/70">
                            {product.productType && <span>{product.productType}</span>}
                            {product.color && (
                              <>
                                <span>•</span>
                                <span>{product.color}</span>
                              </>
                            )}
                            {product.length && (
                              <>
                                <span>•</span>
                                <span>{product.length}"</span>
                              </>
                            )}
                          </div>

                          <p className="font-paragraph text-lg text-primary font-semibold">
                            {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </p>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => actions.addToCart({
                              collectionId: 'hairextensions',
                              itemId: product._id,
                              quantity: 1
                            })}
                            disabled={addingItemId === product._id}
                            className="w-full px-6 py-3 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                          >
                            {addingItemId === product._id ? 'Agregando...' : 'Agregar al Carrito'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Load More Button */}
                {hasNext && (
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
