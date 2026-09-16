import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { Stores } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StoresPage() {
  const [stores, setStores] = useState<Stores[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Stores>('stores');
      setStores(result.items || []);
    } catch (error) {
      console.error('Failed to load stores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">Our Stores</h1>
        <p className="font-paragraph text-lg text-secondary/70 max-w-2xl">
          Visit our authorized retailers to experience our premium hair extensions in person
        </p>
      </section>

      {/* Stores Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 pb-20">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : stores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store, idx) => (
              <motion.div
                key={store._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Link to={`/stores/${store._id}`} className="group block h-full">
                  <div className="bg-white border border-background rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    {/* Store Image */}
                    <div className="bg-background rounded-t-lg overflow-hidden aspect-video">
                      <Image
                        src={store.storeImage || 'https://static.wixstatic.com/media/37e681_4da36709d81f4b828dda9dd32b6691b0~mv2.png?originWidth=384&originHeight=256'}
                        alt={store.storeName || 'Store'}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Store Info */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">
                        {store.storeName}
                      </h3>
                      <p className="font-paragraph text-secondary/70 text-sm mb-4 flex-grow">
                        {store.description}
                      </p>

                      {/* Contact Info */}
                      <div className="space-y-2 border-t border-background pt-4">
                        {store.ownerContactName && (
                          <p className="font-paragraph text-sm text-secondary">
                            <span className="text-secondary/60">Manager:</span> {store.ownerContactName}
                          </p>
                        )}
                        {store.ownerContactEmail && (
                          <p className="font-paragraph text-sm text-secondary">
                            <span className="text-secondary/60">Email:</span> {store.ownerContactEmail}
                          </p>
                        )}
                      </div>

                      {/* View Button */}
                      <button className="mt-4 w-full px-4 py-3 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors">
                        View Store
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-secondary/70 mb-8">
              No stores available at this time
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              Shop Online
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
