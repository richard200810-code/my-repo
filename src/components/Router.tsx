import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ProductsPage from '@/components/pages/ProductsPage';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import ContactPage from '@/components/pages/ContactPage';
import StoresPage from '@/components/pages/StoresPage';
import StoreDetailPage from '@/components/pages/StoreDetailPage';
import HairWeftGuidePage from '@/components/pages/HairWeftGuidePage';
import ClipInGuidePage from '@/components/pages/ClipInGuidePage';
import TapeInGuidePage from '@/components/pages/TapeInGuidePage';
import KeratinGuidePage from '@/components/pages/KeratinGuidePage';
import FeatherGuidePage from '@/components/pages/FeatherGuidePage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "products",
        element: <ProductsPage />,
        routeMetadata: {
          pageIdentifier: 'products',
        },
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
        routeMetadata: {
          pageIdentifier: 'product-detail',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "stores",
        element: <StoresPage />,
        routeMetadata: {
          pageIdentifier: 'stores',
        },
      },
      {
        path: "stores/:id",
        element: <StoreDetailPage />,
        routeMetadata: {
          pageIdentifier: 'store-detail',
        },
      },
      {
        path: "aplicaciones-hair-weft",
        element: <HairWeftGuidePage />,
        routeMetadata: {
          pageIdentifier: 'hair-weft-guide',
        },
      },
      {
        path: "aplicaciones-clip-in",
        element: <ClipInGuidePage />,
        routeMetadata: {
          pageIdentifier: 'clip-in-guide',
        },
      },
      {
        path: "aplicaciones-tape-in",
        element: <TapeInGuidePage />,
        routeMetadata: {
          pageIdentifier: 'tape-in-guide',
        },
      },
      {
        path: "aplicaciones-keratin",
        element: <KeratinGuidePage />,
        routeMetadata: {
          pageIdentifier: 'keratin-guide',
        },
      },
      {
        path: "aplicaciones-feather",
        element: <FeatherGuidePage />,
        routeMetadata: {
          pageIdentifier: 'feather-guide',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
