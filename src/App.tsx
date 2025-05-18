
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import AIDigest from "./pages/AIDigest";
import AIAgents from "./pages/AIAgents";
import AIBlogs from "./pages/AIBlogs";
import BlogDetail from "./pages/BlogDetail";
import BlogSettings from "./pages/BlogSettings";
import AICourses from "./pages/AICourses";
import AICoursesDirectory from "./pages/AICoursesDirectory";
import NotFound from "./pages/NotFound";
import ParentLanding from "./pages/ParentLanding";
import MidjourneyDetails from "./pages/MidjourneyDetails";
import AgentDetails from "./pages/AgentDetails";

// Admin routes
import Admin from "./pages/Admin";
import AdminContent from "./pages/AdminContent";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSEO from "./pages/AdminSEO";
import AdminHomePage from "./pages/AdminHomePage";
import AdminPages from "./pages/AdminPages";
import AdminUsers from "./pages/AdminUsers";
import AdminPromotions from "./pages/AdminPromotions";
import DbTestPage from "./pages/DbTestPage";

// Policy pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentLanding />,
    errorElement: <NotFound />,
  },
  {
    path: "/ai-digest",
    element: <AIDigest />,
  },
  {
    path: "/ai-agents",
    element: <AIAgents />,
  },
  {
    path: "/agent/:agentId",
    element: <AgentDetails />,
  },
  {
    path: "/ai-blogs",
    element: <AIBlogs />,
  },
  {
    path: "/ai-blogs/:blogId",
    element: <BlogDetail />,
  },
  {
    path: "/blog-settings",
    element: <BlogSettings />,
  },
  {
    path: "/ai-courses",
    element: <AICourses />,
  },
  {
    path: "/ai-courses/directory",
    element: <AICoursesDirectory />,
  },
  {
    path: "/midjourney-details",
    element: <MidjourneyDetails />,
  },
  {
    path: "/db-test",
    element: <DbTestPage />,
  },
  // Admin routes
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/content",
    element: <AdminContent />,
  },
  {
    path: "/admin/analytics",
    element: <AdminAnalytics />,
  },
  {
    path: "/admin/seo",
    element: <AdminSEO />,
  },
  {
    path: "/admin/home-page",
    element: <AdminHomePage />,
  },
  {
    path: "/admin/pages",
    element: <AdminPages />,
  },
  {
    path: "/admin/users",
    element: <AdminUsers />,
  },
  {
    path: "/admin/promotions",
    element: <AdminPromotions />,
  },
  // Policy pages
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/cookie-policy",
    element: <CookiePolicy />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
