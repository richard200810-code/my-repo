import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const methods = [
  { name: 'Tape In', description: 'Piezas adhesivas estándar para integración plana' },
  { name: 'Mini Tape In', description: 'Versión compacta de piezas adhesivas' },
  { name: 'Seamless Tape In', description: 'Base discreta para acabado uniforme' },
  { name: 'Invisible Tape In', description: 'Piezas adhesivas de perfil bajo' },
  { name: 'PU Invisible with Hole', description: 'Base PU con orificios de apoyo' },
  { name: 'PU with Hole', description: 'Base PU con orificios para instalación' },
  { name: 'Long Invisible Tape In', description: 'Piezas adhesivas invisibles de mayor largo' },
  { name: 'Long Tape In', description: 'Piezas adhesivas de largo extendido' },
  { name: 'Stitched Tape In', description: 'Piezas adhesivas cosidas para mayor durabilidad' },
  { name: 'Semi Invisible Tape', description: 'Piezas adhesivas de perfil semi-discreto' },
  { name: 'G-Tape', description: 'Variante de piezas adhesivas especializadas' },
  { name: 'Thread Tape In', description: 'Piezas adhesivas con refuerzo de hilo' },
  { name: 'Twin Tabs', description: 'Piezas adhesivas con doble pestaña' },
];

export default function TapeInGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
          <Image
            src="https://static.wixstatic.com/media/37e681_85d1a632ed5941e5a375c55b9353ffcd~mv2.jpg"
            alt="Tape In: guía de aplicación"
            className="w-full h-full object-cover"
            width={1600}
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 md:p-12">
            <h1 className="font-heading text-5xl md:text-6xl text-white mb-4">Tape In: guía de aplicación</h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl">
              Piezas adhesivas para una integración plana, ligera y discreta, con variantes para distintos acabados.
            </p>
          </div>
        </div>
      </section>

      {/* Detail Image Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg">
          <Image
            src="https://static.wixstatic.com/media/37e681_5adb2afb866840c98ced564cf47dc934~mv2.jpg"
            alt="Detalle Tape In"
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
