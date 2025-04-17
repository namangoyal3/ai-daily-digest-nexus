
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { cn } from "@/lib/utils";
import { ChevronsRight, Search, Bell, HelpCircle, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication from localStorage
    localStorage.removeItem("adminAuth");
    
    // Show toast message
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin dashboard",
    });
    
    // Redirect to admin login
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isCollapsed={isSidebarCollapsed} />
      <div className={cn(
        "flex-1 transition-all duration-300",
        isSidebarCollapsed ? "ml-[80px]" : "ml-64"
      )}>
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="mr-4"
            >
              <ChevronsRight className={cn(
                "h-4 w-4 transition-transform",
                isSidebarCollapsed ? "rotate-0" : "rotate-180"
              )} />
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
            
            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
