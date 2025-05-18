
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogApiKeyForm from "@/components/BlogApiKeyForm";
import BlogManager from "@/components/admin/BlogManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function BlogSettings() {
  return (
    <>
      <Helmet>
        <title>Blog Settings - NeuralNextGen</title>
        <meta name="description" content="Configure your blog settings and API connections." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Header />
        
        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-aiblue">
              Blog Settings
            </h1>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl px-4">
              Configure your API connections and manage blog content generation
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="api-keys" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                <TabsTrigger value="blog-manager">Blog Manager</TabsTrigger>
              </TabsList>
              
              <TabsContent value="api-keys" className="space-y-4">
                <h2 className="text-xl font-bold">API Key Configuration</h2>
                <p className="text-gray-600">
                  Set up your API keys for AI-powered content generation
                </p>
                <Separator className="my-4" />
                <BlogApiKeyForm />
              </TabsContent>
              
              <TabsContent value="blog-manager">
                <BlogManager />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
