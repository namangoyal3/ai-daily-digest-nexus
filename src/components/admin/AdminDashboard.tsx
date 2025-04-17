
import { useState } from "react";
import {
  Layout,
  Settings,
  FileText,
  Users,
  BarChart,
  Tags,
  MessageSquare,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "./AdminSidebar";
import AdminOverview from "./AdminOverview";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6">
          <div className="mb-6 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <AdminOverview />
        </main>
      </div>
    </div>
  );
}
