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

interface ContentSection {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: Array<{
    title: string;
    description: string;
  }>;
}

interface ContentData {
  hero: ContentSection;
  benefits: ContentSection;
  pricing: ContentSection;
  faq: ContentSection;
}

export default function AdminContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<ContentData>({
    hero: {
      title: "AI Daily Digest - Stay Ahead with AI Insights",
      subtitle: "Get curated AI news, breakthroughs, and analysis in a 5-minute daily read."
    },
    benefits: {
      title: "Why Choose AI Daily Digest",
      items: [
        {
          title: "Save Time",
          description: "Digest key AI developments in just 5 minutes daily."
        },
        {
          title: "Access to Latest AI News",
          description: "Stay informed about the latest AI advancements."
        },
        {
          title: "Personalized Recommendations",
          description: "Get tailored AI insights based on your interests."
        }
      ]
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      description: "Choose the plan that's right for you"
    },
    faq: {
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
  });
  
  const [draftContent, setDraftContent] = useState<ContentData>(content);

  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
      setDraftContent(JSON.parse(savedContent));
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setDraftContent({...content});
  };

  const handleSave = () => {
    setContent(draftContent);
    localStorage.setItem('siteContent', JSON.stringify(draftContent));
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

  const handleDraftChange = (section: keyof ContentData, field: string, value: string) => {
    setDraftContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleItemChange = (section: keyof ContentData, index: number, field: string, value: string) => {
    setDraftContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: prev[section].items?.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Content Management</h1>
                <p className="text-muted-foreground">
                  Edit and manage website content
                </p>
              </div>
              <div className="space-x-2">
                {!isEditing && (
                  <Button onClick={handleEdit}>
                    Edit Content
                  </Button>
                )}
                {isEditing && (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="hero">Hero</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="hero">
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>
                      Edit the main landing section of your website
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="benefits">
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits Section</CardTitle>
                    <CardDescription>
                      Edit the benefits and features section
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={isEditing ? draftContent.benefits.title : content.benefits.title}
                        onChange={(e) => handleDraftChange('benefits', 'title', e.target.value)}
                        className="mt-1"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-4">
                      {(isEditing ? draftContent : content).benefits.items?.map((benefit, index) => (
                        <div key={index} className="space-y-2">
                          <Input
                            value={benefit.title}
                            onChange={(e) => handleItemChange('benefits', index, 'title', e.target.value)}
                            placeholder="Benefit Title"
                            disabled={!isEditing}
                          />
                          <Textarea
                            value={benefit.description}
                            onChange={(e) => handleItemChange('benefits', index, 'description', e.target.value)}
                            placeholder="Benefit Description"
                            disabled={!isEditing}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Section</CardTitle>
                    <CardDescription>
                      Edit pricing plans and features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>FAQ Section</CardTitle>
                    <CardDescription>
                      Manage frequently asked questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={isEditing ? draftContent.faq.title : content.faq.title}
                        onChange={(e) => handleDraftChange('faq', 'title', e.target.value)}
                        className="mt-1"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-4">
                      {(isEditing ? draftContent : content).faq.items?.map((faq, index) => (
                        <div key={index} className="space-y-2">
                          <Input
                            value={faq.title}
                            onChange={(e) => handleItemChange('faq', index, 'title', e.target.value)}
                            placeholder="Question"
                            disabled={!isEditing}
                          />
                          <Textarea
                            value={faq.description}
                            onChange={(e) => handleItemChange('faq', index, 'description', e.target.value)}
                            placeholder="Answer"
                            disabled={!isEditing}
                          />
                        </div>
                      ))}
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
