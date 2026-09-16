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

export default function StoresPage() {
  const [products, setProducts] = useState<HairExtensionsandWigs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  const LIMIT = 12;

  useEffect(() => {
    loadProducts();
  }, [skip]);

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

  const loadMore = () => {
    setSkip(prev => prev + LIMIT);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Hero Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-6xl md:text-7xl text-primary mb-6">
              Colección Premium
            </h1>
            <p className="font-paragraph text-lg text-primary/70 max-w-3xl mx-auto mb-8">
              Descubre nuestra exclusiva colección de extensiones de cabello de alta calidad. Desde tape invisible hasta I-tip, encontrarás la solución perfecta para tu cabello.
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="min-h-[600px]">
          {isLoading && skip === 0 ? null : (
            <>
              {products.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-paragraph text-lg text-primary/60">
                    No hay productos disponibles en este momento
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                >
                  {products.map((product, index) => (
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
      </main>

      <Footer />
    </div>
  );
}
