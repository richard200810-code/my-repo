import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground mt-20">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">Luxe Strands</h3>
            <p className="font-paragraph text-primary-foreground/80">
              Extensiones de cabello premium para cada estilo y ocasión
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Tienda</h4>
            <nav className="space-y-2">
              <Link to="/products" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Todos los Productos
              </Link>
              <Link to="/stores" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Nuestras Tiendas
              </Link>
              <Link to="/products" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Tape-In
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Soporte</h4>
            <nav className="space-y-2">
              <Link to="/products" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Guía de Cuidado
              </Link>
              <Link to="/products" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Preguntas Frecuentes
              </Link>
              <Link to="/contact" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Información de Envío
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Acerca de</h4>
            <nav className="space-y-2">
              <Link to="/" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Sobre Nosotros
              </Link>
              <Link to="/products" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Blog
              </Link>
              <Link to="/contact" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Carreras
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-primary-foreground/70 text-sm">
              © 2026 Luxe Strands. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/" className="font-paragraph text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Política de Privacidad
              </Link>
              <Link to="/" className="font-paragraph text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Términos de Servicio
              </Link>
              <Link to="/contact" className="font-paragraph text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Información de Envío
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
