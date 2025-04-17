
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface IconPickerProps {
  onSelectIcon: (iconName: string) => void;
  currentIcon?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({
  onSelectIcon,
  currentIcon
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  
  // Get all Lucide icons
  const iconNames = Object.keys(LucideIcons).filter(name => 
    name !== 'createLucideIcon' && 
    name !== 'default' && 
    !name.startsWith('__')
  );

  // Categories for organization
  const categories = {
    all: iconNames,
    interface: ['Settings', 'Bell', 'Search', 'Menu', 'X', 'Check', 'Plus', 'Minus'],
    navigation: ['Home', 'ArrowLeft', 'ArrowRight', 'ChevronDown', 'ChevronUp', 'ExternalLink'],
    communication: ['Mail', 'Phone', 'MessageCircle', 'Send', 'Share'],
    media: ['Image', 'Video', 'Music', 'Film', 'Camera'],
    weather: ['Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudSnow', 'Wind'],
    commerce: ['ShoppingCart', 'CreditCard', 'DollarSign', 'Tag', 'Package'],
    device: ['Smartphone', 'Tablet', 'Laptop', 'Desktop', 'Printer', 'Headphones']
  };

  // Filter icons by search term
  const filteredIcons = iconNames.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get icons for the current category
  const getCategoryIcons = () => {
    if (category === 'all') {
      return filteredIcons;
    }
    return filteredIcons.filter(icon => 
      categories[category as keyof typeof categories].includes(icon)
    );
  };

  // Render dynamic Lucide icon by name
  const renderIcon = (name: string) => {
    const IconComponent = (LucideIcons as any)[name];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {currentIcon ? renderIcon(currentIcon) : <LucideIcons.FileIcon className="h-4 w-4" />}
          {currentIcon || "Select Icon"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-8"
            />
            {searchTerm && (
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setCategory}>
          <div className="border-b overflow-x-auto">
            <TabsList className="p-0 flex">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="interface" className="flex-1">Interface</TabsTrigger>
              <TabsTrigger value="navigation" className="flex-1">Navigation</TabsTrigger>
              <TabsTrigger value="communication" className="flex-1">Comm</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-2 max-h-60 overflow-y-auto">
            <div className="grid grid-cols-6 gap-2">
              {getCategoryIcons().slice(0, 90).map((iconName) => (
                <Button
                  key={iconName}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-md hover:bg-muted"
                  onClick={() => onSelectIcon(iconName)}
                >
                  {renderIcon(iconName)}
                </Button>
              ))}
            </div>
            {getCategoryIcons().length === 0 && (
              <div className="text-center py-4 text-sm text-gray-500">
                No icons found matching "{searchTerm}"
              </div>
            )}
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
