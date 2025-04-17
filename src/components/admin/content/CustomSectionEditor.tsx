
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageEditor from './ImageEditor';
import { ContentSection, ListItem } from '@/types/contentTypes';
import { Plus, Trash, GripVertical } from 'lucide-react';

interface CustomSectionEditorProps {
  section: ContentSection;
  onUpdate: (updatedSection: ContentSection) => void;
  onDelete: () => void;
  disabled?: boolean;
}

export default function CustomSectionEditor({ 
  section, 
  onUpdate, 
  onDelete, 
  disabled = false 
}: CustomSectionEditorProps) {
  
  const handleChange = (field: keyof ContentSection, value: string) => {
    onUpdate({ ...section, [field]: value });
  };
  
  const handleImageChange = (images: any[]) => {
    onUpdate({ ...section, images });
  };
  
  const handleItemChange = (index: number, field: keyof ListItem, value: string) => {
    const updatedItems = [...(section.items || [])];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onUpdate({ ...section, items: updatedItems });
  };
  
  const addNewItem = () => {
    const newItem = { 
      id: `item-${Date.now()}`, 
      title: 'New Item', 
      description: 'Item description' 
    };
    onUpdate({ ...section, items: [...(section.items || []), newItem] });
  };
  
  const removeItem = (index: number) => {
    const updatedItems = (section.items || []).filter((_, i) => i !== index);
    onUpdate({ ...section, items: updatedItems });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">
          {section.title || 'Custom Section'}
        </CardTitle>
        <div className="flex space-x-2">
          {!disabled && (
            <>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={onDelete}
              >
                Delete Section
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor={`section-title-${section.id}`}>Section Title</Label>
            <Input
              id={`section-title-${section.id}`}
              value={section.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Section Title"
              disabled={disabled}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`section-subtitle-${section.id}`}>Subtitle</Label>
            <Input
              id={`section-subtitle-${section.id}`}
              value={section.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="Section Subtitle"
              disabled={disabled}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`section-description-${section.id}`}>Description</Label>
            <Textarea
              id={`section-description-${section.id}`}
              value={section.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Section Description"
              disabled={disabled}
              className="mt-1"
            />
          </div>
        </div>
        
        {/* Image Editor */}
        {section.images && (
          <ImageEditor 
            images={section.images}
            onChange={handleImageChange}
            disabled={disabled}
          />
        )}
        
        {/* Items Editor */}
        {section.items && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Items</h3>
              {!disabled && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addNewItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              )}
            </div>
            
            {section.items.map((item, index) => (
              <Card key={item.id} className="relative">
                {!disabled && (
                  <div className="absolute right-2 top-2 flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500"
                    >
                      <GripVertical className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeItem(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <CardContent className="p-4 space-y-3">
                  <div>
                    <Label htmlFor={`item-title-${item.id}`}>Title</Label>
                    <Input
                      id={`item-title-${item.id}`}
                      value={item.title}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      placeholder="Item Title"
                      disabled={disabled}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`item-description-${item.id}`}>Description</Label>
                    <Textarea
                      id={`item-description-${item.id}`}
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Item Description"
                      disabled={disabled}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
