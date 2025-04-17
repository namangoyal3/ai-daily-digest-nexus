
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ContentData, ContentSection } from "@/types/contentTypes";
import SectionTemplatePicker from "@/components/admin/content/SectionTemplatePicker";
import ImageEditor from "@/components/admin/content/ImageEditor";
import CustomSectionEditor from "@/components/admin/content/CustomSectionEditor";
import AnimationSettingsManager from "@/components/admin/content/AnimationSettingsManager";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Save } from "lucide-react";

export default function AdminContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const defaultContent: ContentData = {
    hero: {
      id: "hero-section",
      title: "AI Daily Digest - Stay Ahead with AI Insights",
      subtitle: "Get curated AI news, breakthroughs, and analysis in a 5-minute daily read.",
      images: [
        {
          src: "/placeholder.svg",
          alt: "AI Daily Digest Hero Image"
        }
      ]
    },
    benefits: {
      id: "benefits-section",
      title: "Why Choose AI Daily Digest",
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
    pricing: {
      id: "pricing-section",
      title: "Simple, Transparent Pricing",
      description: "Choose the plan that's right for you"
    },
    faq: {
      id: "faq-section",
      title: "Frequently Asked Questions",
      items: [
        {
          id: "faq-1",
          title: "What is AI Daily Digest?",
          description: "A curated newsletter delivering the most important AI updates."
        },
        {
          id: "faq-2",
          title: "How often do I receive updates?",
          description: "You receive updates daily."
        },
        {
          id: "faq-3",
          title: "Can I unsubscribe?",
          description: "Yes, you can unsubscribe at any time."
        }
      ]
    },
    customSections: []
  };
  
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [draftContent, setDraftContent] = useState<ContentData>(defaultContent);

  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        // Make sure we have all the required sections and add any missing ones
        const completeContent = {
          ...defaultContent,
          ...parsedContent,
          // Ensure each section has an ID
          hero: { id: "hero-section", ...parsedContent.hero },
          benefits: { id: "benefits-section", ...parsedContent.benefits },
          pricing: { id: "pricing-section", ...parsedContent.pricing },
          faq: { id: "faq-section", ...parsedContent.faq },
          customSections: parsedContent.customSections || []
        };
        setContent(completeContent);
        setDraftContent(completeContent);
      } catch (e) {
        console.error("Error parsing saved content:", e);
        setContent(defaultContent);
        setDraftContent(defaultContent);
      }
    }
  }, []);

  useEffect(() => {
    // Check if draft content differs from saved content
    if (JSON.stringify(content) !== JSON.stringify(draftContent)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [content, draftContent]);

  const handleEdit = () => {
    setIsEditing(true);
    setDraftContent({...content});
  };

  const handleSave = () => {
    setContent(draftContent);
    localStorage.setItem('siteContent', JSON.stringify(draftContent));
    setIsEditing(false);
    setHasUnsavedChanges(false);
    toast({
      title: "Content Updated",
      description: "Your changes have been saved successfully."
    });
  };

  const handleCancel = () => {
    setDraftContent(content);
    setIsEditing(false);
    setHasUnsavedChanges(false);
    toast({
      title: "Changes Discarded",
      description: "Your changes have been discarded."
    });
  };

  const handleDraftChange = (section: keyof ContentData, field: string, value: string) => {
    setDraftContent(prev => {
      if (typeof prev[section] === 'object') {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const handleItemChange = (section: keyof ContentData, index: number, field: string, value: string) => {
    setDraftContent(prev => {
      if (prev[section]?.items) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            items: prev[section].items?.map((item, i) => 
              i === index ? { ...item, [field]: value } : item
            )
          }
        };
      }
      return prev;
    });
  };

  const handleImagesChange = (section: keyof ContentData, images: any[]) => {
    setDraftContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        images
      }
    }));
  };

  const handleAddCustomSection = (newSection: ContentSection) => {
    setDraftContent(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }));
    setActiveTab(`custom-${newSection.id}`);
    setIsEditing(true);
  };

  const handleUpdateCustomSection = (index: number, updatedSection: ContentSection) => {
    setDraftContent(prev => ({
      ...prev,
      customSections: prev.customSections.map((section, i) => 
        i === index ? updatedSection : section
      )
    }));
  };

  const handleDeleteCustomSection = (index: number) => {
    setDraftContent(prev => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index)
    }));
    setActiveTab("hero");
  };

  return (
    <>
      <Helmet>
        <title>Content Management - AI Daily Digest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Content Management</h1>
                <p className="text-muted-foreground">
                  Edit and manage website content
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {!isEditing ? (
                  <Button onClick={handleEdit}>
                    Edit Content
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave} 
                      className="flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>

            {hasUnsavedChanges && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-center text-amber-800">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">You have unsaved changes. Don't forget to save before leaving this page.</p>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sections</CardTitle>
                    <CardDescription>
                      Manage website sections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs 
                      orientation="vertical"
                      value={activeTab} 
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <ScrollArea className="h-[400px]">
                        <TabsList className="flex flex-col w-full h-auto">
                          <TabsTrigger value="hero" className="justify-start">Hero Section</TabsTrigger>
                          <TabsTrigger value="benefits" className="justify-start">Benefits</TabsTrigger>
                          <TabsTrigger value="pricing" className="justify-start">Pricing</TabsTrigger>
                          <TabsTrigger value="faq" className="justify-start">FAQ</TabsTrigger>
                          
                          {/* Custom Sections */}
                          {draftContent.customSections.map((section) => (
                            <TabsTrigger 
                              key={section.id} 
                              value={`custom-${section.id}`}
                              className="justify-start"
                            >
                              {section.title || "Custom Section"}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </ScrollArea>
                    </Tabs>
                    
                    {isEditing && (
                      <div className="mt-4">
                        <SectionTemplatePicker onSelectTemplate={handleAddCustomSection} />
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <AnimationSettingsManager />
              </div>
              
              <div className="md:col-span-9">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {activeTab === "hero" && "Hero Section"}
                      {activeTab === "benefits" && "Benefits Section"}
                      {activeTab === "pricing" && "Pricing Section"}
                      {activeTab === "faq" && "FAQ Section"}
                      {activeTab.startsWith("custom-") && 
                        (draftContent.customSections.find(s => `custom-${s.id}` === activeTab)?.title || "Custom Section")}
                    </CardTitle>
                    <CardDescription>
                      Edit content for this section
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <TabsContent value="hero" className="m-0 space-y-6">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={isEditing ? draftContent.hero.title : content.hero.title}
                          onChange={(e) => handleDraftChange('hero', 'title', e.target.value)}
                          className="mt-1"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input
                          value={isEditing ? draftContent.hero.subtitle : content.hero.subtitle}
                          onChange={(e) => handleDraftChange('hero', 'subtitle', e.target.value)}
                          className="mt-1"
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <Separator />
                      
                      <ImageEditor 
                        images={isEditing ? draftContent.hero.images || [] : content.hero.images || []}
                        onChange={(images) => handleImagesChange('hero', images)}
                        disabled={!isEditing}
                      />
                    </TabsContent>

                    <TabsContent value="benefits" className="m-0 space-y-6">
                      <div>
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                          value={isEditing ? draftContent.benefits.title : content.benefits.title}
                          onChange={(e) => handleDraftChange('benefits', 'title', e.target.value)}
                          className="mt-1"
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Benefits</h3>
                        {(isEditing ? draftContent : content).benefits.items?.map((benefit, index) => (
                          <Card key={benefit.id || index}>
                            <CardContent className="p-4 space-y-3">
                              <div>
                                <label className="text-sm font-medium">Benefit Title</label>
                                <Input
                                  value={benefit.title}
                                  onChange={(e) => handleItemChange('benefits', index, 'title', e.target.value)}
                                  placeholder="Benefit Title"
                                  disabled={!isEditing}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                  value={benefit.description}
                                  onChange={(e) => handleItemChange('benefits', index, 'description', e.target.value)}
                                  placeholder="Benefit Description"
                                  disabled={!isEditing}
                                  className="mt-1"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="pricing" className="m-0 space-y-6">
                      <div>
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                          value={isEditing ? draftContent.pricing.title : content.pricing.title}
                          onChange={(e) => handleDraftChange('pricing', 'title', e.target.value)}
                          className="mt-1"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={isEditing ? draftContent.pricing.description : content.pricing.description}
                          onChange={(e) => handleDraftChange('pricing', 'description', e.target.value)}
                          className="mt-1"
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <Separator />
                      
                      <ImageEditor 
                        images={isEditing ? draftContent.pricing.images || [] : content.pricing.images || []}
                        onChange={(images) => handleImagesChange('pricing', images)}
                        disabled={!isEditing}
                      />
                    </TabsContent>

                    <TabsContent value="faq" className="m-0 space-y-6">
                      <div>
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                          value={isEditing ? draftContent.faq.title : content.faq.title}
                          onChange={(e) => handleDraftChange('faq', 'title', e.target.value)}
                          className="mt-1"
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">FAQ Items</h3>
                        {(isEditing ? draftContent : content).faq.items?.map((faq, index) => (
                          <Card key={faq.id || index}>
                            <CardContent className="p-4 space-y-3">
                              <div>
                                <label className="text-sm font-medium">Question</label>
                                <Input
                                  value={faq.title}
                                  onChange={(e) => handleItemChange('faq', index, 'title', e.target.value)}
                                  placeholder="Question"
                                  disabled={!isEditing}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Answer</label>
                                <Textarea
                                  value={faq.description}
                                  onChange={(e) => handleItemChange('faq', index, 'description', e.target.value)}
                                  placeholder="Answer"
                                  disabled={!isEditing}
                                  className="mt-1"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Custom Section Content */}
                    {draftContent.customSections.map((section, index) => (
                      <TabsContent 
                        key={section.id} 
                        value={`custom-${section.id}`}
                        className="m-0"
                      >
                        <CustomSectionEditor
                          section={isEditing ? section : content.customSections[index] || section}
                          onUpdate={(updatedSection) => handleUpdateCustomSection(index, updatedSection)}
                          onDelete={() => handleDeleteCustomSection(index)}
                          disabled={!isEditing}
                        />
                      </TabsContent>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
