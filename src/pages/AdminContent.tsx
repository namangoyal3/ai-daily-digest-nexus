import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import ContentEditor from "@/components/admin/ContentEditor";
import { 
  ArrowLeft, 
  Save, 
  History, 
  Copy, 
  Eye, 
  Trash2, 
  GripVertical,
  Plus,
  FileEdit,
  ArrowDownUp,
  Image
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ContentItem {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

interface ContentSection {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  backgroundImage?: string;
  items?: Array<ContentItem>;
}

interface PageContent {
  pageId: string;
  title: string;
  path: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
  };
  sections: ContentSection[];
}

export default function AdminContent() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get("page") || "1"; // Default to home page
  const [activeTab, setActiveTab] = useState("content");
  const [activeSectionId, setActiveSectionId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const pageTypes: Record<string, PageContent> = {
    "1": {
      pageId: "1",
      title: "Home Page",
      path: "/",
      meta: {
        title: "AI Hub: Newsletter, Marketplace & Courses for AI Professionals",
        description: "Your gateway to AI knowledge, tools, and skills development.",
        keywords: "AI, artificial intelligence, newsletter, marketplace, courses",
        ogImage: "https://source.unsplash.com/random/1200×630?ai",
      },
      sections: [
        {
          id: "hero",
          type: "hero",
          title: "AI Daily Digest - Stay Ahead with AI Insights",
          subtitle: "Get curated AI news, breakthroughs, and analysis in a 5-minute daily read.",
          backgroundImage: "https://source.unsplash.com/random/1200×600?technology"
        },
        {
          id: "benefits",
          type: "benefits",
          title: "Why Choose AI Daily Digest",
          items: [
            {
              title: "Save Time",
              description: "Digest key AI developments in just 5 minutes daily.",
              icon: "Clock"
            },
            {
              title: "Access to Latest AI News",
              description: "Stay informed about the latest AI advancements.",
              icon: "Newspaper"
            },
            {
              title: "Personalized Recommendations",
              description: "Get tailored AI insights based on your interests.",
              icon: "UserCheck"
            }
          ]
        },
        {
          id: "pricing",
          type: "pricing",
          title: "Simple, Transparent Pricing",
          description: "Choose the plan that's right for you"
        },
        {
          id: "faq",
          type: "faq",
          title: "Frequently Asked Questions",
          items: [
            {
              title: "What is AI Daily Digest?",
              description: "A curated newsletter delivering the most important AI updates."
            },
            {
              title: "How often do I receive updates?",
              description: "You receive updates daily."
            },
            {
              title: "Can I unsubscribe?",
              description: "Yes, you can unsubscribe at any time."
            }
          ]
        }
      ]
    },
    "2": {
      pageId: "2",
      title: "AI Daily Digest",
      path: "/ai-digest",
      meta: {
        title: "AI Daily Digest - Stay Ahead with AI Insights",
        description: "Get curated AI news, breakthroughs, and analysis in a 5-minute daily read.",
        keywords: "AI news, newsletter, daily AI updates, AI digest",
        ogImage: "https://source.unsplash.com/random/1200×630?newsletter",
      },
      sections: [
        {
          id: "hero",
          type: "hero",
          title: "AI Daily Digest - Daily AI Insights",
          subtitle: "Stay informed with curated AI news delivered to your inbox",
          backgroundImage: "https://source.unsplash.com/random/1200×600?news"
        },
        {
          id: "benefits",
          type: "benefits",
          title: "Why Subscribe",
          items: [
            {
              title: "Curated Content",
              description: "Hand-picked AI news and analysis",
              icon: "Check"
            },
            {
              title: "Time-Saving",
              description: "Get all important updates in one place",
              icon: "Clock"
            },
            {
              title: "Expert Commentary",
              description: "Insights from AI professionals and researchers",
              icon: "MessageSquare"
            }
          ]
        }
      ]
    },
    "3": {
      pageId: "3",
      title: "AI Agents",
      path: "/ai-agents",
      meta: {
        title: "AI Agents Directory - Discover and Compare AI Agents",
        description: "Explore our comprehensive directory of AI agents.",
        keywords: "AI agents, AI tools, chatbots, automation",
        ogImage: "https://source.unsplash.com/random/1200×630?robot",
      },
      sections: [
        {
          id: "hero",
          type: "hero",
          title: "AI Agents Directory",
          subtitle: "Discover powerful AI agents to enhance your productivity",
          backgroundImage: "https://source.unsplash.com/random/1200×600?ai"
        },
        {
          id: "featured",
          type: "featured-agents",
          title: "Featured AI Agents",
          description: "Explore our top-rated AI assistants"
        }
      ]
    },
    "4": {
      pageId: "4",
      title: "AI Courses",
      path: "/ai-courses",
      meta: {
        title: "AI Education Hub: Courses, Guides & Resources for AI Learning",
        description: "Comprehensive AI education resources including courses, guides, and handbooks.",
        keywords: "AI courses, AI education, learn AI, AI training",
        ogImage: "https://source.unsplash.com/random/1200×630?education",
      },
      sections: [
        {
          id: "hero",
          type: "hero",
          title: "AI Education Hub",
          subtitle: "Master artificial intelligence with our comprehensive courses",
          backgroundImage: "https://source.unsplash.com/random/1200×600?education"
        },
        {
          id: "curriculum",
          type: "curriculum",
          title: "AI Curriculum Overview",
          description: "Structured learning paths from beginner to advanced"
        }
      ]
    }
  };

  const [content, setContent] = useState<PageContent>(pageTypes[pageId]);
  const [draftContent, setDraftContent] = useState<PageContent>(content);
  
  useEffect(() => {
    const savedContent = localStorage.getItem(`pageContent-${pageId}`);
    let newContent;
    
    if (savedContent) {
      try {
        newContent = JSON.parse(savedContent);
      } catch (e) {
        newContent = pageTypes[pageId] || pageTypes["1"];
      }
    } else {
      newContent = pageTypes[pageId] || pageTypes["1"];
    }
    
    setContent(newContent);
    setDraftContent(newContent);
    setActiveSectionId(newContent.sections[0]?.id || "");
  }, [pageId]);

  const handleEdit = () => {
    setIsEditing(true);
    setDraftContent({...content});
  };

  const handleSave = () => {
    setContent(draftContent);
    localStorage.setItem(`pageContent-${pageId}`, JSON.stringify(draftContent));
    setIsEditing(false);
    toast({
      title: "Content Updated",
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

  const handleSectionChange = (sectionId: string, field: string, value: string) => {
    if (field.includes('[') && field.includes(']')) {
      const matches = field.match(/(\w+)\[(\d+)\]\.(\w+)/);
      
      if (matches && matches.length === 4) {
        const [_, arrayField, indexStr, subField] = matches;
        const index = parseInt(indexStr);
        
        setDraftContent(prev => ({
          ...prev,
          sections: prev.sections.map(section => {
            if (section.id === sectionId) {
              const updatedItems = [...(section[arrayField as keyof ContentSection] as any[] || [])];
              updatedItems[index] = {
                ...updatedItems[index],
                [subField]: value
              };
              
              return {
                ...section,
                [arrayField]: updatedItems
              };
            }
            return section;
          })
        }));
        return;
      }
    }
    
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleItemChange = (sectionId: string, index: number, field: string, value: string) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: section.items?.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
              )
            } 
          : section
      )
    }));
  };

  const handleAddItem = (sectionId: string) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: [
                ...(section.items || []), 
                { title: "New Item", description: "Description goes here" }
              ]
            } 
          : section
      )
    }));
  };

  const handleDeleteItem = (sectionId: string, index: number) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              items: section.items?.filter((_, i) => i !== index)
            } 
          : section
      )
    }));
  };

  const handleAddSection = () => {
    const newSectionId = `section-${Date.now()}`;
    setDraftContent(prev => ({
      ...prev,
      sections: [
        ...prev.sections, 
        { 
          id: newSectionId, 
          type: "custom",
          title: "New Section", 
          description: "Section description goes here"
        }
      ]
    }));
    setActiveSectionId(newSectionId);
  };

  const handleDeleteSection = (sectionId: string) => {
    setDraftContent(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
    
    if (activeSectionId === sectionId) {
      setActiveSectionId(draftContent.sections[0]?.id || "");
    }
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

  const handleDuplicateSection = (index: number) => {
    const sectionToDuplicate = draftContent.sections[index];
    const newSection = {
      ...JSON.parse(JSON.stringify(sectionToDuplicate)),
      id: `${sectionToDuplicate.id}-copy-${Date.now()}`
    };
    
    const newSections = [...draftContent.sections];
    newSections.splice(index + 1, 0, newSection);
    
    setDraftContent(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  return (
    <>
      <Helmet>
        <title>Content Management - {content.title}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Link to="/admin/pages">
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Editing: {content.title}</h1>
                  <p className="text-muted-foreground">
                    Page path: {content.path}
                  </p>
                </div>
              </div>
              <div className="space-x-2">
                {!isEditing && (
                  <Button onClick={handleEdit}>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit Content
                  </Button>
                )}
                {isEditing && (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
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

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
                <TabsTrigger value="history">Version History</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Page Sections</CardTitle>
                        <CardDescription>
                          Manage the sections on this page
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="max-h-[500px] overflow-auto">
                          {draftContent.sections.map((section, index) => (
                            <div 
                              key={section.id}
                              className={`flex items-center justify-between px-4 py-2 border-b cursor-pointer hover:bg-gray-50 ${activeSectionId === section.id ? 'bg-gray-100' : ''}`}
                              onClick={() => setActiveSectionId(section.id)}
                            >
                              <div className="flex items-center space-x-3">
                                <GripVertical className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="font-medium">{section.title || section.type}</p>
                                  <p className="text-xs text-gray-500">{section.type}</p>
                                </div>
                              </div>
                              {isEditing && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      ⋮
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleMoveSectionUp(index)}>
                                      Move Up
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleMoveSectionDown(index)}>
                                      Move Down
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleDuplicateSection(index)}>
                                      <Copy className="mr-2 h-4 w-4" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleDeleteSection(section.id)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      {isEditing && (
                        <CardFooter className="border-t p-4">
                          <Button variant="outline" className="w-full" onClick={handleAddSection}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Section
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  </div>
                  
                  <div className="col-span-12 md:col-span-9">
                    {activeSectionId && draftContent.sections.find(s => s.id === activeSectionId) && (
                      <ContentEditor
                        sectionId={activeSectionId}
                        {...draftContent.sections.find(s => s.id === activeSectionId)!}
                        isEditing={isEditing}
                        onSectionChange={handleSectionChange}
                        onItemChange={handleItemChange}
                        onAddItem={handleAddItem}
                        onDeleteItem={handleDeleteItem}
                      />
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo">
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

                    <div>
                      <label className="text-sm font-medium mb-1 block">OG Image</label>
                      <div className="mt-1 flex items-center space-x-3">
                        {draftContent.meta.ogImage && (
                          <div className="relative h-20 w-40 rounded overflow-hidden border">
                            <img 
                              src={draftContent.meta.ogImage} 
                              alt="OG Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            <Image className="mr-2 h-4 w-4" />
                            {draftContent.meta.ogImage ? 'Change Image' : 'Add OG Image'}
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended size: 1200×630 pixels
                      </p>
                    </div>
                    
                    <div className="mt-6 border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Search Preview</h3>
                      <div className="p-4 border rounded bg-white">
                        <p className="text-blue-600 text-lg font-medium truncate">
                          {draftContent.meta.title}
                        </p>
                        <p className="text-green-700 text-sm">
                          {`https://yourwebsite.com${draftContent.path}`}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                          {draftContent.meta.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Version History</CardTitle>
                    <CardDescription>
                      View and restore previous versions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-2 border rounded-lg bg-gray-50">
                        <History className="h-5 w-5 mr-3 text-blue-500" />
                        <div className="flex-1">
                          <p className="font-medium">Current Version</p>
                          <p className="text-sm text-gray-500">Last saved: 2025-04-17 10:45 AM</p>
                        </div>
                        <Button variant="outline" size="sm" disabled>Current</Button>
                      </div>
                      
                      <div className="flex items-center p-2 border rounded-lg">
                        <History className="h-5 w-5 mr-3 text-gray-400" />
                        <div className="flex-1">
                          <p className="font-medium">Previous Version</p>
                          <p className="text-sm text-gray-500">Saved: 2025-04-16 3:22 PM</p>
                        </div>
                        <Button variant="outline" size="sm">Restore</Button>
                      </div>
                      
                      <div className="flex items-center p-2 border rounded-lg">
                        <History className="h-5 w-5 mr-3 text-gray-400" />
                        <div className="flex-1">
                          <p className="font-medium">Initial Version</p>
                          <p className="text-sm text-gray-500">Created: 2025-04-15 11:30 AM</p>
                        </div>
                        <Button variant="outline" size="sm">Restore</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
