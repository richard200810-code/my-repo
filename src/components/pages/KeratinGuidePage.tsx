import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const methods = [
  { name: 'I-Tip', description: 'Punta individual para aplicación precisa' },
  { name: 'Nano-Tip', description: 'Punta reducida para un perfil discreto' },
  { name: 'K-Tip', description: 'Unión de queratina para fijación segura' },
  { name: 'U-Tip', description: 'Punta en forma de U para instalación versátil' },
  { name: 'Plastic Nano Tip', description: 'Punta nano de plástico para aplicación ligera' },
  { name: 'V-Tip', description: 'Punta en forma de V para distribución personalizada' },
  { name: 'Y-Tip', description: 'Punta en forma de Y para fijación flexible' },
  { name: 'Feather Flex Tip', description: 'Punta flexible para mayor comodidad' },
  { name: 'Flex Tip', description: 'Punta adaptable para diferentes texturas' },
  { name: 'Micro Ring', description: 'Sistema de micro anillo para fijación mecánica' },
  { name: 'Flat Tip', description: 'Punta plana para integración uniforme' },
];

export default function KeratinGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
          <Image
            src="https://static.wixstatic.com/media/37e681_73d64960762c4bd7a223d4cde84fa6c2~mv2.jpg"
            alt="Keratin Hair Extension: guía de aplicación"
            className="w-full h-full object-cover"
            width={1600}
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 md:p-12">
            <h1 className="font-heading text-5xl md:text-6xl text-white mb-4">Keratin Hair Extension: guía de aplicación</h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl">
              Métodos de unión por mechón para una instalación precisa y una distribución personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* Detail Image Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg">
          <Image
            src="https://static.wixstatic.com/media/37e681_ced18757330d462281a34a41bdbc98fb~mv2.jpg"
            alt="Detalle Keratin"
            className="w-full h-full object-cover"
            width={1600}
          />
        </div>
      </section>

      {/* Methods Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="font-heading text-4xl md:text-5xl mb-12 text-secondary">Métodos de aplicación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methods.map((method, idx) => (
            <div key={idx} className="border border-secondary/20 p-6 rounded-lg hover:border-secondary/50 transition-colors">
              <h3 className="font-heading text-xl md:text-2xl text-secondary mb-3">{method.name}</h3>
              <p className="font-paragraph text-base text-secondary/70">{method.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex justify-center">
          <Link
            to="/contact"
            className="font-paragraph text-base md:text-lg px-8 py-3 border border-secondary bg-white text-secondary hover:bg-secondary hover:text-white transition-colors rounded"
          >
            Consultar disponibilidad
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
