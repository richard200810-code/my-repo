import AccountPanel from '@/components/AccountPanel';
import Cart from '@/components/Cart';
import SearchPanel from '@/components/SearchPanel';
import { Image } from '@/components/ui/image';
import { useCart } from '@/integrations';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { itemCount, actions } = useCart();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Compra', path: '/stores' },
    { name: 'Productos', path: '/products' },
    { name: 'Herramientas y Accesorios', path: '/tools-accessories' },
    { name: 'Academia', path: '/academy' },
    { name: 'Contacto', path: '/contact' },
  ];

  const openSearch = () => {
    setMobileMenuOpen(false);
    setSearchOpen(true);
  };

  const openAccount = () => {
    setMobileMenuOpen(false);
    setAccountOpen(true);
  };

  const openCart = () => {
    setMobileMenuOpen(false);
    actions.toggleCart();
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full overflow-x-clip border-b"
        style={{
          backgroundColor: '#F5F1EA',
          borderBottomColor: 'rgba(139, 115, 85, 0.22)',
        }}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center px-5 py-3 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center" aria-label="LUX HAIR Inicio">
            <Image src="https://static.wixstatic.com/media/37e681_2c43341cdb5745e8bd16dcd9cda34679~mv2.png" alt="LUX HAIR — YOUR HAIR" style={{
                width: 'clamp(165px, 16vw, 210px)',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                flexShrink: 0,
              }} />
          </Link>

          <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="whitespace-nowrap font-paragraph text-[15px] text-primary transition-opacity hover:opacity-65"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="ml-6 hidden shrink-0 items-center gap-2 lg:flex">
            <button onClick={() => setSearchOpen(true)} className="p-2 transition-opacity hover:opacity-65" aria-label="Buscar">
              <Search className="h-5 w-5 text-primary" />
            </button>
            <button onClick={() => setAccountOpen(true)} className="p-2 transition-opacity hover:opacity-65" aria-label="Mi cuenta">
              <User className="h-5 w-5 text-primary" />
            </button>
            <button onClick={actions.toggleCart} className="relative p-2 transition-opacity hover:opacity-65" aria-label="Carrito de compras">
              <ShoppingCart className="h-5 w-5 text-primary" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-paragraph text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center text-primary lg:hidden"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t lg:hidden" style={{ borderTopColor: 'rgba(139, 115, 85, 0.18)' }}>
            <nav className="mx-auto flex w-full max-w-[1280px] flex-col gap-1 px-5 py-4 sm:px-8" aria-label="Navegación móvil">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 font-paragraph text-base text-primary transition-opacity hover:opacity-65"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t pt-3" style={{ borderTopColor: 'rgba(139, 115, 85, 0.18)' }}>
                <button onClick={openSearch} className="flex items-center gap-2 p-2 font-paragraph text-sm text-primary" aria-label="Buscar">
                  <Search className="h-5 w-5" /> Buscar
                </button>
                <button onClick={openAccount} className="flex items-center gap-2 p-2 font-paragraph text-sm text-primary" aria-label="Mi cuenta">
                  <User className="h-5 w-5" /> Cuenta
                </button>
                <button onClick={openCart} className="relative flex items-center gap-2 p-2 font-paragraph text-sm text-primary" aria-label="Carrito de compras">
                  <ShoppingCart className="h-5 w-5" /> Carrito
                  {itemCount > 0 && <span className="font-paragraph text-xs">({itemCount})</span>}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AccountPanel isOpen={accountOpen} onClose={() => setAccountOpen(false)} />
      <Cart />
    </>
  );
}
