import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';

export default function DoublePieceFlatWeftPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center gap-2 text-sm font-paragraph text-secondary/60">
          <Link to="/aplicaciones-hair-weft" className="hover:text-secondary transition-colors">
            Aplicación
          </Link>
          <ChevronRight size={16} />
          <Link to="/aplicaciones-hair-weft" className="hover:text-secondary transition-colors">
            Hair Weft
          </Link>
          <ChevronRight size={16} />
          <span className="text-secondary">Double Piece Flat Weft</span>
        </div>
      </section>

      {/* Main Content Section - Split Layout */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-md h-96 rounded-lg overflow-hidden bg-background/20">
              <Image
                src="https://static.wixstatic.com/media/37e681_682396f4cb994c298aea0c305d3710d8~mv2.jpg"
                alt="Double Piece Flat Weft"
                className="w-full h-full object-cover"
                width={500}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl text-secondary mb-6">
                Double Piece Flat Weft
              </h1>
              <p className="font-paragraph text-base md:text-lg text-secondary/70 leading-relaxed">
                Trama de doble pieza con construcción plana, presentada para evaluar su estructura, caída y posibilidades de integración.
              </p>
            </div>

            {/* Qué observar Section */}
            <div className="border-t border-secondary/10 pt-8">
              <h2 className="font-heading text-2xl text-secondary mb-6">Qué observar</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-2">Doble capa</h3>
                  <p className="font-paragraph text-sm md:text-base text-secondary/60">
                    Estructura de dos piezas que permite ajustar la densidad según necesidades.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-2">Perfil plano</h3>
                  <p className="font-paragraph text-sm md:text-base text-secondary/60">
                    Base uniforme diseñada para una colocación precisa y consistente.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-secondary mb-2">Distribución en la trama</h3>
                  <p className="font-paragraph text-sm md:text-base text-secondary/60">
                    Patrón de tejido que determina la caída y el comportamiento del material.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para consulta profesional Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="border border-secondary/10 p-8 md:p-12 rounded-lg bg-background/5">
          <h2 className="font-heading text-2xl md:text-3xl text-secondary mb-4">
            Para consulta profesional
          </h2>
          <p className="font-paragraph text-base md:text-lg text-secondary/70 leading-relaxed">
            La aplicación y la adecuación se valoran según el cabello de cada cliente y el plan de trabajo. Cada proyecto requiere una evaluación personalizada para determinar la mejor opción de integración y técnica de colocación.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-12 md:py-20">
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
