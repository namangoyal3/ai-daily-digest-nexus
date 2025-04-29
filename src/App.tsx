
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AIDigest from "./pages/AIDigest";
import DbTestPage from "./pages/DbTestPage";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AIDigest />,
      errorElement: <NotFound />
    },
    {
      path: "/db-test",
      element: <DbTestPage />,
    },
    {
      path: "*",
      element: <NotFound />
    },
  ]);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
