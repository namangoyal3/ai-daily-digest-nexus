
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash, Plus, RefreshCcw, Calendar } from "lucide-react";
import { generateDailyBlog } from "@/lib/blogService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function BlogManager() {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerateDaily = async () => {
    setIsGenerating(true);
    try {
      const apiKey = localStorage.getItem('perplexity_api_key');
      if (!apiKey) {
        toast.error("API key is missing", {
          description: "Please add your Perplexity API key in the API Keys section",
        });
        return;
      }
      
      const newBlog = await generateDailyBlog();
      
      toast.success("New blog post generated successfully", {
        description: `"${newBlog.title}" has been added to your blog.`,
        action: {
          label: "View",
          onClick: () => navigate(`/ai-blogs/${newBlog.id}`),
        },
      });
    } catch (error) {
      console.error("Blog generation error:", error);
      toast.error("Failed to generate blog post", {
        description: "Please check your API key in the API Keys section",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">
            Manage your blog content and automated publishing settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
          <Button onClick={handleGenerateDaily} disabled={isGenerating}>
            <RefreshCcw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Generating..." : "Generate Daily Post"}
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>Automatic Content Schedule</CardTitle>
          <CardDescription>
            Configure when new AI-generated content should be published
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Daily publishing</span>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium mb-1">Publication Time</h3>
                  <p className="text-sm text-muted-foreground">8:00 AM (Local)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium mb-1">Content Categories</h3>
                  <p className="text-sm text-muted-foreground">AI Trends, Deep Learning</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium mb-1">Status</h3>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Publication Schedule
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
