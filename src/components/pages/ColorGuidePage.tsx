import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ColorRing from '@/components/ColorRing';
import { ChevronRight } from 'lucide-react';

export default function ColorGuidePage() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center gap-2 text-xs md:text-sm font-paragraph text-secondary/50 uppercase tracking-wide">
          <Link to="/" className="hover:text-secondary/70 transition-colors">
            Inicio
          </Link>
          <span className="text-secondary/30">/</span>
          <Link to="/aplicaciones-hair-weft" className="hover:text-secondary/70 transition-colors">
            Academia
          </Link>
          <span className="text-secondary/30">/</span>
          <span className="text-secondary/60">Guía de Color</span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-32">
        <div className="max-w-3xl">
          <div className="text-xs md:text-sm font-paragraph text-secondary/60 uppercase tracking-widest mb-6">
            Academia · Guía profesional
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-secondary mb-8 leading-tight">
            Guía de Color LUX Hair
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-secondary/70 leading-relaxed mb-8">
            Referencia visual profesional de tonos disponibles. Utiliza esta guía como herramienta de consulta para seleccionar los tonos más adecuados según el tipo de cabello y objetivos de aplicación.
          </p>
          <p className="font-paragraph text-sm text-secondary/60 italic border-l-4 border-secondary/30 pl-4">
            La visualización es una referencia. Confirma el tono final con una evaluación profesional.
          </p>
        </div>
      </section>

      {/* Color Ring Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
            Selector de tonos
          </h2>
          <p className="font-paragraph text-base text-secondary/70">
            Filtra por familia de color y tipo para encontrar el tono que necesitas. Selecciona cualquier código para ver más detalles.
          </p>
        </div>
        <ColorRing onSelect={setSelectedCode} selectedCode={selectedCode} />
      </section>

      {/* Information Section */}
      <section className="w-full bg-secondary/5 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-12">
            Familias de color
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-secondary/10">
              <h3 className="font-heading text-xl text-secondary mb-4">Virgin Hair</h3>
              <p className="font-paragraph text-base text-secondary/70 mb-4">
                Cabello virgen sin procesar. Tonos naturales desde negro profundo hasta rubio platino blanco, incluyendo variantes especiales como rojos y tonos creativos.
              </p>
              <p className="font-paragraph text-sm text-secondary/60">
                Códigos: 1, 1B, 2, 3A, 4, 5, 6, 8, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 60, 60A, 613, 99J
              </p>
            </div>

            <div className="bg-white p-8 border border-secondary/10">
              <h3 className="font-heading text-xl text-secondary mb-4">Remy Hair</h3>
              <p className="font-paragraph text-base text-secondary/70 mb-4">
                Mezclas de tonos para crear efectos naturales y dimensionales. Combinaciones de dos o tres tonos para mayor versatilidad en aplicación.
              </p>
              <p className="font-paragraph text-sm text-secondary/60">
                Códigos: 2/4, 2/5, 1B/2, 1B/4, 4/6, 4/8, 4/27, 6/24, 7/20, 8/10, 8/22, 9/613, 613/24, 18/613, 18A/613A, DXB, DXB/18
              </p>
            </div>

            <div className="bg-white p-8 border border-secondary/10">
              <h3 className="font-heading text-xl text-secondary mb-4">Rooted & Mezclas</h3>
              <p className="font-paragraph text-base text-secondary/70 mb-4">
                Cabello con raíz natural. Diseñado para un look más realista con contraste entre raíz y largo, incluyendo opciones plateadas.
              </p>
              <p className="font-paragraph text-sm text-secondary/60">
                Códigos: R1B-4, R2-6/27, R2-4/6, R2-DXB/18, R2-6/24, R2-8/10, R2-60A, Rooted Silver Ash, R5-7/20, R5-8/22, R5-9/613, R5-18A/613A, R8-18/22, R8-18/613
              </p>
            </div>

            <div className="bg-white p-8 border border-secondary/10">
              <h3 className="font-heading text-xl text-secondary mb-4">Ombre / Piano / Balayage</h3>
              <p className="font-paragraph text-base text-secondary/70 mb-4">
                Efectos especiales de color. Degradados, mechas destacadas y barridos naturales para looks más dinámicos y personalizados.
              </p>
              <p className="font-paragraph text-sm text-secondary/60">
                Tipos: Ombre, Piano/Highlight, Balayage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Notes Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-12">
          Notas profesionales
        </h2>
        <div className="space-y-6">
          <div className="border-l-4 border-secondary/30 pl-6">
            <h3 className="font-heading text-lg text-secondary mb-2">Evaluación previa</h3>
            <p className="font-paragraph text-base text-secondary/70">
              Cada aplicación requiere una evaluación profesional previa del cabello del cliente. El tono final puede variar según la textura, porosidad y condición actual del cabello.
            </p>
          </div>

          <div className="border-l-4 border-secondary/30 pl-6">
            <h3 className="font-heading text-lg text-secondary mb-2">Disponibilidad</h3>
            <p className="font-paragraph text-base text-secondary/70">
              No todos los tonos están disponibles para todos los productos. Consulta con nuestro equipo para confirmar disponibilidad según tu aplicación específica.
            </p>
          </div>

          <div className="border-l-4 border-secondary/30 pl-6">
            <h3 className="font-heading text-lg text-secondary mb-2">Cuidado del color</h3>
            <p className="font-paragraph text-base text-secondary/70">
              El mantenimiento adecuado es esencial para preservar la calidad y apariencia del color. Recomendamos productos específicos y rutinas de cuidado profesional.
            </p>
          </div>

          <div className="border-l-4 border-secondary/30 pl-6">
            <h3 className="font-heading text-lg text-secondary mb-2">Personalización</h3>
            <p className="font-paragraph text-base text-secondary/70">
              Ofrecemos opciones de personalización para tonos específicos. Contacta con nuestro equipo para explorar posibilidades de mezclas o tonos personalizados.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-secondary/5 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="bg-white p-8 md:p-12 border border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl text-secondary mb-3">
                ¿Necesitas asesoramiento personalizado?
              </h3>
              <p className="font-paragraph text-base text-secondary/70">
                Nuestro equipo de especialistas está disponible para ayudarte a seleccionar el tono perfecto para tu aplicación.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 px-8 py-4 bg-secondary text-white font-paragraph text-base hover:bg-secondary/90 transition-colors text-center uppercase tracking-wide whitespace-nowrap"
            >
              Consultar color
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
