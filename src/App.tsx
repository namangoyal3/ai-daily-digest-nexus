
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AIDigest from "./pages/AIDigest";
import DbTestPage from "./pages/DbTestPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AIDigest />,
    },
    {
      path: "/db-test",
      element: <DbTestPage />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
