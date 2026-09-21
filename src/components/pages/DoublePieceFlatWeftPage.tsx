import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function DoublePieceFlatWeftPage() {
  const [selectedLength, setSelectedLength] = useState('18');
  const [selectedColor, setSelectedColor] = useState('Natural');
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);

  const lengths = ['14', '16', '18', '20', '22', '24', '26', '28', '30'];
  const colors = ['Natural', 'Rubio', 'Castaño', 'Negro', 'Rojo', 'Personalizado'];

  const benefits = [
    {
      title: 'Densidad Ajustable',
      description: 'La estructura de doble pieza permite personalizar la densidad según las necesidades específicas de cada cliente y proyecto.'
    },
    {
      title: 'Colocación Precisa',
      description: 'El perfil plano garantiza una base uniforme para una instalación consistente y profesional en cada aplicación.'
    },
    {
      title: 'Caída Natural',
      description: 'La distribución de trama está diseñada para lograr un movimiento y comportamiento natural del cabello.'
    }
  ];

  const faqs = [
    {
      question: '¿Cuál es la diferencia entre Double Piece Flat Weft y otros métodos?',
      answer: 'El Double Piece Flat Weft se distingue por su estructura de dos piezas independientes que permiten ajustar la densidad de forma granular. A diferencia de otras tramas, ofrece mayor flexibilidad en la personalización sin comprometer la estabilidad de la colocación.'
    },
    {
      question: '¿Para qué tipos de cabello es más adecuado?',
      answer: 'Este método es versátil y funciona bien con diferentes tipos de cabello. La evaluación personalizada es fundamental para determinar si es la mejor opción según la textura, densidad y características específicas del cabello del cliente.'
    },
    {
      question: '¿Cuál es el tiempo de duración de la aplicación?',
      answer: 'La duración depende de varios factores: el cuidado del cabello, la técnica de colocación, el mantenimiento regular y el tipo de cabello del cliente. Una consulta profesional permitirá establecer expectativas realistas para cada caso.'
    },
    {
      question: '¿Cómo se realiza el mantenimiento?',
      answer: 'El mantenimiento incluye cuidados específicos del cabello, revisiones periódicas de la colocación y seguimiento profesional. Proporcionamos instrucciones detalladas de cuidado para garantizar la longevidad y apariencia óptima.'
    }
  ];

  const relatedMethods = [
    { name: 'Hair Weft', link: '/aplicaciones-hair-weft', description: 'Guía completa de métodos de aplicación' },
    { name: 'Flat Weft', link: '/aplicaciones-hair-weft', description: 'Base plana para colocación uniforme' },
    { name: 'Machine Weft', link: '/aplicaciones-hair-weft', description: 'Trama cosida de construcción clásica' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center gap-2 text-sm font-paragraph text-secondary/60">
          <Link to="/" className="hover:text-secondary transition-colors">
            Inicio
          </Link>
          <ChevronRight size={16} />
          <Link to="/aplicaciones-hair-weft" className="hover:text-secondary transition-colors">
            Hair Weft
          </Link>
          <ChevronRight size={16} />
          <span className="text-secondary">Double Piece Flat Weft</span>
        </div>
      </section>

      {/* Hero Section - Two Columns */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Image Column */}
          <div className="flex flex-col gap-6">
            <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-background/20">
              <Image
                src="https://static.wixstatic.com/media/37e681_682396f4cb994c298aea0c305d3710d8~mv2.jpg"
                alt="Double Piece Flat Weft - Trama profesional"
                className="w-full h-full object-cover"
                width={600}
              />
            </div>
            <div className="text-sm font-paragraph text-secondary/60">
              Imagen de catálogo - Double Piece Flat Weft
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col gap-8">
            {/* Title & Description */}
            <div>
              <h1 className="font-heading text-5xl md:text-6xl text-secondary mb-6">
                Double Piece Flat Weft
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-secondary/70 leading-relaxed">
                Trama de doble pieza con construcción plana, diseñada para profesionales que buscan máxima flexibilidad en la personalización de densidad y colocación precisa.
              </p>
            </div>

            {/* Attributes */}
            <div className="border-t border-secondary/10 pt-8">
              <h2 className="font-heading text-2xl text-secondary mb-6">Atributos principales</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-heading text-lg text-secondary mb-1">Doble capa</h3>
                    <p className="font-paragraph text-base text-secondary/60">
                      Estructura de dos piezas independientes que permite ajustar la densidad según necesidades específicas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-heading text-lg text-secondary mb-1">Perfil plano</h3>
                    <p className="font-paragraph text-base text-secondary/60">
                      Base uniforme diseñada para una colocación precisa, consistente y profesional.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-heading text-lg text-secondary mb-1">Distribución de trama</h3>
                    <p className="font-paragraph text-base text-secondary/60">
                      Patrón de tejido optimizado para caída natural y comportamiento del material.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Query Controls */}
            <div className="border-t border-secondary/10 pt-8 space-y-6">
              <h3 className="font-heading text-xl text-secondary">Consulta de especificaciones</h3>
              
              {/* Length Selector */}
              <div>
                <label className="font-paragraph text-base text-secondary/70 block mb-3">
                  Largo (pares): {selectedLength}
                </label>
                <div className="flex flex-wrap gap-2">
                  {lengths.map((length) => (
                    <button
                      key={length}
                      onClick={() => setSelectedLength(length)}
                      className={`px-4 py-2 font-paragraph text-sm rounded transition-all ${
                        selectedLength === length
                          ? 'bg-secondary text-white border border-secondary'
                          : 'bg-background/30 text-secondary border border-secondary/20 hover:border-secondary/50'
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <label className="font-paragraph text-base text-secondary/70 block mb-3">
                  Color: {selectedColor}
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 font-paragraph text-sm rounded transition-all ${
                        selectedColor === color
                          ? 'bg-secondary text-white border border-secondary'
                          : 'bg-background/30 text-secondary border border-secondary/20 hover:border-secondary/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/contact"
                className="flex-1 px-8 py-3 bg-secondary text-white font-paragraph text-base hover:bg-secondary/90 transition-colors rounded text-center"
              >
                Consultar disponibilidad
              </Link>
              <Link
                to="/aplicaciones-hair-weft"
                className="flex-1 px-8 py-3 border-2 border-secondary text-secondary font-paragraph text-base hover:bg-secondary/5 transition-colors rounded text-center"
              >
                Ver otros métodos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-background/10 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-12 text-center">
            Ventajas del Double Piece Flat Weft
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-secondary/10 hover:border-secondary/30 transition-colors">
                <h3 className="font-heading text-2xl text-secondary mb-4">{benefit.title}</h3>
                <p className="font-paragraph text-base text-secondary/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Consultation Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="border-2 border-secondary/20 p-8 md:p-12 rounded-lg bg-white">
          <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-6">
            Evaluación profesional personalizada
          </h2>
          <p className="font-paragraph text-lg text-secondary/70 leading-relaxed mb-6">
            La aplicación y la adecuación del Double Piece Flat Weft se valoran según el cabello de cada cliente y el plan de trabajo específico. Cada proyecto requiere una evaluación personalizada para determinar la mejor opción de integración, técnica de colocación y especificaciones de densidad.
          </p>
          <p className="font-paragraph text-base text-secondary/60">
            Nuestro equipo de profesionales está disponible para asesorarte y encontrar la solución perfecta para tus necesidades.
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-12">
          Preguntas frecuentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-secondary/20 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedAccordion(expandedAccordion === idx ? null : idx)}
                className="w-full px-6 md:px-8 py-4 md:py-6 flex items-center justify-between bg-white hover:bg-background/5 transition-colors"
              >
                <h3 className="font-heading text-lg md:text-xl text-secondary text-left">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={24}
                  className={`text-secondary flex-shrink-0 ml-4 transition-transform ${
                    expandedAccordion === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedAccordion === idx && (
                <div className="px-6 md:px-8 py-4 md:py-6 bg-background/5 border-t border-secondary/20">
                  <p className="font-paragraph text-base md:text-lg text-secondary/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Methods Section */}
      <section className="w-full bg-background/10 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-12">
            Métodos relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedMethods.map((method, idx) => (
              <Link
                key={idx}
                to={method.link}
                className="bg-white p-8 rounded-lg border border-secondary/10 hover:border-secondary/50 hover:shadow-lg transition-all group"
              >
                <h3 className="font-heading text-2xl text-secondary mb-3 group-hover:text-secondary/80 transition-colors">
                  {method.name}
                </h3>
                <p className="font-paragraph text-base text-secondary/70 mb-4">
                  {method.description}
                </p>
                <div className="flex items-center gap-2 text-secondary font-paragraph text-base">
                  Explorar <ChevronRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
