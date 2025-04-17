
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreHorizontal, Mail, CheckCircle, XCircle } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function AdminUsers() {
  const users = [
    { 
      id: 1, 
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Editor",
      status: "Active",
      lastActive: "2 hours ago"
    },
    { 
      id: 2, 
      name: "Michael Chen",
      email: "m.chen@example.com",
      role: "Author",
      status: "Active",
      lastActive: "Yesterday"
    },
    { 
      id: 3, 
      name: "Emma Davis",
      email: "emma.d@example.com",
      role: "Contributor",
      status: "Inactive",
      lastActive: "3 weeks ago"
    },
    { 
      id: 4, 
      name: "John Smith",
      email: "john.s@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "Just now"
    },
    { 
      id: 5, 
      name: "Olivia Wilson",
      email: "o.wilson@example.com",
      role: "Editor",
      status: "Pending",
      lastActive: "Never"
    },
  ];

  return (
    <>
      <Helmet>
        <title>User Management - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground">Manage users, roles, and permissions</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New User
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Users</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-8 w-[250px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-2 font-medium">Name</th>
                        <th className="text-left p-2 font-medium">Email</th>
                        <th className="text-left p-2 font-medium">Role</th>
                        <th className="text-left p-2 font-medium">Status</th>
                        <th className="text-left p-2 font-medium">Last Active</th>
                        <th className="p-2 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-t">
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">{user.role}</td>
                          <td className="p-2">
                            <Badge variant={user.status === "Active" ? "success" : 
                                          user.status === "Inactive" ? "secondary" : "outline"}>
                              {user.status === "Active" ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : user.status === "Inactive" ? (
                                <XCircle className="mr-1 h-3 w-3" />
                              ) : null}
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-2">{user.lastActive}</td>
                          <td className="p-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuItem>Change Role</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Deactivate User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
