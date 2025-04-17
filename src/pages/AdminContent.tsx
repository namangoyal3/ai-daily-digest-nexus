
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentData, ContentSection } from "@/types/contentTypes";
import { AlertTriangle, Save } from "lucide-react";
import HeroSectionEditor from "@/components/admin/content/sections/HeroSectionEditor";
import BenefitsSectionEditor from "@/components/admin/content/sections/BenefitsSectionEditor";
import PricingSectionEditor from "@/components/admin/content/sections/PricingSectionEditor";
import FAQSectionEditor from "@/components/admin/content/sections/FAQSectionEditor";
import SectionTemplatePicker from "@/components/admin/content/SectionTemplatePicker";
import CustomSectionEditor from "@/components/admin/content/CustomSectionEditor";
import AnimationSettingsManager from "@/components/admin/content/AnimationSettingsManager";

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
        const completeContent = {
          ...defaultContent,
          ...parsedContent,
          hero: { ...defaultContent.hero, ...parsedContent.hero },
          benefits: { ...defaultContent.benefits, ...parsedContent.benefits },
          pricing: { ...defaultContent.pricing, ...parsedContent.pricing },
          faq: { ...defaultContent.faq, ...parsedContent.faq },
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
    // Check if content has been changed
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
      const sectionData = prev[section] as ContentSection;
      if (sectionData?.items) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            items: sectionData.items.map((item, i) => 
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
                    <TabsContent value="hero" className="mt-0">
                      <HeroSectionEditor
                        content={isEditing ? draftContent.hero : content.hero}
                        isEditing={isEditing}
                        onContentChange={(field, value) => handleDraftChange('hero', field, value)}
                        onImagesChange={(images) => handleImagesChange('hero', images)}
                      />
                    </TabsContent>

                    <TabsContent value="benefits" className="mt-0">
                      <BenefitsSectionEditor
                        content={isEditing ? draftContent.benefits : content.benefits}
                        isEditing={isEditing}
                        onContentChange={(field, value) => handleDraftChange('benefits', field, value)}
                        onItemChange={(index, field, value) => handleItemChange('benefits', index, field, value)}
                      />
                    </TabsContent>

                    <TabsContent value="pricing" className="mt-0">
                      <PricingSectionEditor
                        content={isEditing ? draftContent.pricing : content.pricing}
                        isEditing={isEditing}
                        onContentChange={(field, value) => handleDraftChange('pricing', field, value)}
                        onImagesChange={(images) => handleImagesChange('pricing', images)}
                      />
                    </TabsContent>

                    <TabsContent value="faq" className="mt-0">
                      <FAQSectionEditor
                        content={isEditing ? draftContent.faq : content.faq}
                        isEditing={isEditing}
                        onContentChange={(field, value) => handleDraftChange('faq', field, value)}
                        onItemChange={(index, field, value) => handleItemChange('faq', index, field, value)}
                      />
                    </TabsContent>

                    {draftContent.customSections.map((section, index) => (
                      <TabsContent 
                        key={section.id} 
                        value={`custom-${section.id}`}
                        className="mt-0"
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
