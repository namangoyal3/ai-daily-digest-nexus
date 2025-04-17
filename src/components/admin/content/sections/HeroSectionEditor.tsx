
import { Input } from "@/components/ui/input";
import ImageEditor from "../ImageEditor";
import { ContentSection } from "@/types/contentTypes";

interface HeroSectionEditorProps {
  content: ContentSection;
  isEditing: boolean;
  onContentChange: (field: string, value: string) => void;
  onImagesChange: (images: any[]) => void;
}

export default function HeroSectionEditor({
  content,
  isEditing,
  onContentChange,
  onImagesChange,
}: HeroSectionEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input
          value={content.title || ''}
          onChange={(e) => onContentChange('title', e.target.value)}
          className="mt-1"
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Subtitle</label>
        <Input
          value={content.subtitle || ''}
          onChange={(e) => onContentChange('subtitle', e.target.value)}
          className="mt-1"
          disabled={!isEditing}
        />
      </div>
      <ImageEditor 
        images={content.images || []}
        onChange={onImagesChange}
        disabled={!isEditing}
      />
    </div>
  );
}
