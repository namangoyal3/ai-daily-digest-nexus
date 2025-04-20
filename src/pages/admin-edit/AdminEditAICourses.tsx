
import React from "react";
import AICourses from "../AICourses";
import AdminEditLayout from "@/components/admin/edit/AdminEditLayout";
import { Helmet } from "react-helmet";

export default function AdminEditAICourses() {
  return (
    <>
      <Helmet>
        <title>Edit AI Courses - Admin Edit Mode</title>
      </Helmet>
      <AdminEditLayout>
        <AICourses isEditMode={true} />
      </AdminEditLayout>
    </>
  );
}
