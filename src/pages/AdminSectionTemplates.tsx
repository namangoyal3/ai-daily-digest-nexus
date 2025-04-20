
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Plus, Search, Filter, ArrowDownUp, Edit, Eye, Trash2 } from "lucide-react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTemplates from "@/components/admin/content/SectionTemplates";
import { useToast } from "@/hooks/use-toast";

// Mock data for section templates
const heroTemplates = [
  {
    id: "hero-1",
    type: "Hero",
    title: "Modern Hero",
    description: "A clean, modern hero section with image and CTA",
    thumbnail: "/placeholder.svg",
    popular: true
  },
  {
    id: "hero-2",
    type: "Hero",
    title: "Split Hero",
    description: "Split layout with content on left, image on right",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "hero-3",
    type: "Hero",
    title: "Video Background",
    description: "Engaging hero with background video",
    thumbnail: "/placeholder.svg",
    new: true
  }
];

const featureTemplates = [
  {
    id: "features-1",
    type: "Features",
    title: "Feature Grid",
    description: "Grid layout for showcasing product features",
    thumbnail: "/placeholder.svg",
    popular: true
  },
  {
    id: "features-2",
    type: "Features",
    title: "Icon Features",
    description: "Clean layout with icons and descriptions",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "features-3",
    type: "Features",
    title: "Feature Tabs",
    description: "Tabbed interface to showcase different features",
    thumbnail: "/placeholder.svg",
    new: true
  }
];

const ctaTemplates = [
  {
    id: "cta-1",
    type: "CTA",
    title: "Simple CTA",
    description: "Clean call-to-action with button",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "cta-2",
    type: "CTA",
    title: "CTA with Image",
    description: "Visual call-to-action with background image",
    thumbnail: "/placeholder.svg",
    popular: true
  }
];

const testimonialTemplates = [
  {
    id: "testimonial-1",
    type: "Testimonial",
    title: "Quote Cards",
    description: "Customer testimonials in card format",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "testimonial-2",
    type: "Testimonial",
    title: "Testimonial Slider",
    description: "Carousel of customer testimonials",
    thumbnail: "/placeholder.svg",
    popular: true
  }
];

export default function AdminSectionTemplates() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template Selected",
      description: "Template has been selected and ready to use.",
    });
  };
  
  const handleAddToPage = () => {
    if (selectedTemplate) {
      toast({
        title: "Template Added",
        description: "Template has been added to the page editor. You can now customize it.",
      });
    } else {
      toast({
        title: "No Template Selected",
        description: "Please select a template first.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Section Templates - Admin Dashboard</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <AdminAuthGuard>
        <AdminLayout>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Section Templates</h1>
                <p className="text-muted-foreground">
                  Browse and manage section templates for your website
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button onClick={handleAddToPage} disabled={!selectedTemplate}>
                  <Plus className="mr-2 h-4 w-4" /> Add to Page
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Browse Templates</CardTitle>
                <CardDescription>
                  Select a template to add to your page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search templates..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="ghost">
                    <ArrowDownUp className="mr-2 h-4 w-4" /> Sort
                  </Button>
                </div>

                <Tabs defaultValue="hero">
                  <TabsList className="mb-6">
                    <TabsTrigger value="hero">Hero Sections</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="cta">CTAs</TabsTrigger>
                    <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                    <TabsTrigger value="all">All Templates</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="hero">
                    <SectionTemplates 
                      templates={heroTemplates} 
                      onSelect={handleSelectTemplate}
                      selectedTemplate={selectedTemplate || undefined}
                    />
                  </TabsContent>
                  
                  <TabsContent value="features">
                    <SectionTemplates 
                      templates={featureTemplates} 
                      onSelect={handleSelectTemplate}
                      selectedTemplate={selectedTemplate || undefined}
                    />
                  </TabsContent>
                  
                  <TabsContent value="cta">
                    <SectionTemplates 
                      templates={ctaTemplates} 
                      onSelect={handleSelectTemplate}
                      selectedTemplate={selectedTemplate || undefined}
                    />
                  </TabsContent>
                  
                  <TabsContent value="testimonials">
                    <SectionTemplates 
                      templates={testimonialTemplates} 
                      onSelect={handleSelectTemplate}
                      selectedTemplate={selectedTemplate || undefined}
                    />
                  </TabsContent>
                  
                  <TabsContent value="all">
                    <SectionTemplates 
                      templates={[...heroTemplates, ...featureTemplates, ...ctaTemplates, ...testimonialTemplates]} 
                      onSelect={handleSelectTemplate}
                      selectedTemplate={selectedTemplate || undefined}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
