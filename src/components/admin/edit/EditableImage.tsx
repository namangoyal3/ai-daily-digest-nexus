
import React, { useState } from "react";
import { useAdminEdit } from "@/contexts/AdminEditContext";
import { ImageIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableImageProps {
  src: string;
  alt: string;
  path: string;
  className?: string;
  imageClassName?: string;
}

export default function EditableImage({ 
  src, 
  alt, 
  path, 
  className, 
  imageClassName 
}: EditableImageProps) {
  const { addEdit, edits } = useAdminEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSrc, setEditedSrc] = useState(src);
  
  // Find if there's an existing edit for this path
  const existingEdit = edits.find(edit => edit.path === path);
  const displaySrc = existingEdit ? existingEdit.editedContent : src;
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditedSrc(displaySrc);
  };
  
  const handleSave = () => {
    addEdit({
      path,
      originalContent: src,
      editedContent: editedSrc,
      elementType: "image",
    });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedSrc(displaySrc);
    setIsEditing(false);
  };
  
  return (
    <div className={cn("group relative", className)}>
      {isEditing ? (
        <div className="p-4 border-2 border-aiblue rounded bg-white">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input 
                value={editedSrc}
                onChange={(e) => setEditedSrc(e.target.value)}
                placeholder="Enter image URL"
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Preview:</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-center border rounded p-2">
              {editedSrc ? (
                <img
                  src={editedSrc}
                  alt={alt}
                  className={cn("max-h-40 object-contain", imageClassName)}
                  onError={() => {
                    // Handle image load error
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 p-4">
                  <ImageIcon className="h-10 w-10 mb-2" />
                  <span>No image URL provided</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={displaySrc}
            alt={alt}
            className={cn("w-full", imageClassName)}
          />
          <Button
            size="sm"
            variant="outline"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleEdit}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
