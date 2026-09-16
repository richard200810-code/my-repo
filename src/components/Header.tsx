import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, actions } = useCart();

  return (
    <>
      <header className="w-full bg-white border-b border-background sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="font-heading text-3xl text-primary font-bold">
              Luxe Strands
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="font-paragraph text-secondary hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="font-paragraph text-secondary hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/stores"
              className="font-paragraph text-secondary hover:text-primary transition-colors"
            >
              Stores
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={actions.toggleCart}
              className="relative p-2 hover:bg-background rounded-lg transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6 text-primary" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-background rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-background bg-white">
            <div className="max-w-[100rem] mx-auto px-6 py-4 space-y-4">
              <Link
                to="/"
                className="block font-paragraph text-secondary hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block font-paragraph text-secondary hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/stores"
                className="block font-paragraph text-secondary hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Stores
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Cart Drawer */}
      <Cart />
    </>
  );
}
