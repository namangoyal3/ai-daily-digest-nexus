
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AIDigest from "./pages/AIDigest";
import DbTestPage from "./pages/DbTestPage";
import GoogleSheetsIntegration from "./pages/GoogleSheetsIntegration";

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
    {
      path: "/google-sheets-integration",
      element: <GoogleSheetsIntegration />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
