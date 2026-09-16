import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [products, setProducts] = useState<HairExtensionsandWigs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    type: '',
    applicationMethod: '',
    texture: '',
  });
  const [showFilters, setShowFilters] = useState(false);
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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.itemPrice || 0) - (b.itemPrice || 0);
      case 'price-high':
        return (b.itemPrice || 0) - (a.itemPrice || 0);
      case 'newest':
        return new Date(b._createdDate || 0).getTime() - new Date(a._createdDate || 0).getTime();
      default:
        return 0;
    }
  });

  const uniqueTypes = Array.from(new Set(products.map(p => p.productType).filter(Boolean)));
  const uniqueMethods = Array.from(new Set(products.map(p => p.applicationMethod).filter(Boolean)));
  const uniqueTextures = Array.from(new Set(products.map(p => p.texture).filter(Boolean)));

  const hasActiveFilters = filters.type || filters.applicationMethod || filters.texture;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-background/30 to-white">
        <div className="max-w-[100rem] mx-auto px-6 py-20">
          <h1 className="font-heading text-6xl md:text-7xl text-primary mb-4">Tienda de Extensiones de Cabello</h1>
          <p className="font-paragraph text-xl text-secondary/70 max-w-3xl">
            Descubre nuestra colección premium de extensiones de cabello, pelucas y piezas de cabello. Desde aplicaciones Tape-in hasta K-tip, encuentra el ajuste perfecto para tu estilo.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-12">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-background">
          <div className="flex items-center gap-4">
            <span className="font-paragraph text-secondary/70">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'producto' : 'productos'}
            </span>
            {hasActiveFilters && (
              <button
                onClick={() => setFilters({ type: '', applicationMethod: '', texture: '' })}
                className="font-paragraph text-sm text-primary hover:text-secondary transition-colors underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 border border-background rounded-lg font-paragraph text-secondary bg-white cursor-pointer pr-10"
              >
                <option value="featured">Destacado</option>
                <option value="newest">Más Nuevo</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-2 border border-background rounded-lg font-paragraph text-secondary hover:bg-background transition-colors"
            >
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>
          </div>
        </div>

        {/* Products Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="space-y-8 sticky top-24">
              {/* Hair Type Filter */}
              <div>
                <h3 className="font-heading text-lg text-primary mb-4">Tipo de Cabello</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="type"
                      checked={filters.type === ''}
                      onChange={() => setFilters({ ...filters, type: '' })}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-secondary group-hover:text-primary transition-colors">Todos los Tipos</span>
                  </label>
                  {uniqueTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="type"
                        checked={filters.type === type}
                        onChange={() => setFilters({ ...filters, type: type || '' })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-secondary group-hover:text-primary transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Application Method Filter */}
              <div className="border-t border-background pt-8">
                <h3 className="font-heading text-lg text-primary mb-4">Aplicación</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="method"
                      checked={filters.applicationMethod === ''}
                      onChange={() => setFilters({ ...filters, applicationMethod: '' })}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-secondary group-hover:text-primary transition-colors">Todos los Métodos</span>
                  </label>
                  {uniqueMethods.map((method) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="method"
                        checked={filters.applicationMethod === method}
                        onChange={() => setFilters({ ...filters, applicationMethod: method || '' })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-secondary group-hover:text-primary transition-colors">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Texture Filter */}
              <div className="border-t border-background pt-8">
                <h3 className="font-heading text-lg text-primary mb-4">Textura</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="texture"
                      checked={filters.texture === ''}
                      onChange={() => setFilters({ ...filters, texture: '' })}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-secondary group-hover:text-primary transition-colors">Todas las Texturas</span>
                  </label>
                  {uniqueTextures.map((texture) => (
                    <label key={texture} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="texture"
                        checked={filters.texture === texture}
                        onChange={() => setFilters({ ...filters, texture: texture || '' })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-secondary group-hover:text-primary transition-colors">{texture}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product, idx) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group flex flex-col"
                  >
                    {/* Product Image */}
                    <Link to={`/products/${product._id}`} className="block mb-4 overflow-hidden rounded-lg">
                      <div className="bg-background aspect-square relative">
                        <Image
                          src={product.itemImage || 'https://static.wixstatic.com/media/37e681_0db7ce50d12949b7917c01750c78880c~mv2.png?originWidth=384&originHeight=384'}
                          alt={product.itemName || 'Producto'}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.productType && (
                          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-paragraph font-semibold">
                            {product.productType}
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-grow space-y-3">
                      <Link to={`/products/${product._id}`} className="block">
                        <h3 className="font-heading text-lg text-primary group-hover:text-secondary transition-colors line-clamp-2">
                          {product.itemName}
                        </h3>
                      </Link>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-2">
                        {product.texture && (
                          <span className="text-xs font-paragraph bg-background/50 text-secondary px-2 py-1 rounded">
                            {product.texture}
                          </span>
                        )}
                        {product.applicationMethod && (
                          <span className="text-xs font-paragraph bg-background/50 text-secondary px-2 py-1 rounded">
                            {product.applicationMethod}
                          </span>
                        )}
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-3 border-t border-background">
                        <span className="font-heading text-2xl text-primary">
                          {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                        </span>
                        <button
                          onClick={() => actions.addToCart({ collectionId: 'hairextensions', itemId: product._id })}
                          disabled={addingItemId === product._id}
                          className="px-3 py-2 bg-primary text-primary-foreground font-paragraph text-sm font-semibold rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
                        >
                          {addingItemId === product._id ? 'Agregando...' : 'Agregar'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-secondary/70 mb-8">
                  No se encontraron productos que coincidan con tus filtros
                </p>
                <button
                  onClick={() => setFilters({ type: '', applicationMethod: '', texture: '' })}
                  className="px-6 py-3 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
