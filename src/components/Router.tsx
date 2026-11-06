import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Lazy load all page components
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const ProductsPage = lazy(() => import('@/components/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/components/pages/ProductDetailPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));
const StoresPage = lazy(() => import('@/components/pages/StoresPage'));
const StoreDetailPage = lazy(() => import('@/components/pages/StoreDetailPage'));
const AcademyPage = lazy(() => import('@/components/pages/AcademyPage'));
const HairWeftGuidePage = lazy(() => import('@/components/pages/HairWeftGuidePage'));
const ClipInGuidePage = lazy(() => import('@/components/pages/ClipInGuidePage'));
const TapeInGuidePage = lazy(() => import('@/components/pages/TapeInGuidePage'));
const KeratinGuidePage = lazy(() => import('@/components/pages/KeratinGuidePage'));
const FeatherGuidePage = lazy(() => import('@/components/pages/FeatherGuidePage'));
const DoublePieceFlatWeftPage = lazy(() => import('@/components/pages/DoublePieceFlatWeftPage'));
const ColorGuidePage = lazy(() => import('@/components/pages/ColorGuidePage'));
const DebugProductImages = lazy(() => import('@/components/pages/DebugProductImages'));
const CRMPage = lazy(() => import('@/components/pages/CRMPage'));
const ToolsAccessoriesPage = lazy(() => import('@/components/pages/ToolsAccessoriesPage'));

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
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
        path: "academy",
        element: <AcademyPage />,
        routeMetadata: {
          pageIdentifier: 'academy',
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
        path: "aplicaciones/double-piece-flat-weft",
        element: <DoublePieceFlatWeftPage />,
        routeMetadata: {
          pageIdentifier: 'double-piece-flat-weft',
        },
      },
      {
        path: "academy/color-ring",
        element: <ColorGuidePage />,
        routeMetadata: {
          pageIdentifier: 'color-guide',
        },
      },
      {
        path: "debug-images",
        element: <DebugProductImages />,
        routeMetadata: {
          pageIdentifier: 'debug-images',
        },
      },
      {
        path: "crm",
        element: <CRMPage />,
        routeMetadata: {
          pageIdentifier: 'crm',
        },
      },
      {
        path: "tools-accessories",
        element: <ToolsAccessoriesPage />,
        routeMetadata: {
          pageIdentifier: 'tools-accessories',
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
