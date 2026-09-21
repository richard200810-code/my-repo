import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AcademyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-background to-secondary py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">Academia</h1>
            <p className="font-paragraph text-lg text-secondary max-w-2xl">
              Aprende todo sobre nuestros productos, técnicas de aplicación y guías de color para encontrar la extensión perfecta para ti.
            </p>
          </div>
        </section>

        {/* Color Guide Featured Block */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                  Guía de Color
                </h2>
                <p className="font-paragraph text-lg text-secondary mb-8 leading-relaxed">
                  Descubre nuestra completa guía de colores interactiva. Explora todos los tonos disponibles, visualiza cómo se vería cada color y encuentra la combinación perfecta para tu estilo.
                </p>
                <Link
                  to="/academy/color-ring"
                  className="inline-block bg-primary text-primary-foreground font-paragraph px-8 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  Explorar Guía de Color
                </Link>
              </div>
              
              {/* Visual Element */}
              <div className="bg-background rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="font-paragraph text-secondary">Selector de colores interactivo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl text-primary mb-12 text-center">
              Más Recursos
            </h2>
            <p className="font-paragraph text-lg text-secondary text-center max-w-2xl mx-auto">
              Accede a nuestras guías de aplicación y aprende las mejores técnicas para cada tipo de extensión.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
