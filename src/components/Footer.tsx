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
              <Link to="/stores" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Our Stores
              </Link>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Tape-In
              </a>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Support</h4>
            <nav className="space-y-2">
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Care Guide
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                FAQ
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Shipping Info
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">About</h4>
            <nav className="space-y-2">
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                About Us
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Blog
              </a>
              <a href="#" className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors block">
                Careers
              </a>
            </nav>
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
