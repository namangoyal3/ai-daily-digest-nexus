
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminContent() {
  return (
    <>
      <Helmet>
        <title>Content Management - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div>
            <h1 className="text-3xl font-bold mb-6">Content Management</h1>
            <p className="text-muted-foreground">
              Manage your articles and content here.
            </p>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}

