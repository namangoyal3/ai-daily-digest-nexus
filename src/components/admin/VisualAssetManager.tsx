
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Grid2X2,
  Image,
  Upload,
  Search,
  Icons,
  Star,
  Clock,
  FolderOpen,
  Tag,
  Paintbrush
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock image data for demonstration
const mockImages = [
  { id: 1, src: "https://source.unsplash.com/random/300×200?sig=1", alt: "Image 1", type: "recent" },
  { id: 2, src: "https://source.unsplash.com/random/300×200?sig=2", alt: "Image 2", type: "recent" },
  { id: 3, src: "https://source.unsplash.com/random/300×200?sig=3", alt: "Image 3", type: "favorite" },
  { id: 4, src: "https://source.unsplash.com/random/300×200?sig=4", alt: "Image 4", type: "favorite" },
  { id: 5, src: "https://source.unsplash.com/random/300×200?sig=5", alt: "Image 5", type: "category1" },
  { id: 6, src: "https://source.unsplash.com/random/300×200?sig=6", alt: "Image 6", type: "category2" }
];

// Mock icon data
const mockIcons = [
  { id: 1, name: "home", category: "navigation" },
  { id: 2, name: "settings", category: "interface" },
  { id: 3, name: "user", category: "users" },
  { id: 4, name: "mail", category: "communication" },
  { id: 5, name: "phone", category: "communication" },
  { id: 6, name: "bell", category: "notification" }
];

interface VisualAssetManagerProps {
  onSelectImage?: (image: any) => void;
  onSelectIcon?: (icon: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const VisualAssetManager: React.FC<VisualAssetManagerProps> = ({
  onSelectImage,
  onSelectIcon,
  isOpen = false,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("images");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredImages = mockImages.filter(image => {
    if (selectedFilter === "all") return true;
    return image.type === selectedFilter;
  });

  const handleImageSelect = (image: any) => {
    if (onSelectImage) onSelectImage(image);
    if (onClose) onClose();
  };

  const handleIconSelect = (iconName: string) => {
    if (onSelectIcon) onSelectIcon(iconName);
    if (onClose) onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visual Asset Manager</CardTitle>
        <CardDescription>
          Manage images and icons for your content
        </CardDescription>
        <div className="mt-2 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Assets</DialogTitle>
                <DialogDescription>
                  Upload new images or icons to your content library
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag and drop files here, or click to select files
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    multiple
                  />
                  <Button variant="outline" className="mt-4">
                    Select Files
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="images" className="flex items-center">
              <Image className="mr-2 h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="icons" className="flex items-center">
              <Icons className="mr-2 h-4 w-4" />
              Icons
            </TabsTrigger>
          </TabsList>
          <TabsContent value="images" className="p-4">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
              >
                <Grid2X2 className="mr-2 h-4 w-4" />
                All
              </Button>
              <Button
                variant={selectedFilter === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("recent")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </Button>
              <Button
                variant={selectedFilter === "favorite" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("favorite")}
              >
                <Star className="mr-2 h-4 w-4" />
                Favorites
              </Button>
              <Button
                variant={selectedFilter === "category1" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("category1")}
              >
                <Tag className="mr-2 h-4 w-4" />
                Category 1
              </Button>
              <Button
                variant={selectedFilter === "category2" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("category2")}
              >
                <Tag className="mr-2 h-4 w-4" />
                Category 2
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Manage Categories
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div 
                  key={image.id}
                  className="relative aspect-square rounded-md overflow-hidden border border-gray-200 cursor-pointer hover:border-primary transition-colors group"
                  onClick={() => handleImageSelect(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="secondary">
                      Select
                    </Button>
                  </div>
                  {image.type === "favorite" && (
                    <div className="absolute top-2 right-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="icons" className="p-4">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <Button
                variant="default"
                size="sm"
              >
                <Grid2X2 className="mr-2 h-4 w-4" />
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                <Paintbrush className="mr-2 h-4 w-4" />
                Interface
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                <Paintbrush className="mr-2 h-4 w-4" />
                Navigation
              </Button>
              <Button
                variant="outline"
                size="sm"
              >
                <Paintbrush className="mr-2 h-4 w-4" />
                Communication
              </Button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
              {['home', 'settings', 'user', 'mail', 'phone', 'bell', 'heart', 'star', 
                'search', 'check', 'x', 'menu', 'plus', 'minus', 'lock', 'unlock'].map((icon) => (
                <div 
                  key={icon}
                  className="aspect-square rounded-md border border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                  onClick={() => handleIconSelect(icon)}
                >
                  <div className="text-gray-800 p-2">
                    {/* This would typically use dynamic icon loading, simplified for demo */}
                    <span className="text-2xl">{icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VisualAssetManager;
