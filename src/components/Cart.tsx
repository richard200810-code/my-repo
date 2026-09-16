import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Image } from '@/components/ui/image';

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
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-background">
              <h2 className="font-heading text-2xl text-primary">Shopping Cart</h2>
              <button
                onClick={actions.closeCart}
                className="p-2 hover:bg-background rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-paragraph text-lg text-secondary/70 mb-4">
                    Your cart is empty
                  </p>
                  <button
                    onClick={actions.closeCart}
                    className="px-6 py-2 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.collectionId}-${item.itemId}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 bg-background/20 rounded-lg p-4"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 bg-background rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || 'https://static.wixstatic.com/media/37e681_c6824889254146b5b09a3f7b996ab766~mv2.png?originWidth=128&originHeight=128'}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-paragraph font-semibold text-primary text-sm">
                          {item.name}
                        </h3>
                        <p className="font-paragraph text-xs text-secondary/60 mt-1">
                          {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-background rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 text-secondary" />
                        </button>
                        <span className="font-paragraph text-xs font-semibold text-primary w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                          className="p-1 hover:bg-background rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 text-secondary" />
                        </button>
                        <button
                          onClick={() => actions.removeFromCart(item)}
                          className="ml-auto p-1 hover:bg-destructive/10 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-background p-6 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-paragraph font-semibold text-secondary">Subtotal:</span>
                  <span className="font-heading text-2xl text-primary">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={actions.closeCart}
                  className="w-full px-6 py-4 border-2 border-primary text-primary font-paragraph font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
