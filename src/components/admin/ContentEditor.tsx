import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Image, 
  icons, 
  Plus, 
  Trash2,
  Edit,
  AlignCenter, 
  AlignLeft, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline,
  List,
  ListOrdered,
  Link2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import VisualAssetManager from "./VisualAssetManager";
import InlineImageEditor from "./InlineImageEditor";
import IconPicker from "./IconPicker";

interface ContentEditorProps {
  sectionId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  items?: Array<any>;
  isEditing: boolean;
  onSectionChange: (sectionId: string, field: string, value: string) => void;
  onItemChange?: (sectionId: string, index: number, field: string, value: string) => void;
  onAddItem?: (sectionId: string) => void;
  onDeleteItem?: (sectionId: string, index: number) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  sectionId,
  title,
  subtitle,
  description,
  content,
  items,
  isEditing,
  onSectionChange,
  onItemChange,
  onAddItem,
  onDeleteItem
}) => {
  const [activeAssetTab, setActiveAssetTab] = useState("images");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAssetManagerOpen, setIsAssetManagerOpen] = useState(false);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  const [currentEditingField, setCurrentEditingField] = useState("");
  
  const handleOpenAssetManager = (field: string) => {
    setCurrentEditingField(field);
    setIsAssetManagerOpen(true);
  };

  const handleImageSelect = (image: any) => {
    setSelectedImage(image);
    setIsAssetManagerOpen(false);
    setIsImageEditorOpen(true);
  };

  const handleSaveEditedImage = (editedImage: any) => {
    const imageHtml = `<img src="${editedImage.src}" alt="${editedImage.alt}" style="width:${editedImage.width};height:${editedImage.height};margin:0 auto;" class="align-${editedImage.alignment}" />`;
    onSectionChange(sectionId, currentEditingField, imageHtml);
    setIsImageEditorOpen(false);
  };

  const handleIconSelect = (iconName: string) => {
    const iconTag = `[ICON:${iconName}]`;
    onSectionChange(sectionId, currentEditingField, iconTag);
  };

  const renderTextEditor = (field: string, value: string, multiline: boolean = false) => {
    const EditorComponent = multiline ? Textarea : Input;

    return (
      <div className="relative">
        <EditorComponent
          value={value || ""}
          onChange={(e) => onSectionChange(sectionId, field, e.target.value)}
          disabled={!isEditing}
          className="pr-24"
          rows={multiline ? 4 : 1}
        />
        {isEditing && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleOpenAssetManager(field)}
            >
              <Image className="h-4 w-4" />
            </Button>
            <IconPicker onSelectIcon={handleIconSelect} />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title || 'Content Editor'}</CardTitle>
          <CardDescription>Edit the content for this section</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {title !== undefined && (
          <div>
            <label className="text-sm font-medium mb-1 block">Title</label>
            {renderTextEditor('title', title)}
          </div>
        )}

        {subtitle !== undefined && (
          <div>
            <label className="text-sm font-medium mb-1 block">Subtitle</label>
            {renderTextEditor('subtitle', subtitle)}
          </div>
        )}

        {description !== undefined && (
          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            {renderTextEditor('description', description, true)}
          </div>
        )}

        {content !== undefined && (
          <div>
            <label className="text-sm font-medium mb-1 block">Content</label>
            <div className="border rounded-md">
              <div className="border-b bg-muted px-3 py-1.5 flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="h-4 w-px bg-gray-300 mx-1"></div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="h-4 w-px bg-gray-300 mx-1"></div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Link2 className="h-4 w-4" />
                </Button>
                <div className="flex-1"></div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center"
                  onClick={() => handleOpenAssetManager('content')}
                >
                  <Image className="mr-1 h-4 w-4" />
                  Insert Image
                </Button>
                <IconPicker onSelectIcon={(icon) => handleIconSelect(icon)} />
              </div>
              <Textarea
                value={content || ""}
                onChange={(e) => onSectionChange(sectionId, 'content', e.target.value)}
                disabled={!isEditing}
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={8}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        {items && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">Items</h3>
              {isEditing && onAddItem && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onAddItem(sectionId)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              )}
            </div>
            
            {items.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted py-2 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {item.title || `Item ${index + 1}`}
                    </CardTitle>
                    {isEditing && onDeleteItem && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteItem(sectionId, index)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Title</label>
                    {renderTextEditor(`items[${index}].title`, item.title || "")}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    {renderTextEditor(`items[${index}].description`, item.description || "", true)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      {/* Asset Manager Dialog */}
      <Dialog open={isAssetManagerOpen} onOpenChange={setIsAssetManagerOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Visual Asset Manager</DialogTitle>
            <DialogDescription>
              Select images and icons to enhance your content
            </DialogDescription>
          </DialogHeader>
          <VisualAssetManager 
            onSelectImage={handleImageSelect}
            onSelectIcon={handleIconSelect}
          />
        </DialogContent>
      </Dialog>

      {/* Image Editor Dialog */}
      <Dialog open={isImageEditorOpen} onOpenChange={setIsImageEditorOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Customize the selected image before inserting
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <InlineImageEditor
              image={selectedImage.src}
              alt={selectedImage.alt}
              onSave={handleSaveEditedImage}
              onCancel={() => setIsImageEditorOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ContentEditor;
