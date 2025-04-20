
import React, { useState } from "react";
import { AdminEditProvider } from "@/contexts/AdminEditContext";
import { useAdminEdit } from "@/contexts/AdminEditContext";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Save, X, AlertTriangle } from "lucide-react";

function AdminEditControls() {
  const { edits, publishChanges, discardChanges } = useAdminEdit();
  const [isPublishing, setIsPublishing] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publishChanges();
    } finally {
      setIsPublishing(false);
    }
  };
  
  const handleDiscard = () => {
    setShowDiscardDialog(true);
  };
  
  const confirmDiscard = () => {
    discardChanges();
    setShowDiscardDialog(false);
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 flex gap-2 z-50">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleDiscard}
          disabled={edits.length === 0}
          className="bg-white shadow-lg border-gray-300"
        >
          <X className="mr-2 h-4 w-4" />
          Discard Changes
          {edits.length > 0 && (
            <span className="ml-2 bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
              {edits.length}
            </span>
          )}
        </Button>
        
        <Button 
          size="lg" 
          onClick={handlePublish}
          disabled={edits.length === 0 || isPublishing}
          className="bg-aiblue hover:bg-aiblue-dark shadow-lg"
        >
          {isPublishing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Publishing...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Publish Changes
              {edits.length > 0 && (
                <span className="ml-2 bg-white text-aiblue rounded-full px-2 py-0.5 text-xs">
                  {edits.length}
                </span>
              )}
            </>
          )}
        </Button>
      </div>
      
      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              Discard all changes?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have {edits.length} unsaved {edits.length === 1 ? "change" : "changes"}. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDiscard} className="bg-red-600 hover:bg-red-700">
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

interface AdminEditLayoutProps {
  children: React.ReactNode;
}

export default function AdminEditLayout({ children }: AdminEditLayoutProps) {
  return (
    <AdminEditProvider>
      <div className="admin-edit-mode">
        <div className="fixed top-0 left-0 right-0 bg-aiblue text-white p-2 text-center text-sm z-50">
          Admin Edit Mode - Changes will not be visible on the live site until published
        </div>
        <div className="pt-10">
          {children}
        </div>
        <AdminEditControls />
      </div>
    </AdminEditProvider>
  );
}
