import { useState, useEffect } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { calculateSearchScore, normalizeText, createProductSearchIndex, checkKnownAlias } from '@/lib/fuzzy-search';

interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'aplicacion' | 'page';
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
  const [isLoading, setIsLoading] = useState(false);

  // Application pages data
  const aplicaciones = [
    { id: 'hair-weft', title: 'Hair Weft', path: '/aplicaciones-hair-weft', type: 'aplicacion' as const, keywords: 'weft wefts wft sew in sew-in trama' },
    { id: 'clip-in', title: 'Clip In', path: '/aplicaciones-clip-in', type: 'aplicacion' as const, keywords: 'clip clip-in clipin' },
    { id: 'tape-in', title: 'Tape In', path: '/aplicaciones-tape-in', type: 'aplicacion' as const, keywords: 'tape tape-in tape in cinta' },
    { id: 'keratin', title: 'Keratin', path: '/aplicaciones-keratin', type: 'aplicacion' as const, keywords: 'keratin k-tip ktip k tip queratina' },
    { id: 'feather', title: 'Feather', path: '/aplicaciones-feather', type: 'aplicacion' as const, keywords: 'feather feathering pluma' },
    { id: 'double-piece', title: 'Double Piece Flat Weft', path: '/aplicaciones/double-piece-flat-weft', type: 'aplicacion' as const, keywords: 'double piece flat weft weft wefts wft sew in sew-in trama' },
  ];

  // Main pages data
  const mainPages = [
    { id: 'home', title: 'Inicio', path: '/', type: 'page' as const, keywords: 'inicio home' },
    { id: 'products', title: 'Productos', path: '/products', type: 'page' as const, keywords: 'productos products' },
    { id: 'stores', title: 'Compra', path: '/stores', type: 'page' as const, keywords: 'compra stores tiendas' },
    { id: 'contact', title: 'Contacto', path: '/contact', type: 'page' as const, keywords: 'contacto contact' },
  ];

  // Load all products on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsResult = await BaseCrudService.getAll<HairExtensionsandWigs>('hairextensions', {}, { limit: 100 });
        setAllProducts(productsResult.items);
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

    // Check if query is a known alias that locks to a category
    const lockedCategory = checkKnownAlias(query);

    // Search in products with scoring against normalized search index
    // If lockedCategory is set, only products from that category will score > 0
    // CRITICAL: Only show products with score > 0 (threshold already enforced in calculateSearchScore)
    // Never use default catalog as fallback - if no results meet threshold, show "No results found"
    const productResults = allProducts
      .map(product => {
        const searchIndex = createProductSearchIndex(product);
        const score = calculateSearchScore(query, searchIndex, lockedCategory || undefined);
        return { product, searchIndex, score };
      })
      .filter(({ score }) => score > 0)  // STRICT: Only items that pass threshold
      .sort((a, b) => b.score - a.score)
      .map(({ product }) => ({
        id: product._id,
        title: product.itemName || 'Producto sin nombre',
        type: 'product' as const,
        path: `/products/${product._id}`,
        description: product.itemDescription,
      }));

    // Search in application pages with scoring against normalized search index
    // If lockedCategory is set, only guides matching that category will score > 0
    const aplicacionResults = aplicaciones
      .map(app => ({
        app,
        searchIndex: normalizeText(`${app.title} ${app.keywords}`),
        score: calculateSearchScore(query, normalizeText(`${app.title} ${app.keywords}`), lockedCategory || undefined)
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ app }) => ({
        id: app.id,
        title: app.title,
        type: 'aplicacion' as const,
        path: app.path,
      }));

    // Search in main pages with scoring against normalized search index
    // Pages are not category-specific, so they only show if no locked category
    const pageResults = !lockedCategory ? mainPages
      .map(page => ({
        page,
        searchIndex: normalizeText(`${page.title} ${page.keywords}`),
        score: calculateSearchScore(query, normalizeText(`${page.title} ${page.keywords}`))
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ page }) => ({
        id: page.id,
        title: page.title,
        type: 'page' as const,
        path: page.path,
      })) : [];

    // Combine and limit results
    const combined = [...productResults, ...aplicacionResults, ...pageResults].slice(0, 10);
    setResults(combined);
    setIsLoading(false);
  }, [query, allProducts]);

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
                              {result.type === 'product' ? 'Producto' : result.type === 'aplicacion' ? 'Aplicación' : 'Página'}
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
