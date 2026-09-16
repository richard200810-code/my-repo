import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StoreDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[100rem] mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-4xl text-primary mb-4">Page Not Available</h1>
        <p className="font-paragraph text-secondary/70 mb-8">
          This page is no longer available. Please visit our shop to browse our collection.
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors"
        >
          Go to Shop
        </Link>
      </div>
      <Footer />
    </div>
  );
}
