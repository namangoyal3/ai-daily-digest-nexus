
import { useState } from "react";
import { Helmet } from "react-helmet";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminContent() {
  const { toast } = useToast();
  const [heroTitle, setHeroTitle] = useState("AI Daily Digest - Stay Ahead with AI Insights");
  const [heroSubtitle, setHeroSubtitle] = useState("Get curated AI news, breakthroughs, and analysis in a 5-minute daily read.");
  const [benefitsTitle, setBenefitsTitle] = useState("Why Choose AI Daily Digest");
  
  const handleContentUpdate = (section: string) => {
    toast({
      title: "Content Updated",
      description: `${section} has been updated successfully.`
    });
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
            <div>
              <h1 className="text-3xl font-bold mb-2">Content Management</h1>
              <p className="text-muted-foreground">
                Edit and manage website content
              </p>
            </div>

            <Tabs defaultValue="hero" className="space-y-4">
              <TabsList>
                <TabsTrigger value="hero">Hero Section</TabsTrigger>
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
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subtitle</label>
                      <Input
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={() => handleContentUpdate("Hero Section")}>
                      Update Hero Section
                    </Button>
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
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Section Title</label>
                      <Input
                        value={benefitsTitle}
                        onChange={(e) => setBenefitsTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={() => handleContentUpdate("Benefits Section")}>
                      Update Benefits Section
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Section</CardTitle>
                    <CardDescription>
                      Manage your pricing plans and features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Pricing section editor coming soon...
                    </p>
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
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      FAQ section editor coming soon...
                    </p>
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
