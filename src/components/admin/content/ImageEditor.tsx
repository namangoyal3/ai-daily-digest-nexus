
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageContent } from '@/types/contentTypes';
import { ImagePlus, Trash, Pencil } from 'lucide-react';

interface ImageEditorProps {
  images: ImageContent[];
  onChange: (images: ImageContent[]) => void;
  disabled?: boolean;
}

export default function ImageEditor({ images, onChange, disabled = false }: ImageEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleImageChange = (index: number, field: keyof ImageContent, value: string | number) => {
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages[index], [field]: value };
    onChange(updatedImages);
  };

  const addNewImage = () => {
    const newImage = { src: "/placeholder.svg", alt: "New Image" };
    onChange([...images, newImage]);
    setEditingIndex(images.length);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Images</h3>
        {!disabled && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addNewImage}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {!disabled && (
                <div className="absolute top-2 right-2 space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => setEditingIndex(index === editingIndex ? null : index)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
                    onClick={() => removeImage(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {editingIndex === index && !disabled && (
              <CardContent className="p-4 space-y-3">
                <div>
                  <Label htmlFor={`image-src-${index}`}>Image URL</Label>
                  <Input
                    id={`image-src-${index}`}
                    value={image.src}
                    onChange={(e) => handleImageChange(index, "src", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor={`image-alt-${index}`}>Alt Text</Label>
                  <Input
                    id={`image-alt-${index}`}
                    value={image.alt}
                    onChange={(e) => handleImageChange(index, "alt", e.target.value)}
                    placeholder="Image description"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
