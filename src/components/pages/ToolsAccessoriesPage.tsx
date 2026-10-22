import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

const toolProducts = [
  { id: '1', name: 'Pinza para Extensiones', category: 'Herramientas', image: 'https://static.wixstatic.com/media/37e681_963975beef7f4211b0b0f95ab593c6a2~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_f797cfa314b24882afa0a1292fc47477~mv2.png?originWidth=256&originHeight=256' },
  { id: '2', name: 'Aguja de Ventilación', category: 'Herramientas', image: 'https://static.wixstatic.com/media/37e681_7a540e4532634ce4975f82970f4a6939~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_357e5b626c444df5bf6011a13b61d8a8~mv2.png?originWidth=256&originHeight=256' },
  { id: '3', name: 'Soporte de Extensiones', category: 'Instalación', image: 'https://static.wixstatic.com/media/37e681_2aa38c89e685471d81acd27b9bf55107~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_c16c46520b9c4ed7a3a1f89bdaa545ff~mv2.png?originWidth=256&originHeight=256' },
  { id: '4', name: 'Cinta Adhesiva Doble Cara', category: 'Tape-In', image: 'https://static.wixstatic.com/media/37e681_28bffdeff9134ad5984724480b655368~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_ee1fb8735f5f4500b1f5a4eb2d8a237c~mv2.png?originWidth=256&originHeight=256' },
  { id: '5', name: 'Anillas de Silicona', category: 'Cuentas', image: 'https://static.wixstatic.com/media/37e681_624f56a6c1d3495198cc02b955508aef~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_a0bb45f1eb0847709746d45153769ba3~mv2.png?originWidth=256&originHeight=256' },
  { id: '6', name: 'Hilo de Nylon', category: 'Materiales', image: 'https://static.wixstatic.com/media/37e681_d26fcfc2787f45c1bb4e7a2cb09d680f~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_3d020efeb0c34e2db929ac49715e35b3~mv2.png?originWidth=256&originHeight=256' },
  { id: '7', name: 'Clips de Separación', category: 'Clips', image: 'https://static.wixstatic.com/media/37e681_c955252b8a054540ad383c4d6c165b00~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_68b903035d014bb1a9436b02f2ff038b~mv2.png?originWidth=256&originHeight=256' },
  { id: '8', name: 'Protector de Cuero Cabelludo', category: 'Protección', image: 'https://static.wixstatic.com/media/37e681_7b3f7568815a46ddba48634d04980c10~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_4607114b67b84c2e9fe6d956d82a8b79~mv2.png?originWidth=256&originHeight=256' },
  { id: '9', name: 'Plancha de Queratina', category: 'K-Tip', image: 'https://static.wixstatic.com/media/37e681_44e9b0623e244e868105cf506afc6179~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_e578b725be004e5f813034bbbce80a38~mv2.png?originWidth=256&originHeight=256' },
  { id: '10', name: 'Malla de Integración', category: 'Materiales', image: 'https://static.wixstatic.com/media/37e681_d1f735de220a4eaab0c890f8fcfd7921~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_666d3a3739504eb69fb909e21812e61c~mv2.png?originWidth=256&originHeight=256' },
  { id: '11', name: 'Kit de Herramientas Profesional', category: 'Kits', image: 'https://static.wixstatic.com/media/37e681_8a2211a47dce4eb6ac92faeefa7c72ae~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_d24c5a6ec60741d186b53ec7e89a211a~mv2.png?originWidth=256&originHeight=256' },
  { id: '12', name: 'Aguja de Costura de Madera', category: 'Herramientas', image: 'https://static.wixstatic.com/media/37e681_28ae4ceffd81416bba09dd6495775324~mv2.png?originWidth=256&originHeight=256', imageHover: 'https://static.wixstatic.com/media/37e681_3cd4d6b0af5f4d2db8a560ac61a27408~mv2.png?originWidth=256&originHeight=256' }
];

const categories = ['Todos', 'Instalación', 'Herramientas', 'Kits', 'Cuentas', 'Materiales', 'Tape-In', 'K-Tip', 'Clips', 'Protección'];

export default function ToolsAccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return toolProducts.filter(tool => {
      const categories = tool.categories || [tool.category];
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
                    className="w-full h-full object-cover transition-all duration-300"
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
