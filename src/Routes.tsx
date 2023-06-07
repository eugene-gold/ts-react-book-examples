import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProductsPage } from './pages/ProductsPage';
import App from './App';
import { ProductPage } from './pages/ProductPage';
import { ErrorPage } from './pages/Errorpage';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './ContactPage';
import { ThankYouPage } from './ThankYouPage';
import { PostsPage } from './posts/PostsPage';
import { getPosts } from './posts/getPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AdminPage = lazy(() => import('./pages/AdminPage'));

const queryClient = new QueryClient();
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
      {
        path: 'posts',
        element: <PostsPage />,
        loader: async () => {
          const existingData = queryClient.getQueryData(['postsData']);
          if (existingData) {
            return defer({ posts: existingData });
          }
          return defer({
            posts: queryClient.fetchQuery(['postsData'], getPosts),
          });
        },
      },
    ],
  },
]);

export function Routes() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}
