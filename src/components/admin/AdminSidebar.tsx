
import { cn } from "@/lib/utils";
import {
  Layout,
  Settings,
  FileText,
  Users,
  BarChart,
  Tags,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
  { icon: Layout, label: "Overview", href: "#overview" },
  { icon: FileText, label: "Content", href: "#content" },
  { icon: Users, label: "Users", href: "#users" },
  { icon: BarChart, label: "Analytics", href: "#analytics" },
  { icon: Tags, label: "SEO", href: "#seo" },
  { icon: MessageSquare, label: "Comments", href: "#comments" },
  { icon: Settings, label: "Settings", href: "#settings" },
];

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed lg:static inset-y-0 left-0 bg-white border-r transform transition-transform duration-200 ease-in-out z-20",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "w-64 p-4"
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">AI Daily Digest</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsOpen(false);
              }
            }}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
