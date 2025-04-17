
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GripVertical, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentSection } from "@/types/content";

interface SectionsListProps {
  sections: ContentSection[];
  activeSectionId: string;
  isEditing: boolean;
  onSectionClick: (sectionId: string) => void;
  onAddSection: () => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onDuplicateSection: (sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
}

export default function SectionsList({
  sections,
  activeSectionId,
  isEditing,
  onSectionClick,
  onAddSection,
  onMoveSection,
  onDuplicateSection,
  onDeleteSection,
}: SectionsListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="max-h-[500px] overflow-auto">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className={`flex items-center justify-between px-4 py-2 border-b cursor-pointer hover:bg-gray-50 ${activeSectionId === section.id ? 'bg-gray-100' : ''}`}
              onClick={() => onSectionClick(section.id)}
            >
              <div className="flex items-center space-x-3">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium">{section.title || section.type}</p>
                  <p className="text-xs text-gray-500">{section.type}</p>
                </div>
              </div>
              {isEditing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      ⋮
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onMoveSection(index, 'up')}>
                      Move Up
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onMoveSection(index, 'down')}>
                      Move Down
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicateSection(section.id)}>
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDeleteSection(section.id)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="border-t p-4">
          <Button variant="outline" className="w-full" onClick={onAddSection}>
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
