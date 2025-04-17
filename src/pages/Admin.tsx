
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileEdit, Image, Layout, Users, BarChart, Search, FileCode, Bot } from "lucide-react";

export default function Admin() {
  const quickLinks = [
    {
      title: "Edit Home Page",
      description: "Update your homepage content and layout",
      icon: <Layout className="h-8 w-8" />,
      link: "/admin/content?page=1"
    },
    {
      title: "Edit AI Digest",
      description: "Manage your AI newsletter content",
      icon: <FileEdit className="h-8 w-8" />,
      link: "/admin/content?page=2"
    },
    {
      title: "Edit AI Agents",
      description: "Update AI agent profiles and capabilities",
      icon: <Bot className="h-8 w-8" />,
      link: "/admin/content?page=3"
    },
    {
      title: "Edit AI Courses",
      description: "Manage educational content and curriculum",
      icon: <FileCode className="h-8 w-8" />,
      link: "/admin/content?page=4"
    },
    {
      title: "Manage Visual Assets",
      description: "Upload and organize images and icons",
      icon: <Image className="h-8 w-8" />,
      link: "/admin/content?tab=visual-assets"
    },
    {
      title: "View Analytics",
      description: "Check site performance metrics",
      icon: <BarChart className="h-8 w-8" />,
      link: "/admin/analytics"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
              <p className="text-muted-foreground">
                Welcome to the admin dashboard. Manage your website content, users, and settings.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="text-primary">{link.icon}</div>
                    <CardTitle className="mt-2">{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link to={link.link} className="w-full">
                      <Button variant="outline" className="w-full">Access</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <AdminDashboard />
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
