import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Mail, User } from 'lucide-react';

interface Store {
  _id: string;
  storeName?: string;
  description?: string;
  storeImage?: string;
  ownerContactName?: string;
  ownerContactEmail?: string;
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Store>('stores', {});
      setStores(result.items);
    } catch (error) {
      console.error('Failed to load stores:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="font-heading text-5xl md:text-7xl text-primary mb-6">De Compras</h1>
          <p className="font-paragraph text-lg text-primary/70 max-w-2xl mx-auto">Seleciones</p>
        </div>

        {/* Stores Grid */}
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : stores.length === 0 ? (
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {stores.map((store, index) => (
                <motion.div
                  key={store._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <Link to={`/stores/${store._id}`} className="block h-full">
                    <div className="space-y-4 h-full flex flex-col">
                      {/* Store Image */}
                      <div className="aspect-[4/3] overflow-hidden mb-4">
                        <Image
                          src={store.storeImage || 'https://static.wixstatic.com/media/37e681_222d12ae19904ef780cfab596ce9a09d~mv2.png?originWidth=384&originHeight=256'}
                          alt={store.storeName || 'Store'}
                          width={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Store Info */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-heading text-2xl text-primary mb-2 group-hover:opacity-70 transition-opacity">
                          {store.storeName}
                        </h3>
                        
                        <p className="font-paragraph text-base text-primary/70 mb-4 flex-1">
                          {store.description}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm font-paragraph text-primary/60">
                          {store.ownerContactName && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{store.ownerContactName}</span>
                            </div>
                          )}
                          {store.ownerContactEmail && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span className="truncate">{store.ownerContactEmail}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-4 mt-auto">
                        <button className="w-full px-6 py-3 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
