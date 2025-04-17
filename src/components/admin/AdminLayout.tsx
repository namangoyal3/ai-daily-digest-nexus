
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isCollapsed={isSidebarCollapsed} />
      <div className={cn(
        "flex-1 transition-all duration-300",
        isSidebarCollapsed ? "ml-[80px]" : "ml-64"
      )}>
        <div className="p-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="mb-4"
          >
            <ChevronsRight className={cn(
              "h-4 w-4 transition-transform",
              isSidebarCollapsed ? "rotate-0" : "rotate-180"
            )} />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}

