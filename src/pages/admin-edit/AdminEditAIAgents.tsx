
import React from "react";
import AIAgents from "../AIAgents";
import AdminEditLayout from "@/components/admin/edit/AdminEditLayout";
import { Helmet } from "react-helmet";

export default function AdminEditAIAgents() {
  return (
    <>
      <Helmet>
        <title>Edit AI Agents - Admin Edit Mode</title>
      </Helmet>
      <AdminEditLayout>
        <AIAgents isEditMode={true} />
      </AdminEditLayout>
    </>
  );
}
