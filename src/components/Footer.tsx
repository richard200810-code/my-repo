import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl text-secondary-foreground">
              Luxe Hair
            </h3>
            <p className="font-paragraph text-base text-secondary-foreground/80 leading-relaxed">
              Extensiones de cabello premium y pelucas elaboradas para quienes aprecian la calidad y la elegancia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-secondary-foreground">
              Enlaces Rápidos
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/products"
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Productos
              </Link>
              <Link
                to="/tools-accessories"
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Herramientas y Accesorios
              </Link>
              <Link
                to="/academy"
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Academia
              </Link>
              <Link
                to="/contact"
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-secondary-foreground">
              Ponte en Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary-foreground/80 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground/80">richard200810@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary-foreground/80 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground/80">+52 (55) 3955 5886</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary-foreground/80 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground/80">Polanco CDMX Mexico</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 pt-8">
          <p className="font-paragraph text-sm text-secondary-foreground/60 text-center">
            © {new Date().getFullYear()} Luxe Hair. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
