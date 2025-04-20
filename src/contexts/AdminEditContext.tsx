
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type ContentEdit = {
  id: string;
  path: string;
  originalContent: string;
  editedContent: string;
  elementType: 'text' | 'image';
};

type AdminEditContextType = {
  isEditing: boolean;
  edits: ContentEdit[];
  addEdit: (edit: Omit<ContentEdit, 'id'>) => void;
  removeEdit: (id: string) => void;
  clearEdits: () => void;
  publishChanges: () => Promise<void>;
  discardChanges: () => void;
};

const AdminEditContext = createContext<AdminEditContextType | null>(null);

export const useAdminEdit = () => {
  const context = useContext(AdminEditContext);
  if (!context) {
    throw new Error("useAdminEdit must be used within an AdminEditProvider");
  }
  return context;
};

export const AdminEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [edits, setEdits] = useState<ContentEdit[]>([]);
  const { toast } = useToast();

  // Load edits from localStorage on mount
  useEffect(() => {
    const savedEdits = localStorage.getItem("adminEdits");
    if (savedEdits) {
      try {
        setEdits(JSON.parse(savedEdits));
      } catch (error) {
        console.error("Failed to load saved edits:", error);
      }
    }
  }, []);

  // Save edits to localStorage when they change
  useEffect(() => {
    localStorage.setItem("adminEdits", JSON.stringify(edits));
  }, [edits]);

  const addEdit = (edit: Omit<ContentEdit, 'id'>) => {
    const newEdit = {
      ...edit,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    // Check if we're updating an existing edit for this element
    setEdits(currentEdits => {
      const existingEditIndex = currentEdits.findIndex(e => e.path === edit.path);
      
      if (existingEditIndex !== -1) {
        const updatedEdits = [...currentEdits];
        updatedEdits[existingEditIndex] = {
          ...updatedEdits[existingEditIndex],
          editedContent: edit.editedContent
        };
        return updatedEdits;
      }
      
      return [...currentEdits, newEdit];
    });
  };

  const removeEdit = (id: string) => {
    setEdits(currentEdits => currentEdits.filter(edit => edit.id !== id));
  };

  const clearEdits = () => {
    setEdits([]);
    localStorage.removeItem("adminEdits");
  };

  const publishChanges = async () => {
    try {
      // In a real implementation, this would send the changes to an API
      // For this demo, we'll just simulate a successful publish
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Changes published successfully",
        description: `${edits.length} changes have been published to the live site.`,
      });
      
      // Clear edits after publishing
      clearEdits();
      
      return Promise.resolve();
    } catch (error) {
      toast({
        title: "Failed to publish changes",
        description: "An error occurred while publishing your changes.",
        variant: "destructive",
      });
      
      return Promise.reject(error);
    }
  };

  const discardChanges = () => {
    clearEdits();
    toast({
      title: "Changes discarded",
      description: "All changes have been discarded.",
    });
  };

  return (
    <AdminEditContext.Provider
      value={{
        isEditing,
        edits,
        addEdit,
        removeEdit,
        clearEdits,
        publishChanges,
        discardChanges,
      }}
    >
      {children}
    </AdminEditContext.Provider>
  );
};
