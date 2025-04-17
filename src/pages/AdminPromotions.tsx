
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import PromotionsManager from "@/components/admin/promotions/PromotionsManager";

export default function AdminPromotions() {
  return (
    <>
      <Helmet>
        <title>Promotions Management - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <PromotionsManager />
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
