import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function OrdersPageContent() {
  const { member } = useMember();

  // Note: Orders would typically be fetched from a CMS collection
  // For now, we show a placeholder since order data isn't available through the member API
  const hasOrders = false;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Back Button */}
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 font-paragraph text-base text-primary hover:opacity-70 transition-opacity mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al Perfil
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">
            Mis Pedidos
          </h1>
          <p className="font-paragraph text-lg text-primary/70">
            Historial de compras de {member?.profile?.nickname || member?.contact?.firstName || 'tu cuenta'}
          </p>
        </div>

        {/* Orders List */}
        <div className="max-w-4xl">
          {hasOrders ? (
            <div className="space-y-4">
              {/* Orders would be rendered here */}
            </div>
          ) : (
            <div className="bg-white border border-primary/10 p-12 text-center space-y-4">
              <Package className="w-16 h-16 text-primary/30 mx-auto" />
              <div>
                <h2 className="font-heading text-2xl text-primary mb-2">
                  Sin Pedidos Aún
                </h2>
                <p className="font-paragraph text-base text-primary/60 mb-6">
                  No tienes pedidos registrados. ¡Comienza a comprar ahora!
                </p>
                <Link
                  to="/products"
                  className="inline-block px-8 py-3 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Inicia sesión para ver tus pedidos">
      <OrdersPageContent />
    </MemberProtectedRoute>
  );
}
