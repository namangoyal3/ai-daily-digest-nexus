
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  GripVertical,
  Plus,
  FileEdit,
  Link,
  ExternalLink,
  MoveUp,
  MoveDown,
  RotateCcw
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import HomePagePreview from "@/components/admin/content/HomePagePreview";
import SectionTemplates from "@/components/admin/content/SectionTemplates";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CTAButton {
  id: string;
  text: string;
  url: string;
  variant: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size: "default" | "sm" | "lg" | "icon";
  isExternal: boolean;
}

interface ContentSection {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  alignment?: "left" | "center" | "right";
  background?: "white" | "light" | "dark" | "gradient";
  ctaButtons?: CTAButton[];
  items?: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
  }>;
}

interface PageContent {
  title: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  sections: ContentSection[];
}

// Initial template data
const defaultHomePage: PageContent = {
  title: "Home Page",
  meta: {
    title: "AI Hub: Newsletter, Marketplace & Courses for AI Professionals",
    description: "Your gateway to AI knowledge, tools, and skills development.",
    keywords: "AI, artificial intelligence, newsletter, marketplace, courses",
  },
  sections: [
    {
      id: "hero-1",
      type: "hero",
      title: "AI Daily Digest - Stay Ahead with AI Insights",
      subtitle: "Get curated AI news, breakthroughs, and analysis in a 5-minute daily read.",
      background: "gradient",
      ctaButtons: [
        {
          id: "cta-1",
          text: "Subscribe Now",
          url: "/ai-digest",
          variant: "default",
          size: "lg",
          isExternal: false
        },
        {
          id: "cta-2",
          text: "Learn More",
          url: "/about",
          variant: "outline",
          size: "lg",
          isExternal: false
        }
      ]
    },
    {
      id: "benefits-1",
      type: "features",
      title: "Why Choose AI Daily Digest",
      background: "light",
      items: [
        {
          id: "benefit-1",
          title: "Save Time",
          description: "Digest key AI developments in just 5 minutes daily."
        },
        {
          id: "benefit-2",
          title: "Access to Latest AI News",
          description: "Stay informed about the latest AI advancements."
        },
        {
          id: "benefit-3",
          title: "Personalized Recommendations",
          description: "Get tailored AI insights based on your interests."
        }
      ]
    },
    {
      id: "cta-section-1",
      type: "cta",
      title: "Ready to Stay Ahead in AI?",
      description: "Join thousands of professionals receiving our AI insights every day.",
      background: "dark",
      ctaButtons: [
        {
          id: "cta-section-button-1",
          text: "Subscribe Today",
          url: "/subscribe",
          variant: "default",
          size: "lg",
          isExternal: false
        }
      ]
    }
  ]
};

// Section template options
const sectionTemplates = [
  {
    id: "hero",
    type: "hero",
    title: "Hero Section",
    description: "Large banner section with heading, subheading and CTA buttons",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "features",
    type: "features",
    title: "Features Section",
    description: "Highlight key features or benefits with icons and text",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "cta",
    type: "cta",
    title: "Call to Action",
    description: "Prominent section with compelling CTA buttons",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "content",
    type: "content",
    title: "Content Block",
    description: "Text with optional image, flexible layout",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "testimonials",
    type: "testimonials",
    title: "Testimonials",
    description: "Customer testimonials with quotes and attribution",
    thumbnail: "/placeholder.svg"
  }
];

