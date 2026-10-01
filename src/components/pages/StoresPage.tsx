import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Storefront Image */}
        <div className="w-full">
          <Image
            src="https://static.wixstatic.com/media/37e681_76556a5702614c2fa667218f92828271~mv2.png"
            alt="Storefront"
            width={1600}
            className="w-full h-auto"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
