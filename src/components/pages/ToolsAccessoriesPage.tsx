import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

const toolProducts = [
  { id: '1', name: 'Acrylic Hair Extension Stand', category: 'Instalación', image: 'https://static.wixstatic.com/media/f08e6d_10244c1e989d4a1c9ead7c2e74f19560~mv2.jpg' },
  { id: '2', name: 'Professional Hair Extensions Plier', category: 'Herramientas', image: 'https://static.wixstatic.com/media/f08e6d_e4f8650d65f24477a4ef2b4ec9ef0409~mv2.jpg' },
  { id: '3', name: 'Professional Hair Extensions Tools Kit', category: 'Kits', image: 'https://static.wixstatic.com/media/f08e6d_3e403ec619cb41f3879631e084eed92f~mv2.png' },
  { id: '4', name: '1000pcs Pre-Loaded Aluminum Silicone Lined Bead', category: 'Cuentas', image: 'https://static.wixstatic.com/media/f08e6d_c9be68f5abc7482c9d1ebd9d6bdd3e15~mv2.jpg' },
  { id: '5', name: 'STRETCH MESH(used for meshintegration)', category: 'Materiales', image: 'https://static.wixstatic.com/media/f08e6d_bbd616b4a43b4be8b3de0c5766543247~mv2.png' },
  { id: '6', name: 'Tape Glue Kits(Used to make TapeIn/PU hair)', category: 'Tape-In', image: 'https://static.wixstatic.com/media/f08e6d_ce9f9f90f35b4c2198ce61036e18fef1~mv2.png' },
  { id: '7', name: 'Ktip Hair Kits (Used to make ktips/micro ktips)', category: 'K-Tip', image: 'https://static.wixstatic.com/media/f08e6d_1d459ab75dcf4a768764226800fafd86~mv2.png' },
  { id: '8', name: 'Seatyle Color Ring', category: 'Color', image: 'https://static.wixstatic.com/media/f08e6d_e87c7aa25ce343b6b11829e3da5ecca3~mv2.jpg' },
  { id: '9', name: 'Seatyle Texture Ring', category: 'Color', image: 'https://static.wixstatic.com/media/f08e6d_4cd78535595040c7a25250f5043c200a~mv2.jpg' },
  { id: '10', name: 'Keratin Bonds Separator Clips', category: 'Clips', image: 'https://static.wixstatic.com/media/f08e6d_0a65974594b043e58ae7748ea3c30496~mv2.jpg' },
  { id: '11', name: 'Alligator Hair Clips (6 Pcs)', category: 'Clips', image: 'https://static.wixstatic.com/media/f08e6d_e025c6a2f3bc41ccad4ae247cbe44a70~mv2.jpg' },
  { id: '12', name: '1000/2000 Meters Nylon Thread for sewing wefts', category: 'Weft', image: 'https://static.wixstatic.com/media/f08e6d_8464127c29db4e2ba4096d4cb15d9c3a~mv2.jpg' },
  { id: '13', name: 'Italian Keratin Glue Powder/ Heating Tools', category: 'K-Tip', image: 'https://static.wixstatic.com/media/f08e6d_9085d08443354e8d88b1fc9c33f22334~mv2.jpg' },
  { id: '14', name: 'Bracket For Fixing Hair Bundle', category: 'Instalación', image: 'https://static.wixstatic.com/media/f08e6d_f7ce4488f3684b56948fb5008dc12937~mv2.jpg' },
  { id: '15', name: '60m Nylon Weaving Thread For Weft Hair Extensions', category: 'Weft', image: 'https://static.wixstatic.com/media/f08e6d_0d905cc59f664ca4ba1a21d9d1969ce9~mv2.jpg' },
  { id: '16', name: '1000pcs Aluminum Silicone Lined Aluminum Hair Extensions Links Bead', category: 'Cuentas', image: 'https://static.wixstatic.com/media/f08e6d_1dec853b023f4d0fbb389656024b435c~mv2.jpg' },
  { id: '17', name: '1000pcs Silicone Lined Micro Link Ring Beads(3420*40mm)', category: 'Cuentas', image: 'https://static.wixstatic.com/media/f08e6d_1d5362ccf340475e93f3b1e7d89fcd5a~mv2.jpg' },
  { id: '18', name: 'Wooden Loop Needle For Hair Extension Tool', category: 'Herramientas', image: 'https://static.wixstatic.com/media/f08e6d_854f140ababc4de1b16e103bd6745ede~mv2.jpg' },
  { id: '19', name: 'Aluminum Ventilating Holder Needles Kit for Hair Extension', category: 'Kits', image: 'https://static.wixstatic.com/media/f08e6d_287c1705c23743c9b74da2823c170854~mv2.jpg' },
  { id: '20', name: 'Hair Extensions Pliers', category: 'Herramientas', image: 'https://static.wixstatic.com/media/f08e6d_e4adaa86cdc34b84af9e9e8d848c13c7~mv2.jpg' },
  { id: '21', name: 'Hair Extensions Tools Kit', category: 'Kits', image: 'https://static.wixstatic.com/media/f08e6d_f0d2b2ea09f54595a17afec031fa1422~mv2.jpg' },
  { id: '22', name: 'Hair Extension Holder Displays Rack', category: 'Instalación', image: 'https://static.wixstatic.com/media/f08e6d_44ff7f49e9e94a3397161dd840b98b8d~mv2.jpg' },
  { id: '23', name: 'Cotton Sewing Thread For Weft Hair', category: 'Weft', image: 'https://static.wixstatic.com/media/f08e6d_3586658e997b4a8c8204cec8ed09439c~mv2.jpeg' },
  { id: '24', name: 'Double Side Replacement Blue Tape Roll For Tape Weft Hair Extensions', category: 'Tape-In', image: 'https://static.wixstatic.com/media/f08e6d_02aca0f4c16e4518ae913d7a68678aae~mv2.jpg' },
  { id: '25', name: 'Double Sided Adhesive Tape for Hair Extension Tapes for Replacement', category: 'Tape-In', image: 'https://static.wixstatic.com/media/f08e6d_0012cc90c2034ae895f2698e4c9557dc~mv2.jpg' },
  { id: '26', name: 'Single Sided Adhesive Tape for Hair Extension Tapes for Replacement', category: 'Tape-In', image: 'https://static.wixstatic.com/media/f08e6d_2ff577301f0c40b3abdb40d2d3ad2d55~mv2.jpg' },
  { id: '27', name: '1000PCS Copper Tubes Micro Ring Beads For I-tip Hair Extensions', category: 'I-Tip', image: 'https://static.wixstatic.com/media/f08e6d_8f9dc50c89d842f4814e479736ea4daf~mv2.jpg' },
  { id: '28', name: '1000pcs 3mm Copper Silicone Nano Rings Nano Beads for Nano Hair Extensions', category: 'Nano', image: 'https://static.wixstatic.com/media/f08e6d_b568db506dca494f8d022d8a54b89ac6~mv2.jpg' },
  { id: '29', name: '1000pcs Copper No Silicone Nano Rings Nano Beads', category: 'Nano', image: 'https://static.wixstatic.com/media/f08e6d_5059c0f84b0d47fbac5c4d8c0fcb3c0d~mv2.jpg' },
  { id: '30', name: 'Hair Section Clips(10 clips each package)', category: 'Clips', image: 'https://static.wixstatic.com/media/f08e6d_3997b5924dec4fdda6173410dec44254~mv2.jpg' },
  { id: '31', name: 'MAKE KERATIN HAIR KITS(Italian glue/heating tools)', category: 'K-Tip', image: 'https://static.wixstatic.com/media/f08e6d_270a962d8bae407a87307fd0f99bb2eb~mv2.jpg' },
  { id: '32', name: 'Italian Hair Extension Keratin Bonding Glue Roll Beads Hot Melt Keratin Glue', category: 'K-Tip', image: 'https://static.wixstatic.com/media/f08e6d_74d9e7a4f0764029a52260ecd8712991~mv2.jpg' },
  { id: '33', name: 'Keratin Hair Heat Connector Machine', category: 'K-Tip', image: 'https://static.wixstatic.com/media/f08e6d_9812a2117c614590a213fa1c4de77f0d~mv2.jpg' },
  { id: '34', name: 'Keratin Heating Plate', category: 'K-Tip', image: 'https://static.wixstatic.com/media/f08e6d_48209ef6c39b4faa9a94c9d16b27e64b~mv2.jpg' },
  { id: '35', name: 'Intelligent Soldering Iron For Micro Ktip Extensions', category: 'K-Tip', image: 'https://static.wixstatic.com/media/f08e6d_b47a44b3f73646e3b42fe59067872c2f~mv2.png' },
  { id: '36', name: 'Invisible Hair Kits', category: 'Kits', image: 'https://static.wixstatic.com/media/f08e6d_e99e1fb5f9364e6b83bfdea0050a5361~mv2.jpg' },
  { id: '37', name: 'Long Length Hair Extension Heat Protector Shield Template Disk Scalp Protector', category: 'Protección', image: 'https://static.wixstatic.com/media/f08e6d_6f3cfb22d66b4b4bac5260fb42eb8660~mv2.jpg' },
  { id: '38', name: 'Wooden Drawing Mat With Curved Needles For Hair Separation Hair Extensions', category: 'Herramientas', image: 'https://static.wixstatic.com/media/f08e6d_2b828460d0c045ff8a278e7b6c3c95d2~mv2.jpg' },
  { id: '39', name: '6D Hair Extensions Machine', category: 'Máquinas', image: 'https://static.wixstatic.com/media/f08e6d_f5b68eaff08a41ee87f1c1700e71c90f~mv2.jpg' }
];

const categories = ['Todos', 'Instalación', 'Herramientas', 'Kits', 'Cuentas', 'Materiales', 'Tape-In', 'K-Tip', 'Weft', 'I-Tip', 'Nano', 'Clips', 'Color', 'Protección', 'Máquinas'];

export default function ToolsAccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return toolProducts.filter(tool => {
      const matchesCategory = selectedCategory === 'Todos' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
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
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <h3 className="font-heading text-lg md:text-xl text-primary mb-4 line-clamp-3">
                    {tool.name}
                  </h3>

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
