import { useState, useEffect } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs, Stores } from '@/entities';

interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'guide' | 'store';
  path: string;
  description?: string;
}

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allProducts, setAllProducts] = useState<HairExtensionsandWigs[]>([]);
  const [allStores, setAllStores] = useState<Stores[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Guide pages data
  const guides = [
    { id: 'hair-weft', title: 'Hair Weft', path: '/aplicaciones-hair-weft', type: 'guide' as const },
    { id: 'clip-in', title: 'Clip In', path: '/aplicaciones-clip-in', type: 'guide' as const },
    { id: 'tape-in', title: 'Tape In', path: '/aplicaciones-tape-in', type: 'guide' as const },
    { id: 'keratin', title: 'Keratin', path: '/aplicaciones-keratin', type: 'guide' as const },
    { id: 'feather', title: 'Feather', path: '/aplicaciones-feather', type: 'guide' as const },
    { id: 'double-piece', title: 'Double Piece Flat Weft', path: '/aplicaciones/double-piece-flat-weft', type: 'guide' as const },
  ];

  // Load all products and stores on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsResult = await BaseCrudService.getAll<HairExtensionsandWigs>('hairextensions', {}, { limit: 100 });
        setAllProducts(productsResult.items);

        const storesResult = await BaseCrudService.getAll<Stores>('stores', {}, { limit: 100 });
        setAllStores(storesResult.items);
      } catch (error) {
        console.error('Error loading search data:', error);
      }
    };

    loadData();
  }, []);

  // Search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const searchQuery = query.toLowerCase();

    // Search in products
    const productResults = allProducts
      .filter(product =>
        product.itemName?.toLowerCase().includes(searchQuery) ||
        product.itemDescription?.toLowerCase().includes(searchQuery) ||
        product.applicationMethod?.toLowerCase().includes(searchQuery) ||
        product.productType?.toLowerCase().includes(searchQuery)
      )
      .map(product => ({
        id: product._id,
        title: product.itemName || 'Producto sin nombre',
        type: 'product' as const,
        path: `/products/${product._id}`,
        description: product.itemDescription,
      }));

    // Search in guides
    const guideResults = guides.filter(guide =>
      guide.title.toLowerCase().includes(searchQuery)
    ).map(guide => ({
      id: guide.id,
      title: guide.title,
      type: 'guide' as const,
      path: guide.path,
    }));

    // Search in stores
    const storeResults = allStores
      .filter(store =>
        store.storeName?.toLowerCase().includes(searchQuery) ||
        store.description?.toLowerCase().includes(searchQuery)
      )
      .map(store => ({
        id: store._id,
        title: store.storeName || 'Tienda sin nombre',
        type: 'store' as const,
        path: `/stores/${store._id}`,
        description: store.description,
      }));

    // Combine and limit results
    const combined = [...productResults, ...guideResults, ...storeResults].slice(0, 10);
    setResults(combined);
    setIsLoading(false);
  }, [query, allProducts, allStores]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-primary/50 z-50"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bg-background shadow-lg z-50 max-w-[100rem] mx-auto w-full"
          >
            <div className="px-8 md:px-16 lg:px-24 py-6">
              {/* Search Header */}
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                  <input
                    type="text"
                    placeholder="Buscar productos, guías, tiendas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 border-2 border-primary/20 bg-white text-primary font-paragraph placeholder:text-primary/40 focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:opacity-70 transition-opacity"
                  aria-label="Cerrar búsqueda"
                >
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>

              {/* Search Results */}
              {query.trim() && (
                <div className="mt-6 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <p className="font-paragraph text-base text-primary/60 text-center py-4">
                      Buscando...
                    </p>
                  ) : results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          to={result.path}
                          onClick={handleResultClick}
                          className="block p-4 border border-primary/10 hover:bg-primary/5 transition-colors no-underline"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-paragraph text-base text-primary font-semibold">
                                {result.title}
                              </h3>
                              {result.description && (
                                <p className="font-paragraph text-sm text-primary/60 mt-1 line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                            </div>
                            <span className="ml-4 px-2 py-1 bg-primary/10 text-primary text-xs font-paragraph rounded">
                              {result.type === 'product' ? 'Producto' : result.type === 'guide' ? 'Guía' : 'Tienda'}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="font-paragraph text-base text-primary/60 text-center py-4">
                      No se encontraron resultados para "{query}"
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
