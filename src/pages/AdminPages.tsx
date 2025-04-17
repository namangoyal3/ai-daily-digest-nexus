
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Plus, Search, FileText, Edit, Eye, Trash2, ArrowUpDown } from "lucide-react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Page {
  id: string;
  title: string;
  path: string;
  lastUpdated: string;
  status: "published" | "draft";
  sections: number;
}

export default function AdminPages() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const pages: Page[] = [
    { 
      id: "1", 
      title: "Home Page", 
      path: "/", 
      lastUpdated: "2025-04-15", 
      status: "published",
      sections: 6 
    },
    { 
      id: "2", 
      title: "AI Daily Digest", 
      path: "/ai-digest", 
      lastUpdated: "2025-04-14", 
      status: "published",
      sections: 8 
    },
    { 
      id: "3", 
      title: "AI Agents", 
      path: "/ai-agents", 
      lastUpdated: "2025-04-12", 
      status: "published",
      sections: 7 
    },
    { 
      id: "4", 
      title: "AI Courses", 
      path: "/ai-courses", 
      lastUpdated: "2025-04-10", 
      status: "published",
      sections: 9 
    },
  ];

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (pageId: string) => {
    navigate(`/admin/content?page=${pageId}`);
  };

  const handlePreview = (path: string) => {
    window.open(path, "_blank");
  };

  const handleDelete = (pageId: string) => {
    toast({
      title: "Not Implemented",
      description: "Page deletion functionality would be implemented here in production.",
    });
  };

  const handleCreateNewPage = () => {
    toast({
      title: "Create New Page",
      description: "New page creation would be implemented here in production.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Page Management - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Page Management</h1>
                <p className="text-muted-foreground">
                  Manage all website pages and their content
                </p>
              </div>
              <Button onClick={handleCreateNewPage}>
                <Plus className="mr-2 h-4 w-4" /> Create New Page
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Pages</CardTitle>
                <CardDescription>
                  View and manage all pages across your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search pages..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">
                        <div className="flex items-center gap-2">
                          Title
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Path</TableHead>
                      <TableHead>Sections</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium">{page.title}</TableCell>
                        <TableCell>{page.path}</TableCell>
                        <TableCell>{page.sections}</TableCell>
                        <TableCell>{page.lastUpdated}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            page.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {page.status === "published" ? "Published" : "Draft"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleEdit(page.id)}
                              title="Edit page"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handlePreview(page.path)}
                              title="Preview page"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(page.id)}>
                                  Edit Page
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(page.id)}>
                                  Delete Page
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
