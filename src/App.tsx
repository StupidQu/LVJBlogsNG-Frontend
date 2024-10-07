import { Suspense } from 'react';
import { useRoutes } from 'react-router';
import routes from '~react-pages';

export default function App() {
  return (
    <Suspense>
      { useRoutes(routes) }
    </Suspense>
  );
}