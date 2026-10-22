import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

const toolCategories = [
  {
    id: 'installation-prep',
    name: 'Preparación de Instalación',
    category: 'Instalación',
    description: 'Herramientas esenciales para preparar el cabello y organizar las extensiones antes de la aplicación.',
    image: 'https://static.wixstatic.com/media/37e681_e2cc94aec4704448a62db95eb0bed1fa~mv2.png?originWidth=256&originHeight=256'
  },
  {
    id: 'tape-in',
    name: 'Herramientas Tape-In',
    category: 'Tape-In',
    description: 'Herramientas especializadas para aplicar y mantener extensiones adhesivas con precisión.',
    image: 'https://static.wixstatic.com/media/37e681_e3c828df29eb4c9db78f9192f64d228b~mv2.png?originWidth=256&originHeight=256'
  },
  {
    id: 'weft-sewing',
    name: 'Herramientas Weft / Costura',
    category: 'Weft',
    description: 'Equipos para coser y asegurar extensiones con método de costura tradicional.',
    image: 'https://static.wixstatic.com/media/37e681_37ff1bcfba0f402da3092f90f3be29e9~mv2.png?originWidth=256&originHeight=256'
  },
  {
    id: 'i-tip-flat-tip',
    name: 'Herramientas I-Tip / Flat-Tip',
    category: 'I-Tip',
    description: 'Herramientas para aplicar extensiones con punta individual o plana.',
    image: 'https://static.wixstatic.com/media/37e681_c6f63eeb026d46fea171b0930d406a7a~mv2.png?originWidth=256&originHeight=256'
  },
  {
    id: 'k-tip-keratin',
    name: 'Herramientas K-Tip / Queratina',
    category: 'K-Tip',
    description: 'Equipos especializados para fusión por calor y aplicación de queratina.',
    image: 'https://static.wixstatic.com/media/37e681_23d1c4d75f604400b3281e2d617077a9~mv2.png?originWidth=256&originHeight=256'
  },
  {
    id: 'clip-in',
    name: 'Accesorios Clip-In',
    category: 'Clip-In',
    description: 'Accesorios y herramientas para extensiones removibles con clips.',
    image: 'https://static.wixstatic.com/media/37e681_9a26230d76c84a1088ed454dd87acbe4~mv2.png?originWidth=256&originHeight=256'
  },
  {
    id: 'care-maintenance',
    name: 'Productos de Cuidado y Mantenimiento',
    category: 'Mantenimiento',
    description: 'Productos y herramientas para mantener las extensiones en óptimas condiciones.',
    image: 'https://static.wixstatic.com/media/37e681_801cfeaf1a89488aae3ec0c2ea047ee5~mv2.png?originWidth=256&originHeight=256'
  },
  {
    id: 'color-ring',
    name: 'Anillo de Color',
    category: 'Color',
    description: 'Acceso a nuestro anillo de color profesional y consultas personalizadas.',
    image: 'https://static.wixstatic.com/media/37e681_dd279c18ceb14356b1a4e26ae8553913~mv2.png?originWidth=256&originHeight=256'
  }
];

const categories = ['Todos', 'Instalación', 'Tape-In', 'Weft', 'I-Tip', 'K-Tip', 'Clip-In', 'Mantenimiento', 'Color'];

export default function ToolsAccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return toolCategories.filter(tool => {
      const matchesCategory = selectedCategory === 'Todos' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
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
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-12">
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
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-12">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="border border-primary/15 rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 bg-background/50 overflow-hidden">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-paragraph">
                    {tool.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <h3 className="font-heading text-lg md:text-xl text-primary mb-2 line-clamp-2">
                    {tool.name}
                  </h3>
                  <p className="font-paragraph text-sm text-primary/70 mb-4 line-clamp-2">
                    {tool.description}
                  </p>

                  {/* Button */}
                  <Link
                    to="/contact"
                    className="block w-full text-center font-paragraph text-base px-4 py-3 border border-primary bg-white text-primary hover:bg-primary hover:text-white transition-colors rounded"
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
