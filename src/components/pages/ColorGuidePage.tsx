import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HairColorSelector from '@/components/HairColorSelector';
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
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="text-xs md:text-sm font-paragraph text-secondary/60 uppercase tracking-widest mb-6">
            Academia · Guía profesional
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-secondary mb-6 leading-tight">
            Guía de Color LUX Hair
          </h1>
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
        </div>
        <HairColorSelector onSelect={setSelectedCode} selectedCode={selectedCode} />
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
            </div>

            <div className="bg-white p-8 border border-secondary/10">
              <h3 className="font-heading text-xl text-secondary mb-4">Remy Hair</h3>
              <p className="font-paragraph text-base text-secondary/70 mb-4">
                Mezclas de tonos para crear efectos naturales y dimensionales. Combinaciones de dos o tres tonos para mayor versatilidad en aplicación.
              </p>
            </div>

            <div className="bg-white p-8 border border-secondary/10">
              <h3 className="font-heading text-xl text-secondary mb-4">Rooted & Mezclas</h3>
              <p className="font-paragraph text-base text-secondary/70 mb-4">
                Cabello con raíz natural. Diseñado para un look más realista con contraste entre raíz y largo, incluyendo opciones plateadas.
              </p>
            </div>
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
