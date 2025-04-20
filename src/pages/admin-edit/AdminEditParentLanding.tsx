
import React from "react";
import ParentLanding from "../ParentLanding";
import AdminEditLayout from "@/components/admin/edit/AdminEditLayout";
import { Helmet } from "react-helmet";

export default function AdminEditParentLanding() {
  return (
    <>
      <Helmet>
        <title>Edit Homepage - Admin Edit Mode</title>
      </Helmet>
      <AdminEditLayout>
        <ParentLanding isEditMode={true} />
      </AdminEditLayout>
    </>
  );
}
