
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  BarChart,
  Tag,
  MessageSquare,
  Image,
  Megaphone,
  Archive,
  Calendar,
  Palette,
  Globe,
  Database,
  Search,
  CircleDollarSign,
  Bell,
  Files,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AdminSidebarProps {
  isCollapsed: boolean;
}

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Files, label: "Pages", href: "/admin/pages" },
  { icon: FileText, label: "Content Manager", href: "/admin/content" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: BarChart, label: "Analytics", href: "/admin/analytics" },
  { icon: Tag, label: "SEO", href: "/admin/seo" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Image, label: "Media", href: "/admin/media" },
  { icon: Megaphone, label: "Campaigns", href: "/admin/campaigns" },
  { icon: Archive, label: "Lead Manager", href: "/admin/leads" },
];

const quickAccessItems = [
  { icon: Calendar, label: "Content Calendar", href: "/admin/calendar" },
  { icon: Palette, label: "Design & Themes", href: "/admin/themes" },
  { icon: CircleDollarSign, label: "Promotions", href: "/admin/promotions" },
  { icon: Globe, label: "Site Structure", href: "/admin/structure" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
];

const utilityItems = [
  { icon: Search, label: "Global Search", href: "/admin/search" },
  { icon: Database, label: "Backups", href: "/admin/backups" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar({ isCollapsed }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 bg-white border-r transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className={cn(
          "flex items-center h-16 px-4 border-b",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          {isCollapsed ? (
            <span className="text-xl font-bold">AI</span>
          ) : (
            <h2 className="text-xl font-bold">AI Daily Digest</h2>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          {/* Main Menu */}
          <div className="px-4">
            {!isCollapsed && (
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Main Menu</h3>
            )}
            <nav className="space-y-1 mb-6">
              {mainMenuItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Quick Access */}
          <div className="px-4 mt-6">
            {!isCollapsed && (
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Quick Access</h3>
            )}
            <nav className="space-y-1 mb-6">
              {quickAccessItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Utilities */}
          <div className="px-4 mt-6">
            {!isCollapsed && (
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Utilities</h3>
            )}
            <nav className="space-y-1">
              {utilityItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        {/* User Info */}
        <div className={cn(
          "border-t p-4",
          isCollapsed ? "text-center" : ""
        )}>
          <div className="flex items-center">
            <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center">
              <span className="font-medium text-gray-700">A</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Super Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
