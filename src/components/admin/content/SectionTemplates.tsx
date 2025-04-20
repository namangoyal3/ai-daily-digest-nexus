
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface TemplateOption {
  id: string;
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  popular?: boolean;
  new?: boolean;
}

interface SectionTemplatesProps {
  templates: TemplateOption[];
  onSelect: (templateType: string) => void;
  selectedTemplate?: string;
}

export default function SectionTemplates({ 
  templates, 
  onSelect,
  selectedTemplate 
}: SectionTemplatesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card 
          key={template.id}
          className={`cursor-pointer transition-all hover:shadow-md relative ${
            selectedTemplate === template.id 
              ? "border-primary ring-2 ring-primary ring-opacity-50" 
              : "hover:border-primary"
          }`}
          onClick={() => onSelect(template.id)}
        >
          {selectedTemplate === template.id && (
            <span className="absolute top-2 right-2 rounded-full bg-primary p-1 text-white z-10">
              <Check className="h-4 w-4" />
            </span>
          )}
          {(template.popular || template.new) && (
            <div className="absolute top-2 left-2 z-10 flex gap-1">
              {template.popular && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                  Popular
                </Badge>
              )}
              {template.new && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  New
                </Badge>
              )}
            </div>
          )}
          <CardContent className="p-4">
            <div className="aspect-video w-full overflow-hidden rounded mb-3">
              <img 
                src={template.thumbnail} 
                alt={template.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <h3 className="font-medium text-lg">{template.title}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
            <div className="mt-2">
              <Badge variant="outline">{template.type}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
