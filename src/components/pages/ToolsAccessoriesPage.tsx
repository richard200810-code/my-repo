import { Link } from 'react-router-dom';
import { ChevronRight, Wrench, Zap, Scissors, Droplet, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const toolCategories = [
  {
    id: 'installation-prep',
    title: 'Preparación de Instalación',
    description: 'Herramientas esenciales para preparar el cabello y organizar las extensiones antes de la aplicación.',
    tools: [
      'Peine de secciones',
      'Pinzas de cocodrilo',
      'Soportes para mechones',
      'Clips de organización'
    ],
    icon: '🔧'
  },
  {
    id: 'tape-in',
    title: 'Tape-In',
    description: 'Herramientas especializadas para aplicar y mantener extensiones adhesivas con precisión.',
    tools: [
      'Adhesivos y reemplazos de cinta',
      'Herramientas de compresión',
      'Removedor de adhesivo',
      'Aplicadores de precisión'
    ],
    icon: '📌'
  },
  {
    id: 'weft-sewing',
    title: 'Weft / Costura',
    description: 'Equipos para coser y asegurar extensiones con método de costura tradicional.',
    tools: [
      'Agujas curvas',
      'Hilo de calidad profesional',
      'Microanillos',
      'Enhebrador de anillos',
      'Pinzas de apertura/cierre'
    ],
    icon: '🧵'
  },
  {
    id: 'i-tip-flat-tip',
    title: 'I-Tip / Flat-Tip',
    description: 'Herramientas para aplicar extensiones con punta individual o plana.',
    tools: [
      'Microanillos',
      'Enhebrador de anillos',
      'Pinzas de apertura/cierre',
      'Aplicadores de precisión'
    ],
    icon: '💎'
  },
  {
    id: 'k-tip-keratin',
    title: 'K-Tip / Queratina',
    description: 'Equipos especializados para fusión por calor y aplicación de queratina.',
    tools: [
      'Pinzas de fusión por calor',
      'Láminas aislantes',
      'Removedor de queratina',
      'Herramientas de separación'
    ],
    icon: '🔥'
  },
  {
    id: 'clip-in',
    title: 'Clip-In',
    description: 'Accesorios y herramientas para extensiones removibles con clips.',
    tools: [
      'Clips de reemplazo',
      'Organizadores de clips',
      'Peine especializado',
      'Accesorios de fijación'
    ],
    icon: '📎'
  },
  {
    id: 'care-maintenance',
    title: 'Cuidado y Mantenimiento',
    description: 'Productos y herramientas para mantener las extensiones en óptimas condiciones.',
    tools: [
      'Peine especializado para extensiones',
      'Estantes de almacenamiento',
      'Productos de cuidado profesional',
      'Acondicionadores especializados'
    ],
    icon: '🧴'
  },
  {
    id: 'color-consultation',
    title: 'Anillo de Color y Consulta',
    description: 'Acceso a nuestro anillo de color profesional y consultas personalizadas.',
    tools: [
      'Anillo de color completo',
      'Consulta de tonos',
      'Asesoramiento personalizado',
      'Muestras de textura'
    ],
    icon: '🎨',
    link: '/academy/color-ring'
  }
];

const applicationMethods = [
  {
    name: 'Tape-In',
    description: 'Piezas adhesivas para integración plana y discreta'
  },
  {
    name: 'Weft / Costura',
    description: 'Método tradicional de costura para máxima durabilidad'
  },
  {
    name: 'I-Tip / Flat-Tip',
    description: 'Puntas individuales para aplicación precisa'
  },
  {
    name: 'K-Tip / Queratina',
    description: 'Fusión por calor para acabado natural'
  },
  {
    name: 'Clip-In',
    description: 'Extensiones removibles para versatilidad'
  }
];

const processStages = [
  {
    stage: 'Instalación',
    description: 'Preparación, secciones, aplicación de extensiones con herramientas especializadas',
    tools: 'Peines, pinzas, adhesivos, agujas, microanillos'
  },
  {
    stage: 'Mantenimiento',
    description: 'Cuidado regular, peinado, acondicionamiento para prolongar la vida útil',
    tools: 'Peines especializados, productos de cuidado, acondicionadores'
  },
  {
    stage: 'Remoción',
    description: 'Desmontaje seguro sin dañar el cabello natural',
    tools: 'Removedores de adhesivo, pinzas, herramientas de separación'
  }
];

const faqItems = [
  {
    question: '¿Qué herramientas necesito para cada técnica?',
    answer: 'Cada técnica requiere herramientas específicas. Tape-In necesita adhesivos y compresores; Weft requiere agujas y hilo; I-Tip/Flat-Tip usan microanillos; K-Tip necesita pinzas de fusión. Consulta con nuestro equipo para recomendaciones personalizadas.'
  },
  {
    question: '¿Cómo elijo el kit de herramientas adecuado?',
    answer: 'La elección depende de tu técnica de aplicación preferida y experiencia. Ofrecemos kits básicos para principiantes y kits profesionales completos. Contáctanos para una consulta personalizada.'
  },
  {
    question: '¿Cómo debo cuidar mis herramientas?',
    answer: 'Limpia regularmente con agua tibia y jabón suave. Guarda en un lugar seco. Revisa pinzas y cuchillas periódicamente. Las herramientas bien mantenidas duran años.'
  },
  {
    question: '¿Cómo confirmo disponibilidad de productos?',
    answer: 'Contáctanos directamente a través del formulario de consulta. Nuestro equipo verificará disponibilidad y te proporcionará opciones de envío.'
  }
];

export default function ToolsAccessoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary">
              Herramientas y accesorios para extensiones
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-primary/80 max-w-3xl leading-relaxed">
              Todo lo que necesitas para instalar, mantener y cuidar tus extensiones de cabello con profesionalismo. Herramientas de calidad para cada técnica de aplicación.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Access by Method */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12">
          Encuentra herramientas por método
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {applicationMethods.map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="border border-primary/20 rounded-lg p-6 hover:border-primary/50 hover:bg-background/30 transition-all cursor-pointer"
            >
              <h3 className="font-heading text-lg text-primary mb-2">{method.name}</h3>
              <p className="font-paragraph text-sm text-primary/70">{method.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12">
          Categorías de herramientas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="border border-primary/20 rounded-lg p-8 hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-heading text-2xl text-primary mb-3">{category.title}</h3>
              <p className="font-paragraph text-sm text-primary/70 mb-6 leading-relaxed">
                {category.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {category.tools.map((tool, toolIdx) => (
                  <div key={toolIdx} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary/50 mt-0.5 flex-shrink-0" />
                    <span className="font-paragraph text-sm text-primary/80">{tool}</span>
                  </div>
                ))}
              </div>

              {category.link ? (
                <Link
                  to={category.link}
                  className="inline-flex items-center justify-center w-full font-paragraph text-base px-6 py-3 border border-primary bg-white text-primary hover:bg-primary hover:text-white transition-colors rounded"
                >
                  Ver anillo de color
                </Link>
              ) : (
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full font-paragraph text-base px-6 py-3 border border-primary bg-white text-primary hover:bg-primary hover:text-white transition-colors rounded group-hover:bg-primary group-hover:text-white"
                >
                  Consultar disponibilidad
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Stages */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12">
            Tres etapas del proceso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processStages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading text-xl">
                    {idx + 1}
                  </div>
                  <h3 className="font-heading text-2xl text-primary">{stage.stage}</h3>
                </div>
                <p className="font-paragraph text-base text-primary/80 leading-relaxed">
                  {stage.description}
                </p>
                <div className="pt-4 border-t border-primary/20">
                  <p className="font-paragraph text-sm text-primary/70">
                    <span className="font-semibold">Herramientas clave:</span> {stage.tools}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-12">
          Preguntas frecuentes
        </h2>
        <div className="space-y-6">
          {faqItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-heading text-lg text-primary mb-3">{item.question}</h3>
                  <p className="font-paragraph text-base text-primary/80 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary text-white py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="font-heading text-4xl md:text-5xl">
              ¿Necesitas asesoramiento personalizado?
            </h2>
            <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto">
              Nuestro equipo de expertos está disponible para ayudarte a elegir las herramientas adecuadas para tu técnica y necesidades específicas.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center font-paragraph text-lg px-10 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors rounded"
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
