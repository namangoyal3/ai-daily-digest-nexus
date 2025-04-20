
import React from "react";
import AIDigest from "../AIDigest";
import AdminEditLayout from "@/components/admin/edit/AdminEditLayout";
import { Helmet } from "react-helmet";

export default function AdminEditAIDigest() {
  return (
    <>
      <Helmet>
        <title>Edit AI Digest - Admin Edit Mode</title>
      </Helmet>
      <AdminEditLayout>
        <AIDigest isEditMode={true} />
      </AdminEditLayout>
    </>
  );
}
