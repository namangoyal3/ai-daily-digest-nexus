
import { Helmet } from "react-helmet";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function Admin() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminDashboard />
      </AdminAuthGuard>
    </>
  );
}
