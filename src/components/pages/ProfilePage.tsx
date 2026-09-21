import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function ProfilePageContent() {
  const { member, actions } = useMember();

  const handleLogout = async () => {
    await actions.logout();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-paragraph text-base text-primary hover:opacity-70 transition-opacity mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">
            Mi Perfil
          </h1>
          <p className="font-paragraph text-lg text-primary/70">
            Información de tu cuenta
          </p>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl bg-white border border-primary/10 p-8 space-y-8">
          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl text-primary mb-4">
                Información Personal
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="font-paragraph text-sm text-primary/60">
                    Nombre
                  </label>
                  <p className="font-paragraph text-base text-primary mt-1">
                    {member?.profile?.nickname ||
                      member?.contact?.firstName ||
                      'No especificado'}
                  </p>
                </div>

                <div>
                  <label className="font-paragraph text-sm text-primary/60">
                    Correo Electrónico
                  </label>
                  <p className="font-paragraph text-base text-primary mt-1">
                    {member?.loginEmail}
                  </p>
                </div>

                <div>
                  <label className="font-paragraph text-sm text-primary/60">
                    Estado
                  </label>
                  <p className="font-paragraph text-base text-primary mt-1">
                    {member?.status === 'APPROVED'
                      ? 'Verificado'
                      : member?.status === 'PENDING'
                      ? 'Pendiente'
                      : 'Activo'}
                  </p>
                </div>

                {member?.loginEmailVerified && (
                  <div>
                    <label className="font-paragraph text-sm text-primary/60">
                      Correo Verificado
                    </label>
                    <p className="font-paragraph text-base text-primary mt-1">
                      ✓ Sí
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Account Created */}
            <div className="pt-6 border-t border-primary/10">
              <p className="font-paragraph text-sm text-primary/60">
                Cuenta creada:{' '}
                {member?._createdDate
                  ? new Date(member._createdDate).toLocaleDateString('es-ES')
                  : 'No disponible'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-primary/10 space-y-3">
            <Link
              to="/orders"
              className="block w-full px-6 py-3 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-center"
            >
              Ver Mis Pedidos
            </Link>

            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 border-2 border-destructive bg-destructive text-destructive-foreground font-paragraph text-base hover:opacity-90 transition-all duration-300"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <MemberProtectedRoute messageToSignIn="Inicia sesión para ver tu perfil">
      <ProfilePageContent />
    </MemberProtectedRoute>
  );
}
