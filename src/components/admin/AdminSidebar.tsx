import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Settings,
  Users,
  BarChart,
  LineChart,
  FileEdit,
  Power,
  BookOpen,
  Edit,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AdminSidebarProps {
  isCollapsed: boolean;
}

export default function AdminSidebar({ isCollapsed }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      name: "Content",
      path: "/admin/content",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: "Homepage",
      path: "/admin/homepage",
      icon: <ImageIcon className="h-4 w-4" />,
    },
    {
      name: "Pages",
      path: "/admin/pages",
      icon: <FileEdit className="h-4 w-4" />,
    },
    {
      name: "Section Templates",
      path: "/admin/section-templates",
      icon: <ImageIcon className="h-4 w-4" />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      name: "SEO",
      path: "/admin/seo",
      icon: <LineChart className="h-4 w-4" />,
    },
    {
      name: "Promotions",
      path: "/admin/promotions",
      icon: <Power className="h-4 w-4" />,
    },
    {
      name: "Visual Editor",
      path: "/admin/edit-manager",
      icon: <Edit className="h-4 w-4" />,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-md transition-transform duration-300 z-50 ${
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      } lg:translate-x-0 lg:w-64`}
    >
      <div className="h-full flex flex-col">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center h-16 bg-gray-900 border-b border-gray-700 p-4">
          <NavLink to="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-aiblue to-aipurple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            {!isCollapsed && (
              <h1 className="ml-2 text-lg font-heading font-semibold">
                NeuralNextGen
              </h1>
            )}
          </NavLink>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center py-3 px-4 hover:bg-gray-700 transition-colors ${
                      isActive ? "bg-gray-700 font-semibold" : ""
                    }`
                  }
                >
                  {item.icon}
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-700"
            onClick={handleLogout}
          >
            <Power className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
