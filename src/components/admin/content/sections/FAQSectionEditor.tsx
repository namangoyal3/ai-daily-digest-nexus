
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ContentSection } from "@/types/contentTypes";

interface FAQSectionEditorProps {
  content: ContentSection;
  isEditing: boolean;
  onContentChange: (field: string, value: string) => void;
  onItemChange: (index: number, field: string, value: string) => void;
}

export default function FAQSectionEditor({
  content,
  isEditing,
  onContentChange,
  onItemChange,
}: FAQSectionEditorProps) {
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
        <h3 className="text-lg font-medium">FAQ Items</h3>
        {content.items?.map((faq, index) => (
          <Card key={faq.id || index}>
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-sm font-medium">Question</label>
                <Input
                  value={faq.title}
                  onChange={(e) => onItemChange(index, 'title', e.target.value)}
                  placeholder="Question"
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  value={faq.description}
                  onChange={(e) => onItemChange(index, 'description', e.target.value)}
                  placeholder="Answer"
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
