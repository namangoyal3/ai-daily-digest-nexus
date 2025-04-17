
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ContentSection } from "@/types/contentTypes";

interface BenefitsSectionEditorProps {
  content: ContentSection;
  isEditing: boolean;
  onContentChange: (field: string, value: string) => void;
  onItemChange: (index: number, field: string, value: string) => void;
}

export default function BenefitsSectionEditor({
  content,
  isEditing,
  onContentChange,
  onItemChange,
}: BenefitsSectionEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Section Title</label>
        <Input
          value={content.title || ''}
          onChange={(e) => onContentChange('title', e.target.value)}
          className="mt-1"
          disabled={!isEditing}
        />
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Benefits</h3>
        {content.items?.map((benefit, index) => (
          <Card key={benefit.id || index}>
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-sm font-medium">Benefit Title</label>
                <Input
                  value={benefit.title}
                  onChange={(e) => onItemChange(index, 'title', e.target.value)}
                  placeholder="Benefit Title"
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={benefit.description}
                  onChange={(e) => onItemChange(index, 'description', e.target.value)}
                  placeholder="Benefit Description"
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
