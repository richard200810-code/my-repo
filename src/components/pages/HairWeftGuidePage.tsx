import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const methods = [
  { name: 'Genius Weft', description: 'Trama ultrafina para una integración flexible' },
  { name: 'Hand Tied Weft', description: 'Trama ligera pensada para una instalación por filas' },
  { name: 'Flat Weft', description: 'Base plana para una colocación uniforme' },
  { name: 'Double Piece Flat Weft', description: 'Dos piezas planas para ajustar la densidad' },
  { name: 'Machine Weft', description: 'Trama cosida de construcción clásica' },
  { name: 'Volume Weft', description: 'Trama orientada a añadir volumen' },
  { name: 'Genius Weft with Hole', description: 'Variante con orificios de apoyo para la instalación' },
  { name: 'Genius UP with Hole', description: 'Variante UP con orificios para instalación' },
  { name: 'Halo', description: 'Sistema de colocación envolvente' },
  { name: 'Ponytail', description: 'Pieza para coleta' },
  { name: 'Volume G Weft', description: 'Trama de volumen mejorado' },
  { name: 'Mini Volume Weft', description: 'Versión compacta de trama volumétrica' },
  { name: 'XO Weft', description: 'Trama con patrón de tejido especial' },
];

export default function HairWeftGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
          <Image
            src="https://static.wixstatic.com/media/37e681_e204cfdb4c40460aa83e44753600e5c4~mv2.jpg"
            alt="Hair Weft: guía de aplicación"
            className="w-full h-full object-cover"
            width={1600}
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 md:p-12">
            <h1 className="font-heading text-5xl md:text-6xl text-white mb-4">Hair Weft: guía de aplicación</h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl">
              Métodos de trama diseñados para crear densidad, longitud y una colocación personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* Detail Image Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg">
          <Image
            src="https://static.wixstatic.com/media/37e681_b28df5a0c2e94fa795798b658a2360d0~mv2.jpg"
            alt="Detalle Hair Weft"
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

      {/* Hair Bulk / Personalización Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="border border-secondary/20 p-8 md:p-12 rounded-lg">
          <h3 className="font-heading text-3xl md:text-4xl text-secondary mb-4">Hair Bulk / Personalización</h3>
          <p className="font-paragraph text-base md:text-lg text-secondary/70">
            Material disponible para proyectos personalizados. Consulta con nuestro equipo para conocer opciones de personalización y adaptación a tus necesidades específicas.
          </p>
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
