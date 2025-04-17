
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";

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
            <AdminDashboard />
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
