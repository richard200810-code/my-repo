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
import { Filter } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<HairExtensionsandWigs[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<HairExtensionsandWigs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  const LIMIT = 12;

  useEffect(() => {
    loadProducts();
  }, [skip]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedType, selectedColor, selectedStore]);

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

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.productType === selectedType);
    }

    if (selectedColor !== 'all') {
      filtered = filtered.filter(p => p.color === selectedColor);
    }

    if (selectedStore !== 'all') {
      filtered = filtered.filter(p => p.storeId === selectedStore);
    }

    setFilteredProducts(filtered);
  };

  const loadMore = () => {
    setSkip(prev => prev + LIMIT);
  };

  // Extract unique values for filters
  const productTypes = ['all', ...Array.from(new Set(products.map(p => p.productType).filter(Boolean)))];
  const colors = ['all', ...Array.from(new Set(products.map(p => p.color).filter(Boolean)))];
  const stores = ['all', ...Array.from(new Set(products.map(p => p.storeId).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-primary mb-6">
            Our Collection
          </h1>
          <p className="font-paragraph text-lg text-primary max-w-2xl mx-auto">
            Browse our premium selection of hair extensions and wigs
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300 mb-6"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-primary/10"
            >
              {/* Product Type Filter */}
              <div className="space-y-3">
                <label className="font-paragraph text-base text-primary font-semibold">
                  Product Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary"
                >
                  {productTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Filter */}
              <div className="space-y-3">
                <label className="font-paragraph text-base text-primary font-semibold">
                  Color
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary"
                >
                  {colors.map(color => (
                    <option key={color} value={color}>
                      {color === 'all' ? 'All Colors' : color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Store Filter */}
              <div className="space-y-3">
                <label className="font-paragraph text-base text-primary font-semibold">
                  Store
                </label>
                <select
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary"
                >
                  {stores.map(store => (
                    <option key={store} value={store}>
                      {store === 'all' ? 'All Stores' : store}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Products Grid */}
        <div className="min-h-[600px]">
          {isLoading && skip === 0 ? null : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-paragraph text-lg text-primary/60">
                    No products found matching your filters
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
                          {addingItemId === product._id ? 'Adding...' : 'Add to Cart'}
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
                    {isLoading ? 'Loading...' : 'Load More'}
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
