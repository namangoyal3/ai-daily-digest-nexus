
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";

export default function Admin() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <AdminOverview />
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}

