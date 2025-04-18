
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileEdit, Layers, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Admin() {
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileEdit className="h-5 w-5" />
                    <span>Quick Edit</span>
                  </CardTitle>
                  <CardDescription>
                    Directly edit key pages of your website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    Make quick edits to your most important pages with our enhanced content editor.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/admin/homepage">
                      Edit Homepage
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="h-5 w-5" />
                    <span>Content Management</span>
                  </CardTitle>
                  <CardDescription>
                    Manage all website content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    Access the complete content management system to edit all pages and sections.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/pages">
                      Manage Pages
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>System Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure website settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    Access global configuration options for your website.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/settings">
                      Settings
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <AdminOverview />
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
