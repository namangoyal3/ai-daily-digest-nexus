
import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Home, Newspaper, Users, BookOpen } from "lucide-react";

export default function AdminEditManager() {
  const editablePages = [
    {
      title: "Homepage",
      description: "Edit the main landing page content",
      path: "/admin-edit",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "AI Daily Digest",
      description: "Edit the AI newsletter subscription page",
      path: "/admin-edit/ai-digest",
      icon: <Newspaper className="h-5 w-5" />,
    },
    {
      title: "AI Agents",
      description: "Edit the AI agents marketplace page",
      path: "/admin-edit/ai-agents",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "AI Courses",
      description: "Edit the AI educational courses page",
      path: "/admin-edit/ai-courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Visual Page Editor - Admin Dashboard</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Visual Page Editor</h1>
            <p className="text-muted-foreground">
              Edit your website pages visually with real-time preview. 
              Select a page below to begin editing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {editablePages.map((page) => (
              <Card key={page.path} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {page.icon}
                    <span>{page.title}</span>
                  </CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Make direct edits to your page content with our 
                    visual editor and preview changes in real-time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={page.path}>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Edit Page
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-8">
            <h3 className="text-lg font-medium text-amber-800 mb-2">How to use the visual editor</h3>
            <ul className="list-disc list-inside space-y-2 text-amber-700">
              <li>Hover over text or images you want to edit</li>
              <li>Click the edit icon that appears</li>
              <li>Make your changes in the editor</li>
              <li>Save when finished</li>
              <li>Preview your changes in real-time</li>
              <li>When satisfied, click "Publish Changes" to make them live</li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
