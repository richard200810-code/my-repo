import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, actions } = useCart();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: "Compra", path: '/stores' },
    { name: 'Productos', path: '/products' },
    { name: 'Herramientas y Accesorios', path: '/tools-accessories' },
    { name: 'Academia', path: '/academy' },
    { name: 'Contacto', path: '/contact' }
  ];

  return (
    <>
      <header className="w-full bg-background border-b border-primary/10 sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="font-heading text-2xl md:text-3xl text-primary">Lux Hair</Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Cart Icon */}
            <div className="flex items-center gap-4">
              <button
                onClick={actions.toggleCart}
                className="relative p-2 hover:opacity-70 transition-opacity"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="w-6 h-6 text-primary" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-paragraph w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
                aria-label="Alternar menú"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-primary" />
                ) : (
                  <Menu className="w-6 h-6 text-primary" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-6 pb-4 space-y-4 border-t border-primary/10 pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-paragraph text-base text-primary hover:opacity-70 transition-opacity"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <Cart />
    </>
  );
}
