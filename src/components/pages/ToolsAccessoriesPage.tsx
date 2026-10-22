import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const toolProducts = [
  { id: '1', name: 'Hilo de Costura para Extensiones', category: 'Materiales', image: 'https://static.wixstatic.com/media/37e681_686b9df1b6da42d59ad7527806630715~mv2.jpg', imageHover: 'https://thehairshop.com/cdn/shop/files/cotton-thread_black_1080x.jpg?v=1736465255' },
  { id: '2', name: 'Enhebrador de Bucle', category: 'Herramientas', image: 'https://static.wixstatic.com/media/37e681_65062145685f4eb980b7c17df70c6ef7~mv2.jpg', imageHover: 'https://static.wixstatic.com/media/37e681_65062145685f4eb980b7c17df70c6ef7~mv2.jpg' },
  { id: '3', name: 'Kit Esencial para Cortina', category: 'Kits', image: 'https://static.wixstatic.com/media/37e681_4c2970713d494a9bad3981575147760c~mv2.jpg', imageHover: 'https://thehairshop.com/cdn/shop/products/weft_essential_working_blonde_1__74785.1651178532.1280.1280_1080x.jpg?v=1678443014' },
  { id: '4', name: 'Soporte para Extensiones', category: 'Instalación', image: 'https://static.wixstatic.com/media/37e681_85b668ac19524c0cba073ed616da34f0~mv2.jpg', imageHover: 'https://static.wixstatic.com/media/37e681_85b668ac19524c0cba073ed616da34f0~mv2.jpg' },
  { id: '5', name: 'Kit Básico de Instalación', category: 'Kits', image: 'https://static.wixstatic.com/media/37e681_407f71c6aa514543bfb86299adf484ca~mv2.jpg', imageHover: 'https://static.wixstatic.com/media/37e681_407f71c6aa514543bfb86299adf484ca~mv2.jpg' },
  { id: '6', name: 'Trípode para Cabeza de Práctica', category: 'Instalación', image: 'https://static.wixstatic.com/media/37e681_eb335862c1504a50a0e30051f7428cb1~mv2.jpg', imageHover: 'https://static.wixstatic.com/media/37e681_eb335862c1504a50a0e30051f7428cb1~mv2.jpg' },
  { id: '7', name: 'Cintas Adhesivas para Prótesis Capilares', category: 'Tape-In', image: 'https://static.wixstatic.com/media/37e681_de42e6bf846f46f09ca32a8155519326~mv2.jpg', imageHover: 'https://static.wixstatic.com/media/37e681_de42e6bf846f46f09ca32a8155519326~mv2.jpg' }
];

const categories = ['Todos', 'Instalación', 'Herramientas', 'Kits', 'Materiales', 'Tape-In'];

export default function ToolsAccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return toolProducts.filter(tool => {
      const categories = [tool.category];
      const matchesCategory = selectedCategory === 'Todos' || categories.includes(selectedCategory);
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-background py-12 md:py-16">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary">
              Herramientas y Accesorios
            </h1>
            <p className="font-paragraph text-base md:text-lg text-primary/80 max-w-2xl">
              Todo lo que necesitas para instalar, mantener y cuidar tus extensiones de cabello con profesionalismo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="w-full bg-background max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" />
            <input
              type="text"
              placeholder="Buscar herramientas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-primary/20 rounded-lg font-paragraph text-base focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary/50 hover:text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-paragraph text-sm md:text-base transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white border border-primary'
                  : 'border border-primary/30 text-primary hover:border-primary/60'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-6 text-primary/70 font-paragraph text-sm">
          {filteredTools.length} producto{filteredTools.length !== 1 ? 's' : ''} encontrado{filteredTools.length !== 1 ? 's' : ''}
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full bg-background max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-12">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                animate={{ y: hoveredId === tool.id ? -8 : 0 }}
                className="border border-primary/15 rounded-lg overflow-hidden hover:border-primary/40 transition-all group"
                onMouseEnter={() => setHoveredId(tool.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 bg-white overflow-hidden">
                  <Image
                    src={hoveredId === tool.id && tool.imageHover ? tool.imageHover : tool.image}
                    alt={tool.name}
                    width={300}
                    height={300}
                    className={`w-full h-full object-contain transition-transform duration-300 ${hoveredId === tool.id ? 'scale-[1.04]' : 'scale-100'}`}
                  />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 bg-background">
                  <h3 className="font-heading text-lg md:text-xl text-primary mb-4 line-clamp-3">
                    {tool.name}
                  </h3>

                  {/* Button */}
                  <Link
                    to="/contact"
                    className="block w-full text-center font-paragraph text-base px-4 py-3 border border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-colors rounded"
                  >
                    Consultar disponibilidad
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="font-paragraph text-lg text-primary/60 mb-4">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
              }}
              className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity underline"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary text-white py-12 md:py-16 mt-8 md:mt-12">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h2 className="font-heading text-3xl md:text-4xl">
              ¿Necesitas asesoramiento?
            </h2>
            <p className="font-paragraph text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Nuestro equipo de expertos está disponible para ayudarte a elegir las herramientas adecuadas.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center font-paragraph text-base md:text-lg px-8 md:px-10 py-3 md:py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors rounded"
            >
              Consultar disponibilidad
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
