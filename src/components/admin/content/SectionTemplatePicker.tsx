
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sectionTemplates, SectionTemplate, ContentSection } from '@/types/contentTypes';
import { Plus } from 'lucide-react';

interface SectionTemplatePickerProps {
  onSelectTemplate: (section: ContentSection) => void;
}

export default function SectionTemplatePicker({ onSelectTemplate }: SectionTemplatePickerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<SectionTemplate | null>(null);

  const handleSelectTemplate = () => {
    if (selectedTemplate) {
      // Create a new section based on the template
      const newSection: ContentSection = {
        id: `section-${Date.now()}`,
        title: `New ${selectedTemplate.name} Section`,
        subtitle: 'Click to edit this subtitle',
        description: 'Click to edit this description',
        type: selectedTemplate.type,
        items: selectedTemplate.type === 'featureGrid' || selectedTemplate.type === 'blogCards' 
          ? [
              { id: `item-${Date.now()}-1`, title: 'Item 1', description: 'Description 1' },
              { id: `item-${Date.now()}-2`, title: 'Item 2', description: 'Description 2' },
            ] 
          : [],
        images: [{ src: '/placeholder.svg', alt: 'Placeholder image' }]
      };
      
      onSelectTemplate(newSection);
      setSelectedTemplate(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Section
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Choose a Section Template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
          {sectionTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer hover:border-primary transition-all ${
                selectedTemplate?.id === template.id ? 'border-2 border-primary' : ''
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-sm">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            disabled={!selectedTemplate}
            onClick={handleSelectTemplate}
          >
            Add Section
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
