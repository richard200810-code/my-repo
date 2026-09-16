import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [products, setProducts] = useState<HairExtensionsandWigs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    applicationMethod: '',
    texture: '',
  });
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<HairExtensionsandWigs>('hairextensions');
      setProducts(result.items || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filters.type && product.productType !== filters.type) return false;
    if (filters.applicationMethod && product.applicationMethod !== filters.applicationMethod) return false;
    if (filters.texture && product.texture !== filters.texture) return false;
    return true;
  });

  const uniqueTypes = Array.from(new Set(products.map(p => p.productType).filter(Boolean)));
  const uniqueMethods = Array.from(new Set(products.map(p => p.applicationMethod).filter(Boolean)));
  const uniqueTextures = Array.from(new Set(products.map(p => p.texture).filter(Boolean)));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">Our Collection</h1>
        <p className="font-paragraph text-lg text-secondary/70 max-w-2xl">
          Explore our premium selection of hair extensions, carefully curated for quality and style
        </p>
      </section>

      {/* Filters and Products */}
      <section className="w-full max-w-[100rem] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-background/20 rounded-lg p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="font-heading text-lg text-primary mb-3">Hair Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.type === ''}
                      onChange={() => setFilters({ ...filters, type: '' })}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-secondary">All Types</span>
                  </label>
                  {uniqueTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.type === type}
                        onChange={() => setFilters({ ...filters, type: type || '' })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-secondary">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-background pt-6">
                <h3 className="font-heading text-lg text-primary mb-3">Application</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.applicationMethod === ''}
                      onChange={() => setFilters({ ...filters, applicationMethod: '' })}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-secondary">All Methods</span>
                  </label>
                  {uniqueMethods.map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.applicationMethod === method}
                        onChange={() => setFilters({ ...filters, applicationMethod: method || '' })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-secondary">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-background pt-6">
                <h3 className="font-heading text-lg text-primary mb-3">Texture</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.texture === ''}
                      onChange={() => setFilters({ ...filters, texture: '' })}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-secondary">All Textures</span>
                  </label>
                  {uniqueTextures.map((texture) => (
                    <label key={texture} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.texture === texture}
                        onChange={() => setFilters({ ...filters, texture: texture || '' })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-secondary">{texture}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group"
                  >
                    <Link to={`/products/${product._id}`} className="block mb-4">
                      <div className="bg-background rounded-lg overflow-hidden aspect-square mb-4">
                        <Image
                          src={product.itemImage || 'https://static.wixstatic.com/media/37e681_0db7ce50d12949b7917c01750c78880c~mv2.png?originWidth=384&originHeight=384'}
                          alt={product.itemName || 'Product'}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    <div className="space-y-3">
                      <Link to={`/products/${product._id}`} className="block">
                        <h3 className="font-heading text-xl text-primary hover:text-secondary transition-colors">
                          {product.itemName}
                        </h3>
                      </Link>

                      <div className="flex flex-wrap gap-2">
                        {product.productType && (
                          <span className="text-xs font-paragraph bg-background/50 text-secondary px-2 py-1 rounded">
                            {product.productType}
                          </span>
                        )}
                        {product.texture && (
                          <span className="text-xs font-paragraph bg-background/50 text-secondary px-2 py-1 rounded">
                            {product.texture}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-heading text-2xl text-primary">
                          {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                        </span>
                        <button
                          onClick={() => actions.addToCart({ collectionId: 'hairextensions', itemId: product._id })}
                          disabled={addingItemId === product._id}
                          className="px-4 py-2 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
                        >
                          {addingItemId === product._id ? 'Adding...' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-secondary/70">
                  No products found matching your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