export default function AdminHomePage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for homepage content
  const [content, setContent] = useState<PageContent>(() => {
    const savedContent = localStorage.getItem("homePageContent");
    return savedContent ? JSON.parse(savedContent) : defaultHomePage;
  });
  
  // Working draft state
  const [draftContent, setDraftContent] = useState<PageContent>(content);
  
  // UI state
  const [activeTab, setActiveTab] = useState("content");
  const [activeSectionId, setActiveSectionId] = useState(content.sections[0]?.id || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAddSectionDialog, setShowAddSectionDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [currentEditingCTA, setCurrentEditingCTA] = useState<{sectionId: string, ctaId: string} | null>(null);

  useEffect(() => {
    // If there's no active section but there are sections, set the first one active
    if (draftContent.sections.length > 0 && !activeSectionId) {
      setActiveSectionId(draftContent.sections[0].id);
    }
  }, [draftContent.sections, activeSectionId]);

  const handleEdit = () => {
    setIsEditing(true);
    setDraftContent({...content});
  };

  const handleSave = () => {
    setContent(draftContent);
    localStorage.setItem("homePageContent", JSON.stringify(draftContent));
    setIsEditing(false);
    toast({
      title: "Home Page Updated",
      description: "Your changes have been saved successfully."
    });
  };

  const handleCancel = () => {
    setDraftContent(content);
    setIsEditing(false);
    toast({
      title: "Changes Discarded",
      description: "Your changes have been discarded."
    });
  };

  const handleMetaChange = (field: keyof PageContent['meta'], value: string) => {
    setDraftContent(prev => ({
      ...prev,
      meta: {
        ...prev.meta,
        [field]: value
      }
    }));
  };

  const handleSectionChange = (sectionId: string, field: string, value: string | any) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleItemChange = (sectionId: string, itemId: string, field: string, value: string) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: section.items?.map((item) => 
                item.id === itemId ? { ...item, [field]: value } : item
              )
            } 
          : section
      )
    }));
  };

  const handleAddItem = (sectionId: string) => {
    const newItemId = `item-${Date.now()}`;
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: [
                ...(section.items || []), 
                { id: newItemId, title: "New Item", description: "Description goes here" }
              ]
            } 
          : section
      )
    }));
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: section.items?.filter(item => item.id !== itemId)
            } 
          : section
      )
    }));
  };

  const handleAddSection = (templateType: string) => {
    const template = sectionTemplates.find(t => t.id === templateType);
    if (!template) return;
    
    const newSectionId = `${templateType}-${Date.now()}`;
    let newSection: ContentSection;
    
    // Create new section based on template type
    switch(templateType) {
      case "hero":
        newSection = {
          id: newSectionId,
          type: templateType,
          title: "New Hero Section",
          subtitle: "Add your compelling subtitle here",
          background: "gradient",
          ctaButtons: [
            {
              id: `cta-${Date.now()}`,
              text: "Primary Action",
              url: "/",
              variant: "default",
              size: "lg",
              isExternal: false
            }
          ]
        };
        break;
      case "features":
        newSection = {
          id: newSectionId,
          type: templateType,
          title: "Features Section",
          background: "light",
          items: [
            {
              id: `feature-item-${Date.now()}`,
              title: "Feature 1",
              description: "Describe your feature here."
            },
            {
              id: `feature-item-${Date.now() + 1}`,
              title: "Feature 2",
              description: "Describe your feature here."
            }
          ]
        };
        break;
      case "cta":
        newSection = {
          id: newSectionId,
          type: templateType,
          title: "Call to Action",
          description: "Add your compelling CTA description here",
          background: "dark",
          ctaButtons: [
            {
              id: `cta-${Date.now()}`,
              text: "Take Action",
              url: "/",
              variant: "default",
              size: "lg",
              isExternal: false
            }
          ]
        };
        break;
      case "content":
        newSection = {
          id: newSectionId,
          type: templateType,
          title: "Content Section",
          description: "Add your content here. This section is flexible for various types of content.",
          background: "white"
        };
        break;
      case "testimonials":
        newSection = {
          id: newSectionId,
          type: templateType,
          title: "What Our Users Say",
          background: "light",
          items: [
            {
              id: `testimonial-${Date.now()}`,
              title: "John Doe",
              description: "This product has completely transformed how I work. Highly recommended!"
            }
          ]
        };
        break;
      default:
        newSection = {
          id: newSectionId,
          type: "content",
          title: "New Section",
          background: "white"
        };
    }
    
    setDraftContent(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    
    setActiveSectionId(newSectionId);
    setShowAddSectionDialog(false);
  };

  const handleDuplicateSection = (sectionIndex: number) => {
    const sectionToDuplicate = draftContent.sections[sectionIndex];
    
    // Deep clone the section and generate new IDs
    const clonedSection = JSON.parse(JSON.stringify(sectionToDuplicate));
    const newSectionId = `${clonedSection.type}-${Date.now()}`;
    clonedSection.id = newSectionId;
    
    // Generate new IDs for CTAs and items
    if (clonedSection.ctaButtons) {
      clonedSection.ctaButtons = clonedSection.ctaButtons.map((cta: CTAButton) => ({
        ...cta,
        id: `cta-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      }));
    }
    
    if (clonedSection.items) {
      clonedSection.items = clonedSection.items.map((item: any) => ({
        ...item,
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      }));
    }
    
    const newSections = [...draftContent.sections];
    newSections.splice(sectionIndex + 1, 0, clonedSection);
    
    setDraftContent(prev => ({
      ...prev,
      sections: newSections
    }));
    
    toast({
      title: "Section Duplicated",
      description: "The section has been duplicated successfully."
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    if (draftContent.sections.length <= 1) {
      toast({
        title: "Cannot Delete",
        description: "You must have at least one section on the homepage.",
        variant: "destructive"
      });
      return;
    }
    
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
    
    // Set a new active section if the current one was deleted
    if (activeSectionId === sectionId) {
      const remainingSections = draftContent.sections.filter(section => section.id !== sectionId);
      if (remainingSections.length > 0) {
        setActiveSectionId(remainingSections[0].id);
      }
    }
    
    toast({
      title: "Section Deleted",
      description: "The section has been removed from the homepage."
    });
  };

  const handleMoveSectionUp = (index: number) => {
    if (index === 0) return;
    
    const newSections = [...draftContent.sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    
    setDraftContent(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  const handleMoveSectionDown = (index: number) => {
    if (index === draftContent.sections.length - 1) return;
    
    const newSections = [...draftContent.sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    
    setDraftContent(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  const handleAddCTA = (sectionId: string) => {
    const newCTA: CTAButton = {
      id: `cta-${Date.now()}`,
      text: "New Button",
      url: "/",
      variant: "default",
      size: "default",
      isExternal: false
    };
    
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              ctaButtons: [...(section.ctaButtons || []), newCTA]
            } 
          : section
      )
    }));
  };

  const handleEditCTA = (sectionId: string, ctaId: string, field: keyof CTAButton, value: any) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              ctaButtons: section.ctaButtons?.map(cta => 
                cta.id === ctaId ? { ...cta, [field]: value } : cta
              )
            } 
          : section
      )
    }));
  };

  const handleDeleteCTA = (sectionId: string, ctaId: string) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              ctaButtons: section.ctaButtons?.filter(cta => cta.id !== ctaId)
            } 
          : section
      )
    }));
  };

  const getActiveSection = () => {
    return draftContent.sections.find(section => section.id === activeSectionId);
  };

  return (
    <>
      <Helmet>
        <title>Edit Homepage - Admin Dashboard</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <RouterLink to="/admin">
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </RouterLink>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Editing: Homepage</h1>
                  <p className="text-muted-foreground">
                    Manage your website's homepage content
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Show Preview
                    </>
                  )}
                </Button>
                
                {!isEditing ? (
                  <Button onClick={handleEdit}>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit Content
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className={`grid grid-cols-1 ${showPreview ? 'lg:grid-cols-2' : ''} gap-6`}>
              <div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div className="grid grid-cols-12 gap-6">
                      {/* Section Navigator */}
                      <Card className="col-span-12">
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>Page Sections</CardTitle>
                            <CardDescription>
                              Manage the sections on your homepage
                            </CardDescription>
                          </div>
                          {isEditing && (
                            <Dialog open={showAddSectionDialog} onOpenChange={setShowAddSectionDialog}>
                              <DialogTrigger asChild>
                                <Button>
                                  <Plus className="mr-2 h-4 w-4" />
                                  Add Section
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Add New Section</DialogTitle>
                                  <DialogDescription>
                                    Choose a template for your new section
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                                  {sectionTemplates.map(template => (
                                    <div 
                                      key={template.id}
                                      className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-secondary/20 transition-colors"
                                      onClick={() => handleAddSection(template.id)}
                                    >
                                      <img 
                                        src={template.thumbnail} 
                                        alt={template.title}
                                        className="w-full h-24 object-cover rounded mb-2"
                                      />
                                      <h3 className="font-medium">{template.title}</h3>
                                      <p className="text-xs text-muted-foreground">{template.description}</p>
                                    </div>
                                  ))}
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowAddSectionDialog(false)}>
                                    Cancel
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="max-h-[300px] overflow-auto">
                            {draftContent.sections.map((section, index) => (
                              <div 
                                key={section.id}
                                className={`flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-gray-50 ${activeSectionId === section.id ? 'bg-gray-100' : ''}`}
                                onClick={() => setActiveSectionId(section.id)}
                              >
                                <div className="flex items-center space-x-3">
                                  <GripVertical className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="font-medium">{section.title || `${section.type} Section`}</p>
                                    <p className="text-xs text-gray-500">{section.type}</p>
                                  </div>
                                </div>
                                
                                {isEditing && (
                                  <div className="flex items-center space-x-1">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      disabled={index === 0}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMoveSectionUp(index);
                                      }}
                                    >
                                      <MoveUp className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      disabled={index === draftContent.sections.length - 1}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMoveSectionDown(index);
                                      }}
                                    >
                                      <MoveDown className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDuplicateSection(index);
                                      }}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteSection(section.id);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Section Editor */}
                      {activeSectionId && getActiveSection() && (
                        <Card className="col-span-12">
                          <CardHeader>
                            <CardTitle>
                              {getActiveSection()?.title || 'Section Editor'}
                            </CardTitle>
                            <CardDescription>
                              Edit the content for this {getActiveSection()?.type} section
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Basic Section Fields */}
                            <div>
                              <label className="text-sm font-medium mb-1 block">Section Title</label>
                              <Input
                                value={getActiveSection()?.title || ''}
                                onChange={(e) => handleSectionChange(activeSectionId, 'title', e.target.value)}
                                className="mt-1"
                                disabled={!isEditing}
                                placeholder="Section title"
                              />
                            </div>
                            
                            {getActiveSection()?.subtitle !== undefined && (
                              <div>
                                <label className="text-sm font-medium mb-1 block">Subtitle</label>
                                <Input
                                  value={getActiveSection()?.subtitle || ''}
                                  onChange={(e) => handleSectionChange(activeSectionId, 'subtitle', e.target.value)}
                                  className="mt-1"
                                  disabled={!isEditing}
                                  placeholder="Section subtitle"
                                />
                              </div>
                            )}
                            
                            {getActiveSection()?.description !== undefined && (
                              <div>
                                <label className="text-sm font-medium mb-1 block">Description</label>
                                <Textarea
                                  value={getActiveSection()?.description || ''}
                                  onChange={(e) => handleSectionChange(activeSectionId, 'description', e.target.value)}
                                  className="mt-1"
                                  disabled={!isEditing}
                                  rows={3}
                                  placeholder="Section description"
                                />
                              </div>
                            )}

                            <div>
                              <label className="text-sm font-medium mb-1 block">Background Style</label>
                              <Select
                                value={getActiveSection()?.background || 'white'}
                                onValueChange={(value) => handleSectionChange(activeSectionId, 'background', value)}
                                disabled={!isEditing}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select background style" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="white">White</SelectItem>
                                  <SelectItem value="light">Light Gray</SelectItem>
                                  <SelectItem value="dark">Dark</SelectItem>
                                  <SelectItem value="gradient">Gradient</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {/* CTA Buttons */}
                            {getActiveSection()?.ctaButtons && (
                              <div className="space-y-4 border-t pt-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-md font-medium">Call-to-Action Buttons</h3>
                                  {isEditing && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleAddCTA(activeSectionId)}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Button
                                    </Button>
                                  )}
                                </div>
                                
                                <div className="space-y-4">
                                  {getActiveSection()?.ctaButtons?.map((cta) => (
                                    <div key={cta.id} className="border rounded-lg p-4">
                                      <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium">Button: {cta.text}</h4>
                                        {isEditing && (
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleDeleteCTA(activeSectionId, cta.id)}
                                          >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        )}
                                      </div>
                                      
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Button Text</label>
                                          <Input
                                            value={cta.text}
                                            onChange={(e) => handleEditCTA(activeSectionId, cta.id, 'text', e.target.value)}
                                            className="mt-1"
                                            disabled={!isEditing}
                                          />
                                        </div>
                                        
                                        <div className="flex space-x-2 items-end">
                                          <div className="flex-1">
                                            <label className="text-sm font-medium mb-1 block">Link URL</label>
                                            <div className="relative mt-1">
                                              <Input
                                                value={cta.url}
                                                onChange={(e) => handleEditCTA(activeSectionId, cta.id, 'url', e.target.value)}
                                                className="pr-8"
                                                disabled={!isEditing}
                                              />
                                              <Link className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-2 mb-1">
                                            <Label htmlFor={`external-${cta.id}`} className="text-sm">
                                              External
                                            </Label>
                                            <Switch
                                              id={`external-${cta.id}`}
                                              checked={cta.isExternal}
                                              onCheckedChange={(checked) => handleEditCTA(activeSectionId, cta.id, 'isExternal', checked)}
                                              disabled={!isEditing}
                                            />
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Button Style</label>
                                          <Select
                                            value={cta.variant}
                                            onValueChange={(value) => handleEditCTA(activeSectionId, cta.id, 'variant', value)}
                                            disabled={!isEditing}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="default">Primary</SelectItem>
                                              <SelectItem value="secondary">Secondary</SelectItem>
                                              <SelectItem value="outline">Outline</SelectItem>
                                              <SelectItem value="ghost">Ghost</SelectItem>
                                              <SelectItem value="link">Link</SelectItem>
                                              <SelectItem value="destructive">Destructive</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Button Size</label>
                                          <Select
                                            value={cta.size}
                                            onValueChange={(value) => handleEditCTA(activeSectionId, cta.id, 'size', value)}
                                            disabled={!isEditing}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="default">Default</SelectItem>
                                              <SelectItem value="sm">Small</SelectItem>
                                              <SelectItem value="lg">Large</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Items List */}
                            {getActiveSection()?.items && (
                              <div className="space-y-4 border-t pt-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-md font-medium">Items</h3>
                                  {isEditing && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleAddItem(activeSectionId)}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Item
                                    </Button>
                                  )}
                                </div>
                                
                                <div className="space-y-4">
                                  {getActiveSection()?.items?.map((item) => (
                                    <div key={item.id} className="border rounded-lg p-4">
                                      <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium">{item.title}</h4>
                                        {isEditing && (
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleDeleteItem(activeSectionId, item.id)}
                                          >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                          </Button>
                                        )}
                                      </div>
                                      <div className="space-y-4">
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Title</label>
                                          <Input
                                            value={item.title}
                                            onChange={(e) => handleItemChange(activeSectionId, item.id, 'title', e.target.value)}
                                            className="mt-1"
                                            disabled={!isEditing}
                                          />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Description</label>
                                          <Textarea
                                            value={item.description}
                                            onChange={(e) => handleItemChange(activeSectionId, item.id, 'description', e.target.value)}
                                            className="mt-1"
                                            disabled={!isEditing}
                                            rows={3}
                                          />
                                        </div>
                                        {item.imageUrl !== undefined && (
                                          <div>
                                            <label className="text-sm font-medium mb-1 block">Image URL</label>
                                            <Input
                                              value={item.imageUrl || ''}
                                              onChange={(e) => handleItemChange(activeSectionId, item.id, 'imageUrl', e.target.value)}
                                              className="mt-1"
                                              disabled={!isEditing}
                                              placeholder="https://example.com/image.jpg"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="seo">
                    <Card>
                      <CardHeader>
                        <CardTitle>SEO & Metadata</CardTitle>
                        <CardDescription>
                          Optimize your homepage for search engines
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Meta Title</label>
                          <Input
                            value={draftContent.meta.title}
                            onChange={(e) => handleMetaChange('title', e.target.value)}
                            className="mt-1"
                            disabled={!isEditing}
                            maxLength={60}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {draftContent.meta.title.length}/60 characters (Recommended: 50-60)
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Meta Description</label>
                          <Textarea
                            value={draftContent.meta.description}
                            onChange={(e) => handleMetaChange('description', e.target.value)}
                            className="mt-1"
                            disabled={!isEditing}
                            maxLength={160}
                            rows={3}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {draftContent.meta.description.length}/160 characters (Recommended: 150-160)
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Keywords</label>
                          <Input
                            value={draftContent.meta.keywords}
                            onChange={(e) => handleMetaChange('keywords', e.target.value)}
                            className="mt-1"
                            disabled={!isEditing}
                            placeholder="comma, separated, keywords"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Separate keywords with commas (5-10 keywords recommended)
                          </p>
                        </div>
                        
                        <div className="mt-6 border rounded-lg p-4">
                          <h3 className="font-semibold mb-2">Search Preview</h3>
                          <div className="p-4 border rounded bg-white">
                            <p className="text-blue-600 text-lg font-medium truncate">
                              {draftContent.meta.title}
                            </p>
                            <p className="text-green-700 text-sm">
                              https://yourwebsite.com/
                            </p>
                            <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                              {draftContent.meta.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              {showPreview && (
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="border-b p-2 flex justify-between items-center bg-gray-50">
                    <h3 className="font-medium text-sm">Live Preview</h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 15L21 3" stroke="currentColor" strokeWidth="2"/>
                          <path d="M13 3H21V11" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-auto" style={{ height: 'calc(100vh - 16rem)' }}>
                    <HomePagePreview content={draftContent} isEditing={isEditing} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
