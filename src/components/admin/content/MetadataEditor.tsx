
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "lucide-react";
import { PageContent } from "@/types/content";

interface MetadataEditorProps {
  content: PageContent;
  isEditing: boolean;
  onMetaChange: (field: keyof PageContent['meta'], value: string) => void;
}

export default function MetadataEditor({
  content,
  isEditing,
  onMetaChange,
}: MetadataEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Metadata</CardTitle>
        <CardDescription>
          Optimize your page for search engines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Meta Title</label>
          <Input
            value={content.meta.title}
            onChange={(e) => onMetaChange('title', e.target.value)}
            className="mt-1"
            disabled={!isEditing}
            maxLength={60}
          />
          <p className="text-xs text-gray-500 mt-1">
            {content.meta.title.length}/60 characters (Recommended: 50-60)
          </p>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Meta Description</label>
          <Textarea
            value={content.meta.description}
            onChange={(e) => onMetaChange('description', e.target.value)}
            className="mt-1"
            disabled={!isEditing}
            maxLength={160}
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            {content.meta.description.length}/160 characters (Recommended: 150-160)
          </p>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Keywords</label>
          <Input
            value={content.meta.keywords}
            onChange={(e) => onMetaChange('keywords', e.target.value)}
            className="mt-1"
            disabled={!isEditing}
            placeholder="comma, separated, keywords"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate keywords with commas (5-10 keywords recommended)
          </p>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">OG Image</label>
          <div className="mt-1 flex items-center space-x-3">
            {content.meta.ogImage && (
              <div className="relative h-20 w-40 rounded overflow-hidden border">
                <img 
                  src={content.meta.ogImage} 
                  alt="OG Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            {isEditing && (
              <Button variant="outline" size="sm">
                <Image className="mr-2 h-4 w-4" />
                {content.meta.ogImage ? 'Change Image' : 'Add OG Image'}
              </Button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 1200×630 pixels
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
