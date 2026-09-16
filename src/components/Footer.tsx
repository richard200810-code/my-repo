import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground mt-20">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">Luxe Strands</h3>
            <p className="font-paragraph text-primary-foreground/80">
              Premium hair extensions for every style and occasion
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Shop</h4>
            <nav className="space-y-2">
              <Link to="/products" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                All Products
              </Link>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Tape-In
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                K-Tip
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Clip-In
              </a>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Support</h4>
            <nav className="space-y-2">
              <Link to="/contact" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Contact Us
              </Link>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Care Guide
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                FAQ
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:hello@luxestrands.com" className="flex items-center gap-2 font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                hello@luxestrands.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-primary-foreground/70 text-sm">
              © 2026 Luxe Strands. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
