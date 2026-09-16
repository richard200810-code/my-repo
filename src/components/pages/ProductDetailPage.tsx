import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { HairExtensionsandWigs } from '@/entities';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { ChevronLeft, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<HairExtensionsandWigs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<HairExtensionsandWigs>('hairextensions', id);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product?._id) return;
    await actions.addToCart({ collectionId: 'hairextensions', itemId: product._id, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-40">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 py-20 text-center">
          <h1 className="font-heading text-4xl text-primary mb-4">Product Not Found</h1>
          <p className="font-paragraph text-secondary/70 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors"
          >
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="w-full max-w-[100rem] mx-auto px-6 py-4">
        <Link
          to="/products"
          className="flex items-center gap-2 text-secondary/70 hover:text-primary transition-colors font-paragraph"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      {/* Product Detail */}
      <section className="w-full max-w-[100rem] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-lg overflow-hidden aspect-square"
          >
            <Image
              src={product.itemImage || 'https://static.wixstatic.com/media/37e681_ad619403f4d848e092a3ff8a91b9253f~mv2.png?originWidth=576&originHeight=576'}
              alt={product.itemName || 'Product'}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-heading text-5xl text-primary mb-4">{product.itemName}</h1>
              <p className="font-paragraph text-xl text-secondary/70">{product.itemDescription}</p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-background py-6">
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-5xl text-primary">
                  {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                </span>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="font-heading text-2xl text-primary">Specifications</h3>
              <div className="grid grid-cols-2 gap-6">
                {product.productType && (
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Hair Type</p>
                    <p className="font-paragraph text-lg text-primary">{product.productType}</p>
                  </div>
                )}
                {product.applicationMethod && (
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Application</p>
                    <p className="font-paragraph text-lg text-primary">{product.applicationMethod}</p>
                  </div>
                )}
                {product.texture && (
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Texture</p>
                    <p className="font-paragraph text-lg text-primary">{product.texture}</p>
                  </div>
                )}
                {product.color && (
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Color</p>
                    <p className="font-paragraph text-lg text-primary">{product.color}</p>
                  </div>
                )}
                {product.length && (
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Length</p>
                    <p className="font-paragraph text-lg text-primary">{product.length} inches</p>
                  </div>
                )}
                {product.weightInGrams && (
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Weight</p>
                    <p className="font-paragraph text-lg text-primary">{product.weightInGrams}g</p>
                  </div>
                )}
                {product.quantityInPack && (
                  <div>
                    <p className="font-paragraph text-sm text-secondary/60 mb-1">Quantity</p>
                    <p className="font-paragraph text-lg text-primary">{product.quantityInPack} pieces</p>
                  </div>
                )}
              </div>
            </div>

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="bg-background/20 rounded-lg p-6">
                <h4 className="font-heading text-lg text-primary mb-3">Care Instructions</h4>
                <p className="font-paragraph text-secondary/70 leading-relaxed">
                  {product.careInstructions}
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-background rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-secondary hover:bg-background transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-paragraph font-semibold text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-secondary hover:bg-background transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingItemId === product._id}
                className="w-full px-8 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : addingItemId === product._id ? (
                  'Adding...'
                ) : (
                  'Add to Cart'
                )}
              </button>

              <button
                onClick={() => actions.openCart()}
                className="w-full px-8 py-4 border-2 border-primary text-primary font-paragraph font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-background">
              <div className="text-center">
                <p className="font-paragraph text-sm text-secondary/60 mb-1">✓ Premium Quality</p>
                <p className="font-paragraph text-xs text-secondary/50">100% authentic</p>
              </div>
              <div className="text-center">
                <p className="font-paragraph text-sm text-secondary/60 mb-1">✓ Fast Shipping</p>
                <p className="font-paragraph text-xs text-secondary/50">Ships within 2 days</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
