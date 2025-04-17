
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParentLanding from "./pages/ParentLanding";
import AIDigest from "./pages/AIDigest";
import AIAgents from "./pages/AIAgents";
import AICourses from "./pages/AICourses";
import AgentDetails from "./pages/AgentDetails";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminContent from "./pages/AdminContent";
import AdminUsers from "./pages/AdminUsers";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSEO from "./pages/AdminSEO";
import AdminPromotions from "./pages/AdminPromotions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ParentLanding />} />
          <Route path="/ai-digest" element={<AIDigest />} />
          <Route path="/ai-agents" element={<AIAgents />} />
          <Route path="/ai-courses" element={<AICourses />} />
          <Route path="/agent/:agentSlug" element={<AgentDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/seo" element={<AdminSEO />} />
          <Route path="/admin/comments" element={<NotFound />} />
          <Route path="/admin/media" element={<NotFound />} />
          <Route path="/admin/campaigns" element={<NotFound />} />
          <Route path="/admin/leads" element={<NotFound />} />
          <Route path="/admin/settings" element={<NotFound />} />
          <Route path="/admin/calendar" element={<NotFound />} />
          <Route path="/admin/themes" element={<NotFound />} />
          <Route path="/admin/promotions" element={<AdminPromotions />} />
          <Route path="/admin/structure" element={<NotFound />} />
          <Route path="/admin/notifications" element={<NotFound />} />
          <Route path="/admin/search" element={<NotFound />} />
          <Route path="/admin/backups" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
