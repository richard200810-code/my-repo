import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { Stores, HairExtensionsandWigs } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { ChevronLeft, MapPin, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StoreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Stores | null>(null);
  const [storeProducts, setStoreProducts] = useState<HairExtensionsandWigs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadStoreData();
  }, [id]);

  const loadStoreData = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const storeData = await BaseCrudService.getById<Stores>('stores', id);
      setStore(storeData);

      // Load products for this store
      const productsResult = await BaseCrudService.getAll<HairExtensionsandWigs>('hairextensions');
      const filtered = (productsResult.items || []).filter(p => p.storeId === id);
      setStoreProducts(filtered);
    } catch (error) {
      console.error('Failed to load store data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-40">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl text-primary mb-4">Store Not Found</h1>
          <p className="font-paragraph text-secondary/70 mb-8">
            The store you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/stores"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors"
          >
            Back to Stores
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="w-full max-w-[100rem] mx-auto px-6 py-4">
        <Link
          to="/stores"
          className="flex items-center gap-2 text-secondary/70 hover:text-primary transition-colors font-paragraph"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Stores
        </Link>
      </div>

      {/* Store Header */}
      <section className="w-full max-w-[100rem] mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Store Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-lg overflow-hidden aspect-square"
          >
            <Image
              src={store.storeImage || 'https://static.wixstatic.com/media/37e681_ca5e1d471cbb4326ab94a1950a60b1a8~mv2.png?originWidth=576&originHeight=576'}
              alt={store.storeName || 'Store'}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Store Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-heading text-5xl text-primary mb-4">{store.storeName}</h1>
              <p className="font-paragraph text-xl text-secondary/70">{store.description}</p>
            </div>

            {/* Contact Information */}
            <div className="border-t border-b border-background py-6 space-y-4">
              {store.ownerContactName && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Store Manager</p>
                    <p className="font-paragraph text-lg text-primary">{store.ownerContactName}</p>
                  </div>
                </div>
              )}
              {store.ownerContactEmail && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Email</p>
                    <a
                      href={`mailto:${store.ownerContactEmail}`}
                      className="font-paragraph text-lg text-primary hover:text-secondary transition-colors"
                    >
                      {store.ownerContactEmail}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              Shop Our Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Store Products */}
      {storeProducts.length > 0 && (
        <section className="w-full max-w-[100rem] mx-auto px-6 pb-20">
          <h2 className="font-heading text-4xl text-primary mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeProducts.map((product, idx) => (
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
        </section>
      )}

      <Footer />
    </div>
  );
}
