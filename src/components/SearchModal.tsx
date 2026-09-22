import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { Image } from '@/components/ui/image';
import { fuzzySearchMultiField, calculateSearchScore, expandWithSynonyms, normalizeText, createProductSearchIndex, checkKnownAlias } from '@/lib/fuzzy-search';

interface SearchResult {
  type: 'product' | 'aplicacion' | 'page';
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
    { title: 'Hair Weft', path: '/aplicaciones-hair-weft', keywords: 'hair weft weft wefts wft sew in sew-in trama' },
    { title: 'Clip In', path: '/aplicaciones-clip-in', keywords: 'clip in clip clip-in clipin' },
    { title: 'Tape In', path: '/aplicaciones-tape-in', keywords: 'tape in tape tape-in cinta' },
    { title: 'Keratin', path: '/aplicaciones-keratin', keywords: 'keratin k-tip ktip k tip queratina' },
    { title: 'Feather', path: '/aplicaciones-feather', keywords: 'feather feathering pluma' },
    { title: 'Double Piece Flat Weft', path: '/aplicaciones/double-piece-flat-weft', keywords: 'double piece flat weft weft wefts wft sew in sew-in trama' },
  ];

  const pages = [
    { title: 'Inicio', path: '/', keywords: 'inicio home' },
    { title: 'Productos', path: '/products', keywords: 'productos products' },
    { title: 'Compra', path: '/stores', keywords: 'compra stores tiendas' },
    { title: 'Contacto', path: '/contact', keywords: 'contacto contact' },
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      setIsSearching(true);
      try {
        // Check if query is a known alias that locks to a category
        const lockedCategory = checkKnownAlias(query);

        const allProducts = await BaseCrudService.getAll<HairExtensionsandWigs>(
          'hairextensions',
          {},
          { limit: 100 }
        );

        // Fuzzy search products with scoring against normalized search index
        // If lockedCategory is set, only products from that category will score > 0
        // CRITICAL: Only show products with score >= 60 (strict threshold enforcement)
        // Never use default catalog as fallback - if no results meet threshold, show "No results found"
        const productResults: SearchResult[] = allProducts.items
          .map(p => {
            const searchIndex = createProductSearchIndex(p);
            const score = calculateSearchScore(query, searchIndex, lockedCategory || undefined);
            return { product: p, searchIndex, score };
          })
          .filter(({ score }) => score >= 60)  // STRICT: Only items with score >= 60
          .sort((a, b) => b.score - a.score)
          .slice(0, 6)
          .map(({ product: p }) => ({
            type: 'product' as const,
            id: p._id,
            title: p.itemName || 'Producto',
            description: `${p.productType || ''} - ${p.color || ''}`,
            image: p.itemImage,
            path: `/products/${p._id}`,
          }));

        // Fuzzy search guides with scoring against normalized search index
        // If lockedCategory is set, only guides matching that category will score > 0
        const guideResults: SearchResult[] = guides
          .map(g => ({
            guide: g,
            searchIndex: normalizeText(`${g.title} ${g.keywords}`),
            score: calculateSearchScore(query, normalizeText(`${g.title} ${g.keywords}`), lockedCategory || undefined)
          }))
          .filter(({ score }) => score >= 60)  // STRICT: Only items with score >= 60
          .sort((a, b) => b.score - a.score)
          .map(({ guide: g }) => ({
            type: 'aplicacion' as const,
            id: g.path,
            title: g.title,
            description: 'Guía de aplicación',
            path: g.path,
          }));

        // Fuzzy search pages with scoring against normalized search index
        // Pages are not category-specific, so they only show if no locked category
        const pageResults: SearchResult[] = !lockedCategory ? pages
          .map(p => ({
            page: p,
            searchIndex: normalizeText(`${p.title} ${p.keywords}`),
            score: calculateSearchScore(query, normalizeText(`${p.title} ${p.keywords}`))
          }))
          .filter(({ score }) => score >= 60)  // STRICT: Only items with score >= 60
          .sort((a, b) => b.score - a.score)
          .map(({ page: p }) => ({
            type: 'page' as const,
            id: p.path,
            title: p.title,
            path: p.path,
          })) : [];

        // Combine results - max 6 total
        setResults([...productResults, ...guideResults, ...pageResults].slice(0, 6));
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
                            : result.type === 'aplicacion'
                            ? 'Aplicación'
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
