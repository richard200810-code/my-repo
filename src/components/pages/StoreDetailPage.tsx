import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

interface Store {
  _id: string;
  storeName?: string;
  description?: string;
  storeImage?: string;
  ownerContactName?: string;
  ownerContactEmail?: string;
}

export default function StoreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<HairExtensionsandWigs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  const LIMIT = 12;

  useEffect(() => {
    if (id) {
      loadStoreAndProducts();
    }
  }, [id, skip]);

  const loadStoreAndProducts = async () => {
    try {
      setIsLoading(true);
      
      // Load store details
      const storeData = await BaseCrudService.getById<Store>('stores', id!);
      setStore(storeData);

      // Load products for this store
      const result = await BaseCrudService.getAll<HairExtensionsandWigs>(
        'hairextensions',
        {},
        { limit: LIMIT, skip }
      );

      // Filter products by store
      const storeProducts = result.items.filter(p => p.storeId === id);
      
      if (skip === 0) {
        setProducts(storeProducts);
      } else {
        setProducts(prev => [...prev, ...storeProducts]);
      }

      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Failed to load store details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setSkip(prev => prev + LIMIT);
  };

  if (isLoading && skip === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-32">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-primary/60">Store not found</p>
            <Link to="/stores" className="inline-block mt-4 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              Back to Stores
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Back Button */}
        <Link to="/stores" className="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-paragraph">Back to Stores</span>
        </Link>

        {/* Store Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Store Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={store.storeImage || 'https://static.wixstatic.com/media/37e681_64706600006a473882f327bef74f2e11~mv2.png?originWidth=576&originHeight=448'}
              alt={store.storeName || 'Store'}
              width={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Store Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">
                {store.storeName}
              </h1>
              <p className="font-paragraph text-lg text-primary/70 leading-relaxed">
                {store.description}
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pt-6 border-t border-primary/10">
              {store.ownerContactName && (
                <div>
                  <p className="font-paragraph text-sm text-primary/60">Owner</p>
                  <p className="font-paragraph text-lg text-primary">{store.ownerContactName}</p>
                </div>
              )}
              {store.ownerContactEmail && (
                <div>
                  <p className="font-paragraph text-sm text-primary/60">Contact Email</p>
                  <a href={`mailto:${store.ownerContactEmail}`} className="font-paragraph text-lg text-primary hover:opacity-70 transition-opacity">
                    {store.ownerContactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12">
            Featured Products
          </h2>

          <div className="min-h-[600px]">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-primary/60">
                  No products available from this store
                </p>
              </div>
            ) : (
              <>
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
                          {addingItemId === product._id ? 'Adding...' : 'Add to Cart'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

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
        </div>
      </main>

      <Footer />
    </div>
  );
}
