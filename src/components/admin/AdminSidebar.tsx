
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AdminSidebarProps {
  isCollapsed: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Content", href: "/admin/content" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BarChart, label: "Analytics", href: "/admin/analytics" },
  { icon: Tag, label: "SEO", href: "/admin/seo" },
  { icon: MessageSquare, label: "Comments", href: "/admin/comments" },
  { icon: Image, label: "Media", href: "/admin/media" },
  { icon: Megaphone, label: "Campaigns", href: "/admin/campaigns" },
  { icon: Archive, label: "Lead Manager", href: "/admin/leads" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar({ isCollapsed }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 bg-white border-r transition-all duration-300",
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
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

