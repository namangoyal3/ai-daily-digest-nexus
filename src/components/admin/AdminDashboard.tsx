
import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "./AdminSidebar";
import AdminOverview from "./AdminOverview";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar isCollapsed={isSidebarCollapsed} />
        
        <main className={cn(
          "flex-1 transition-all duration-300",
          isSidebarCollapsed ? "ml-[80px]" : "ml-64"
        )}>
          {/* Top Navigation */}
          <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="mr-4"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </header>
          
          {/* Main Content */}
          <div className="p-6">
            <AdminOverview />
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper function
import { cn } from "@/lib/utils";
