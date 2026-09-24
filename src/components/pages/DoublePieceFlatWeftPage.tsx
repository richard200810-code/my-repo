import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HairColorSelector from '@/components/HairColorSelector';
import { ChevronRight, ChevronDown, ChevronLeft, ZoomIn } from 'lucide-react';

export default function DoublePieceFlatWeftPage() {
  const [selectedLength, setSelectedLength] = useState('18');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Gallery images for Double Piece Flat Weft
  const galleryImages = [
    {
      url: 'https://static.wixstatic.com/media/37e681_682396f4cb994c298aea0c305d3710d8~mv2.jpg',
      alt: 'Double Piece Flat Weft - Vista general de la trama',
      isReference: false
    },
    {
      url: 'https://beautylinkhairpro.com/wp-content/uploads/2025/06/volume-flat-weft022716.jpg',
      alt: 'Imagen de referencia - Flat Weft de otro fabricante',
      isReference: true,
      sourceUrl: 'https://beautylinkhairpro.com/wefts/'
    },
    {
      url: 'https://glhair.uk/cdn/shop/files/Flat_weft-_Category.2_9c71e6dc-97d6-4679-93a7-d29453f2807a_700x700.png?v=1767185226',
      alt: 'Imagen de referencia - Flat Weft de otro fabricante',
      isReference: true,
      sourceUrl: 'https://glhair.uk/products/flat-weft-90g-24inch-luxe'
    }
  ];

  const handlePrevImage = () => {
    setMainImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setMainImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const lengths = ['14', '16', '18', '20', '22', '24', '26', '28', '30'];

  const trustPoints = [
    {
      title: 'Evaluación profesional',
      description: 'Cada aplicación requiere una valoración personalizada según el tipo de cabello, textura y objetivos específicos del cliente.'
    },
    {
      title: 'Selección según cabello',
      description: 'Nuestros especialistas determinan la mejor configuración de densidad y especificaciones para cada caso individual.'
    },
    {
      title: 'Integración personalizada',
      description: 'Trabajamos con técnicas adaptadas a las características únicas de tu cabello para resultados naturales y duraderos.'
    }
  ];

  const accordionItems = [
    {
      title: 'Descripción',
      content: 'El Double Piece Flat Weft es una trama de construcción de doble pieza con perfil plano, diseñada para profesionales que requieren máxima flexibilidad en la personalización de densidad. Su estructura permite ajustar la cantidad de cabello según las necesidades específicas de cada cliente, garantizando una colocación uniforme y resultados profesionales.'
    },
    {
      title: 'Aplicación profesional',
      content: 'La aplicación del Double Piece Flat Weft requiere evaluación profesional previa. El perfil plano proporciona una base uniforme para la colocación, permitiendo técnicas de integración precisas. La estructura de doble pieza facilita la personalización de densidad durante el proceso de instalación, adaptándose a las características específicas del cabello del cliente.'
    },
    {
      title: 'Cuidado y mantenimiento',
      content: 'El mantenimiento incluye cuidados regulares del cabello, revisiones periódicas de la colocación y seguimiento profesional. Recomendamos consultar con tu especialista para instrucciones detalladas de cuidado específicas para tu tipo de cabello y aplicación. Un mantenimiento adecuado garantiza la longevidad y apariencia óptima del producto.'
    },
    {
      title: 'Especificaciones',
      content: 'Disponible en largos pares de 14 a 30 pulgadas. Colores disponibles según catálogo profesional. Todas las especificaciones están sujetas a disponibilidad y requieren consulta profesional previa para confirmar la mejor opción según tus necesidades.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb - Discrete */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center gap-2 text-xs md:text-sm font-paragraph text-secondary/50 uppercase tracking-wide">
          <Link to="/" className="hover:text-secondary/70 transition-colors">
            Inicio
          </Link>
          <span className="text-secondary/30">/</span>
          <Link to="/aplicaciones-hair-weft" className="hover:text-secondary/70 transition-colors">
            Aplicación
          </Link>
          <span className="text-secondary/30">/</span>
          <Link to="/aplicaciones-hair-weft" className="hover:text-secondary/70 transition-colors">
            Hair Weft
          </Link>
          <span className="text-secondary/30">/</span>
          <span className="text-secondary/60">Double Piece Flat Weft</span>
        </div>
      </section>

      {/* Hero Section - Two Columns with ample white space */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Image Gallery Column */}
          <div className="flex flex-col gap-8">
            {/* Main Image with Zoom */}
            <div 
              className="w-full aspect-[3/4] rounded-sm overflow-hidden bg-background/10 relative group cursor-pointer"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={galleryImages[mainImageIndex].url}
                alt={galleryImages[mainImageIndex].alt}
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                width={600}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Thumbnails Gallery */}
            <div className="flex gap-3">
              {galleryImages.map((image, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMainImageIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`w-20 h-24 rounded-sm overflow-hidden border-2 transition-all ${
                      mainImageIndex === idx
                        ? 'border-secondary'
                        : 'border-secondary/20 hover:border-secondary/50'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      width={80}
                    />
                  </button>
                  {image.isReference && (
                    <a
                      href={image.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-paragraph text-secondary/50 hover:text-secondary/70 transition-colors underline"
                    >
                      Ver fuente
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Reference Note */}
            <div className="space-y-2">
              {galleryImages.slice(1).map((image, idx) => (
                mainImageIndex === idx + 1 && (
                  <div key={idx} className="text-xs font-paragraph text-secondary/60 bg-secondary/5 p-3 rounded-sm border border-secondary/10">
                    <p className="font-semibold text-secondary/70 mb-1">Imagen de referencia de otro fabricante; no es producto LUX Hair</p>
                    <a
                      href={image.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/50 hover:text-secondary/70 transition-colors underline break-all"
                    >
                      {image.sourceUrl}
                    </a>
                  </div>
                )
              ))}
            </div>

            <div className="text-xs font-paragraph text-secondary/40 uppercase tracking-widest">
              Catálogo
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col gap-12">
            {/* Professional Label & Title */}
            <div>
              <div className="text-xs md:text-sm font-paragraph text-secondary/60 uppercase tracking-widest mb-6">
                Hair Weft · Profesional
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-secondary mb-8 leading-tight">
                Double Piece Flat Weft
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-secondary/70 leading-relaxed max-w-md">
                Trama de doble pieza con construcción plana, diseñada para profesionales que buscan máxima flexibilidad en personalización de densidad y colocación precisa.
              </p>
            </div>

            {/* Three-Point Visual Sheet */}
            <div className="space-y-6 py-8 border-y border-secondary/10">
              <div className="flex gap-6">
                <div className="w-1 bg-secondary flex-shrink-0"></div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-2">Doble capa</h3>
                  <p className="font-paragraph text-sm text-secondary/60">
                    Estructura de dos piezas independientes que permite ajustar la densidad según necesidades específicas.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-1 bg-secondary flex-shrink-0"></div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-2">Perfil plano</h3>
                  <p className="font-paragraph text-sm text-secondary/60">
                    Base uniforme diseñada para colocación precisa, consistente y profesional.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-1 bg-secondary flex-shrink-0"></div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-2">Distribución de trama</h3>
                  <p className="font-paragraph text-sm text-secondary/60">
                    Patrón de tejido optimizado para caída natural y comportamiento del material.
                  </p>
                </div>
              </div>
            </div>

            {/* Query Configuration */}
            <div className="space-y-8">
              <h3 className="font-heading text-xl text-secondary">Configuración para consulta</h3>
              <p className="font-paragraph text-xs text-secondary/50 uppercase tracking-widest">
                Sujeto a disponibilidad
              </p>
              
              {/* Length Selector */}
              <div>
                <label className="font-paragraph text-sm text-secondary/70 block mb-4 uppercase tracking-wide">
                  Largo (pulgadas)
                </label>
                <div className="flex flex-wrap gap-3">
                  {lengths.map((length) => (
                    <button
                      key={length}
                      onClick={() => setSelectedLength(length)}
                      className={`px-4 py-2 font-paragraph text-sm transition-all border ${
                        selectedLength === length
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-white text-secondary border-secondary/20 hover:border-secondary/50'
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Ring Selector */}
              <div>
                <label className="font-paragraph text-sm text-secondary/70 block mb-4 uppercase tracking-wide">
                  Selector de color
                </label>
                <HairColorSelector 
                  onSelect={setSelectedColor} 
                  selectedCode={selectedColor || undefined}
                  compact={true}
                />
              </div>

              {/* Availability Note */}
              <p className="font-paragraph text-sm text-secondary/60 pt-4 border-t border-secondary/10 mt-4">
                Las opciones se confirman según disponibilidad y evaluación profesional.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/contact"
                className="flex-1 px-8 py-4 bg-secondary text-white font-paragraph text-base hover:bg-secondary/90 transition-colors text-center uppercase tracking-wide text-sm"
              >
                Consultar disponibilidad
              </Link>
              <Link
                to="/aplicaciones-hair-weft"
                className="flex-1 px-8 py-4 border-2 border-secondary text-secondary font-paragraph text-base hover:bg-secondary/5 transition-colors text-center uppercase tracking-wide text-sm"
              >
                Ver Hair Weft
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Block - Three Columns */}
      <section className="w-full bg-secondary/5 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {trustPoints.map((point, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-secondary/10"></div>
                <h3 className="font-heading text-xl text-secondary">{point.title}</h3>
                <p className="font-paragraph text-base text-secondary/70 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordions Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-12">
          Información detallada
        </h2>
        <div className="space-y-3">
          {accordionItems.map((item, idx) => (
            <div key={idx} className="border border-secondary/15 overflow-hidden">
              <button
                onClick={() => setExpandedAccordion(expandedAccordion === idx ? null : idx)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between bg-white hover:bg-secondary/2 transition-colors"
              >
                <h3 className="font-heading text-lg md:text-xl text-secondary text-left">
                  {item.title}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-secondary flex-shrink-0 ml-4 transition-transform duration-300 ${
                    expandedAccordion === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedAccordion === idx && (
                <div className="px-6 md:px-8 py-6 md:py-8 bg-secondary/2 border-t border-secondary/10">
                  <p className="font-paragraph text-base text-secondary/70 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Section - Recommendations with Visual Cards */}
      <section className="w-full bg-secondary/5 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-12">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Virgin Brazilian Sew-in Weft Card */}
            <Link
              to="/products/af7eb76e-51cc-4949-bf30-ef2a66c74181"
              className="bg-white overflow-hidden border border-secondary/10 hover:border-secondary/30 transition-all group"
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-background/10">
                <Image
                  src="https://static.wixstatic.com/media/37e681_1a1646003d734fdc8e298d456e9e53eb~mv2.png?originWidth=640&originHeight=640"
                  alt="Virgin Brazilian Sew-in Weft"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl text-secondary mb-3 group-hover:text-secondary/80 transition-colors">
                  Virgin Brazilian Sew-in Weft
                </h3>
                <p className="font-paragraph text-base text-secondary/70 mb-6">
                  Cabello virgen brasileño de alta calidad con trama cosida, ideal para aplicaciones profesionales duraderas.
                </p>
                <div className="flex items-center gap-2 text-secondary font-paragraph text-sm uppercase tracking-wide">
                  Ver producto <ChevronRight size={16} />
                </div>
              </div>
            </Link>

            {/* Ombre Balayage Weft Extensions Card */}
            <Link
              to="/products/f52c9675-ed70-4493-9f2f-3e0b1c0164c8"
              className="bg-white overflow-hidden border border-secondary/10 hover:border-secondary/30 transition-all group"
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-background/10">
                <Image
                  src="https://static.wixstatic.com/media/37e681_4a66d6f5c2f84ae69fb32690223d8f0a~mv2.png?originWidth=640&originHeight=640"
                  alt="Ombre Balayage Weft Extensions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl text-secondary mb-3 group-hover:text-secondary/80 transition-colors">
                  Ombre Balayage Weft Extensions
                </h3>
                <p className="font-paragraph text-base text-secondary/70 mb-6">
                  Extensiones con efecto ombre balayage, perfectas para crear dimensión y movimiento natural en el cabello.
                </p>
                <div className="flex items-center gap-2 text-secondary font-paragraph text-sm uppercase tracking-wide">
                  Ver producto <ChevronRight size={16} />
                </div>
              </div>
            </Link>

            {/* Hair Weft Guide Card */}
            <Link
              to="/aplicaciones-hair-weft"
              className="bg-white overflow-hidden border border-secondary/10 hover:border-secondary/30 transition-all group"
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-background/10 flex items-center justify-center">
                <div className="text-center px-6">
                  <h3 className="font-heading text-3xl text-secondary mb-2">
                    Guía Hair Weft
                  </h3>
                  <p className="font-paragraph text-sm text-secondary/60">
                    Métodos de aplicación
                  </p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl text-secondary mb-3 group-hover:text-secondary/80 transition-colors">
                  Guía Hair Weft
                </h3>
                <p className="font-paragraph text-base text-secondary/70 mb-6">
                  Explora todos los métodos de aplicación de trama y encuentra el más adecuado para tus necesidades.
                </p>
                <div className="flex items-center gap-2 text-secondary font-paragraph text-sm uppercase tracking-wide">
                  Explorar <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
