import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMember } from '@/integrations';

interface AccountPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountPanel({ isOpen, onClose }: AccountPanelProps) {
  const { member, isAuthenticated, isLoading, actions } = useMember();

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-primary/50 z-50"
          />

          {/* Account Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <h2 className="font-heading text-2xl text-primary">Mi Cuenta</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="Cerrar panel"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              {isLoading ? (
                <div className="text-center">
                  <p className="font-paragraph text-base text-primary/60">Cargando...</p>
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-6">
                  <div>
                    <p className="font-paragraph text-sm text-primary/60 mb-2">Bienvenido</p>
                    <h3 className="font-heading text-xl text-primary">
                      {member?.profile?.nickname || member?.contact?.firstName || member?.loginEmail}
                    </h3>
                  </div>

                  {member?.loginEmail && (
                    <div>
                      <p className="font-paragraph text-sm text-primary/60 mb-1">Correo</p>
                      <p className="font-paragraph text-base text-primary">{member.loginEmail}</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      actions.logout();
                      handleClose();
                    }}
                    className="w-full px-6 py-3 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-paragraph text-base text-primary text-center mb-6">
                    Inicia sesión o crea una cuenta para acceder a tu perfil
                  </p>

                  <button
                    onClick={() => {
                      actions.login();
                      handleClose();
                    }}
                    className="w-full px-6 py-3 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Iniciar sesión
                  </button>

                  <button
                    onClick={() => {
                      actions.login();
                      handleClose();
                    }}
                    className="w-full px-6 py-3 border-2 border-buttonborder bg-white text-primary font-paragraph text-base hover:bg-buttonbackground transition-all duration-300"
                  >
                    Registrarse
                  </button>

                  <p className="font-paragraph text-xs text-primary/60 text-center mt-6">
                    Serás redirigido al flujo de autenticación de Wix
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
