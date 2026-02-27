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
              Premium hair extensions and wigs crafted for those who appreciate quality and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-secondary-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Products
              </Link>
              <Link
                to="/contact"
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-secondary-foreground">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary-foreground/80 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground/80">
                  info@luxehair.com
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary-foreground/80 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground/80">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary-foreground/80 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground/80">
                  123 Beauty Avenue, Style City
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 pt-8">
          <p className="font-paragraph text-sm text-secondary-foreground/60 text-center">
            © {new Date().getFullYear()} Luxe Hair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
