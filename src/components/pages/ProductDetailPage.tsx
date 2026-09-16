import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<HairExtensionsandWigs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<HairExtensionsandWigs>(
        'hairextensions',
        id,
        {}
      );
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 font-paragraph text-base text-primary hover:opacity-70 transition-opacity mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a Productos
        </Link>

        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !product ? (
            <div className="text-center py-20">
              <h2 className="font-heading text-3xl text-primary mb-4">
                Producto No Encontrado
              </h2>
              <p className="font-paragraph text-base text-primary/60 mb-8">
                El producto que buscas no existe
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Explorar Productos
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
            >
              {/* Product Image */}
              <div className="space-y-6">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.itemImage || 'https://static.wixstatic.com/media/37e681_25a8da95c5704687b68e81941207f7a2~mv2.png?originWidth=768&originHeight=1024'}
                    alt={product.itemName || 'Product'}
                    width={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-8">
                <div>
                  <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
                    {product.itemName}
                  </h1>
                  <p className="font-paragraph text-2xl text-primary font-semibold">
                    {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                  </p>
                </div>

                {/* Product Specifications */}
                <div className="space-y-4 py-6 border-y border-primary/10">
                  {product.productType && (
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-base text-primary/70">
                        Tipo
                      </span>
                      <span className="font-paragraph text-base text-primary font-semibold">
                        {product.productType}
                      </span>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-base text-primary/70">
                        Color
                      </span>
                      <span className="font-paragraph text-base text-primary font-semibold">
                        {product.color}
                      </span>
                    </div>
                  )}
                  {product.length && (
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-base text-primary/70">
                        Largo
                      </span>
                      <span className="font-paragraph text-base text-primary font-semibold">
                        {product.length} pulgadas
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {product.itemDescription && (
                  <div className="space-y-3">
                    <h2 className="font-heading text-2xl text-primary">
                      Descripción
                    </h2>
                    <p className="font-paragraph text-base text-primary leading-relaxed">
                      {product.itemDescription}
                    </p>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="font-paragraph text-base text-primary font-semibold">
                    Cantidad
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      -
                    </button>
                    <span className="font-paragraph text-lg text-primary font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => actions.addToCart({
                    collectionId: 'hairextensions',
                    itemId: product._id,
                    quantity
                  })}
                  disabled={addingItemId === product._id}
                  className="w-full px-8 py-4 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                >
                  {addingItemId === product._id ? 'Agregando al Carrito...' : 'Agregar al Carrito'}
                </button>

                {/* Additional Info */}
                <div className="space-y-3 pt-6 border-t border-primary/10">
                  <p className="font-paragraph text-sm text-primary/70">
                    Calidad premium garantizada
                  </p>
                  <p className="font-paragraph text-sm text-primary/70">
                    Envío gratis en pedidos superiores a $100
                  </p>
                  <p className="font-paragraph text-sm text-primary/70">
                    Política de devolución de 30 días
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
