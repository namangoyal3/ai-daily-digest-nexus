
import React, { useState, useEffect, useRef } from "react";
import { useAdminEdit } from "@/contexts/AdminEditContext";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditableTextProps {
  children: React.ReactNode;
  path: string;
  className?: string;
}

export default function EditableText({ children, path, className }: EditableTextProps) {
  const { addEdit, edits } = useAdminEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<string>("");
  const textRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Find if there's an existing edit for this path
  const existingEdit = edits.find(edit => edit.path === path);
  
  // Initialize with either the existing edit or the original content
  useEffect(() => {
    if (existingEdit) {
      setEditedContent(existingEdit.editedContent);
    } else if (typeof children === "string") {
      setEditedContent(children);
    } else if (React.isValidElement(children)) {
      // Try to extract text if it's a valid React element
      setEditedContent(React.Children.toArray(children).join(""));
    }
  }, [children, existingEdit]);
  
  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    const originalContent = typeof children === "string" 
      ? children 
      : React.isValidElement(children)
        ? React.Children.toArray(children).join("")
        : "";
    
    addEdit({
      path,
      originalContent,
      editedContent,
      elementType: "text",
    });
    
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    // Reset to the existing edit or original content
    if (existingEdit) {
      setEditedContent(existingEdit.editedContent);
    } else if (typeof children === "string") {
      setEditedContent(children);
    }
    setIsEditing(false);
  };
  
  // Adjust textarea height to fit content
  const adjustHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };
  
  return (
    <div className={`group relative ${className || ""}`}>
      {isEditing ? (
        <div className="relative">
          <textarea
            ref={inputRef}
            value={editedContent}
            onChange={(e) => {
              setEditedContent(e.target.value);
              adjustHeight(e.target);
            }}
            className="w-full p-2 border-2 border-aiblue rounded bg-white text-gray-900 min-h-[2rem]"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                handleCancel();
              }
            }}
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div ref={textRef}>
            {/* Show either the edited content or the original children */}
            {existingEdit ? existingEdit.editedContent : children}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleEdit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
