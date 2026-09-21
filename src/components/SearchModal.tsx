import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { Image } from '@/components/ui/image';

interface SearchResult {
  type: 'product' | 'guide' | 'page';
  id: string;
  title: string;
  description?: string;
  image?: string;
  path: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const guides = [
    { title: 'Guía Hair Weft', path: '/aplicaciones-hair-weft' },
    { title: 'Guía Clip In', path: '/aplicaciones-clip-in' },
    { title: 'Guía Tape In', path: '/aplicaciones-tape-in' },
    { title: 'Guía Keratin', path: '/aplicaciones-keratin' },
    { title: 'Guía Feather', path: '/aplicaciones-feather' },
    { title: 'Guía Double Piece Flat Weft', path: '/aplicaciones/double-piece-flat-weft' },
  ];

  const pages = [
    { title: 'Inicio', path: '/' },
    { title: 'Productos', path: '/products' },
    { title: 'Compra', path: '/stores' },
    { title: 'Contacto', path: '/contact' },
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      setIsSearching(true);
      try {
        const allProducts = await BaseCrudService.getAll<HairExtensionsandWigs>(
          'hairextensions',
          {},
          { limit: 100 }
        );

        const queryLower = query.toLowerCase();
        const productResults: SearchResult[] = allProducts.items
          .filter(
            (p) =>
              p.itemName?.toLowerCase().includes(queryLower) ||
              p.productType?.toLowerCase().includes(queryLower) ||
              p.color?.toLowerCase().includes(queryLower) ||
              p.applicationMethod?.toLowerCase().includes(queryLower)
          )
          .slice(0, 5)
          .map((p) => ({
            type: 'product' as const,
            id: p._id,
            title: p.itemName || 'Producto',
            description: `${p.productType || ''} - ${p.color || ''}`,
            image: p.itemImage,
            path: `/products/${p._id}`,
          }));

        const guideResults: SearchResult[] = guides
          .filter((g) => g.title.toLowerCase().includes(queryLower))
          .map((g) => ({
            type: 'guide' as const,
            id: g.path,
            title: g.title,
            description: 'Guía de aplicación',
            path: g.path,
          }));

        const pageResults: SearchResult[] = pages
          .filter((p) => p.title.toLowerCase().includes(queryLower))
          .map((p) => ({
            type: 'page' as const,
            id: p.path,
            title: p.title,
            path: p.path,
          }));

        setResults([...productResults, ...guideResults, ...pageResults]);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = () => {
    setQuery('');
    onClose();
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
            onClick={onClose}
            className="fixed inset-0 bg-primary/30 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto px-4 z-50"
          >
            <div className="bg-background border border-primary/20 shadow-lg">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-primary/10">
                <Search className="w-5 h-5 text-primary/60" />
                <input
                  type="text"
                  placeholder="Buscar productos, métodos o guías..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent font-paragraph text-base text-primary placeholder-primary/40 outline-none"
                />
                <button
                  onClick={onClose}
                  className="p-1 hover:opacity-70 transition-opacity"
                  aria-label="Cerrar búsqueda"
                >
                  <X className="w-5 h-5 text-primary" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="px-6 py-8 text-center">
                    <p className="font-paragraph text-sm text-primary/60">Buscando...</p>
                  </div>
                ) : results.length === 0 && query.trim() ? (
                  <div className="px-6 py-8 text-center">
                    <p className="font-paragraph text-sm text-primary/60">
                      No se encontraron resultados para "{query}"
                    </p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="font-paragraph text-sm text-primary/60">
                      Comienza a escribir para buscar
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-primary/10">
                    {results.map((result) => (
                      <Link
                        key={`${result.type}-${result.id}`}
                        to={result.path}
                        onClick={handleResultClick}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors"
                      >
                        {result.image && (
                          <div className="w-12 h-12 flex-shrink-0 overflow-hidden">
                            <Image
                              src={result.image}
                              alt={result.title}
                              width={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-paragraph text-sm text-primary font-semibold truncate">
                            {result.title}
                          </h3>
                          {result.description && (
                            <p className="font-paragraph text-xs text-primary/60 truncate">
                              {result.description}
                            </p>
                          )}
                        </div>
                        <span className="text-xs font-paragraph text-primary/40 flex-shrink-0">
                          {result.type === 'product'
                            ? 'Producto'
                            : result.type === 'guide'
                            ? 'Guía'
                            : 'Página'}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
