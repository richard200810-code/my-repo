import { useState } from 'react';
import { User, LogOut, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';

export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { member, isAuthenticated, isLoading, actions } = useMember();

  const handleLogout = async () => {
    await actions.logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Account Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:opacity-70 transition-opacity"
        aria-label="Mi cuenta"
        title="Mi cuenta"
      >
        <User className="w-6 h-6 text-primary" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-background border border-primary/20 shadow-lg z-50"
            >
              {isLoading ? (
                <div className="px-4 py-6 text-center">
                  <p className="font-paragraph text-sm text-primary/60">Cargando...</p>
                </div>
              ) : isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="px-4 py-4 border-b border-primary/10">
                    <p className="font-paragraph text-sm text-primary font-semibold truncate">
                      {member?.profile?.nickname || member?.contact?.firstName || 'Mi Cuenta'}
                    </p>
                    <p className="font-paragraph text-xs text-primary/60 truncate">
                      {member?.loginEmail}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 font-paragraph text-sm text-primary hover:bg-primary/5 transition-colors border-b border-primary/10"
                  >
                    Mi Perfil
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 font-paragraph text-sm text-primary hover:bg-primary/5 transition-colors border-b border-primary/10"
                  >
                    Mis Pedidos
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 font-paragraph text-sm text-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  {/* Login */}
                  <button
                    onClick={() => {
                      actions.login();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 font-paragraph text-sm text-primary hover:bg-primary/5 transition-colors flex items-center gap-2 border-b border-primary/10"
                  >
                    <LogIn className="w-4 h-4" />
                    Iniciar Sesión
                  </button>

                  {/* Register */}
                  <button
                    onClick={() => {
                      actions.login();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 font-paragraph text-sm text-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Registrarse
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
