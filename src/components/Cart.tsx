import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-primary/50 z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <h2 className="font-heading text-2xl text-primary">Tu Carrito</h2>
              <button
                onClick={actions.closeCart}
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="Cerrar carrito"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <ShoppingBag className="w-16 h-16 text-primary/30" />
                  <p className="font-paragraph text-base text-primary/60">
                    Tu carrito está vacío
                  </p>
                  <button
                    onClick={actions.closeCart}
                    className="px-6 py-2 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <a href="/products" className="no-underline">Seguir comprando</a>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-primary/10 last:border-0"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.image || 'https://static.wixstatic.com/media/37e681_a48afad839744c988f7a220f9aeb611a~mv2.png?originWidth=128&originHeight=128'}
                          alt={item.name}
                          width={96}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-2">
                        <h3 className="font-paragraph text-base text-primary font-semibold">
                          {item.name}
                        </h3>
                        <p className="font-paragraph text-sm text-primary">
                          {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => actions.updateQuantity(item, item.quantity - 1)}
                            className="p-1 border border-buttonborder hover:bg-buttonbackground transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-primary" />
                          </button>
                          <span className="font-paragraph text-sm text-primary w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                            className="p-1 border border-buttonborder hover:bg-buttonbackground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-primary" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => actions.removeFromCart(item)}
                        className="p-2 hover:opacity-70 transition-opacity self-start"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5 text-primary" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary/10 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl text-primary">Subtotal</span>
                  <span className="font-heading text-xl text-primary">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* View Cart and Checkout Buttons */}
                <div className="space-y-3">
                  <a
                    href="/products"
                    onClick={actions.closeCart}
                    className="block w-full px-6 py-3 border-2 border-buttonborder bg-white text-primary font-paragraph text-base hover:bg-buttonbackground transition-all duration-300 text-center no-underline"
                  >
                    Ver carrito
                  </a>
                  <button
                    onClick={actions.checkout}
                    disabled={isCheckingOut}
                    className="w-full px-6 py-4 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? 'Procesando...' : 'Finalizar compra'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
