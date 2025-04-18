
import { Card, CardContent } from "@/components/ui/card";

interface TemplateOption {
  id: string;
  type: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SectionTemplatesProps {
  templates: TemplateOption[];
  onSelect: (templateType: string) => void;
}

export default function SectionTemplates({ templates, onSelect }: SectionTemplatesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card 
          key={template.id}
          className="cursor-pointer hover:border-primary hover:shadow-md transition-all"
          onClick={() => onSelect(template.id)}
        >
          <CardContent className="p-4">
            <img 
              src={template.thumbnail} 
              alt={template.title}
              className="w-full h-32 object-cover mb-3 rounded"
            />
            <h3 className="font-medium text-lg">{template.title}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
