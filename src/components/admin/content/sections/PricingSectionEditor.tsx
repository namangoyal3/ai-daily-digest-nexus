
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import ImageEditor from "../ImageEditor";
import { ContentSection } from "@/types/contentTypes";

interface PricingSectionEditorProps {
  content: ContentSection;
  isEditing: boolean;
  onContentChange: (field: string, value: string) => void;
  onImagesChange: (images: any[]) => void;
}

export default function PricingSectionEditor({
  content,
  isEditing,
  onContentChange,
  onImagesChange,
}: PricingSectionEditorProps) {
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
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={content.description || ''}
          onChange={(e) => onContentChange('description', e.target.value)}
          className="mt-1"
          disabled={!isEditing}
        />
      </div>
      
      <Separator />
      
      <ImageEditor 
        images={content.images || []}
        onChange={onImagesChange}
        disabled={!isEditing}
      />
    </div>
  );
}
