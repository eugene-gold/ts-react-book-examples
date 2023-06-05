import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProductsPage } from './pages/ProductsPage';
import App from './App';
import { ProductPage } from './pages/ProductPage';
import { ErrorPage } from './pages/Errorpage';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './ContactPage';
import { ThankYouPage } from './ThankYouPage';

const AdminPage = lazy(() => import('./pages/AdminPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
      },
      {
        path: 'admin',
        element: (
          <Suspense
            fallback={<div className="text-center p-5 text-xl text-slate 800">Loading...</div>}
          >
            <AdminPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'thank-you/:name',
        element: <ThankYouPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
