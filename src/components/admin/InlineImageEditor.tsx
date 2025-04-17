
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Crop, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Image as ImageIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight 
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface InlineImageEditorProps {
  image: string;
  alt: string;
  onSave: (editedImage: { src: string; alt: string; width: string; height: string; alignment: string }) => void;
  onCancel: () => void;
}

const InlineImageEditor: React.FC<InlineImageEditorProps> = ({
  image,
  alt,
  onSave,
  onCancel
}) => {
  const [imageWidth, setImageWidth] = useState("100%");
  const [imageHeight, setImageHeight] = useState("auto");
  const [imageAlignment, setImageAlignment] = useState("center");
  const [imageAlt, setImageAlt] = useState(alt);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSave = () => {
    onSave({
      src: image,
      alt: imageAlt,
      width: imageWidth,
      height: imageHeight,
      alignment: imageAlignment
    });
  };

  const handleResize = (value: number[]) => {
    const size = value[0];
    setImageWidth(`${size}%`);
  };

  const handleAlignment = (alignment: string) => {
    setImageAlignment(alignment);
  };

  return (
    <div className="border rounded-md p-4 space-y-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Edit Image</h3>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
          <Button size="sm" onClick={handleSave}>Apply Changes</Button>
        </div>
      </div>

      <div className={`flex justify-${imageAlignment} mb-4`}>
        <img 
          ref={imageRef}
          src={image} 
          alt={imageAlt} 
          style={{ 
            width: imageWidth, 
            height: imageHeight, 
            maxWidth: "100%"
          }} 
          className="border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Alt Text</label>
          <input 
            type="text" 
            value={imageAlt} 
            onChange={(e) => setImageAlt(e.target.value)} 
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Size</label>
          <Slider
            defaultValue={[100]}
            max={100}
            step={5}
            onValueChange={handleResize}
            className="py-4"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block">Alignment</label>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={imageAlignment === "left" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => handleAlignment("left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={imageAlignment === "center" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => handleAlignment("center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Center</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={imageAlignment === "right" ? "default" : "outline"} 
                  size="icon"
                  onClick={() => handleAlignment("right")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block">Advanced Options</label>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Crop className="mr-2 h-4 w-4" />
            Crop
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <RotateCcw className="mr-2 h-4 w-4" />
            Rotate
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <ImageIcon className="mr-2 h-4 w-4" />
                Replace
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="text-sm">
                Replace with another image from your library
              </div>
              <Button className="w-full mt-4">Open Image Library</Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default InlineImageEditor;
