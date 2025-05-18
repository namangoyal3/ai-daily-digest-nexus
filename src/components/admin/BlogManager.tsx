import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash, Plus, RefreshCcw, Calendar, FileText } from "lucide-react";
import { generateDailyBlog } from "@/lib/blogService";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import BlogScheduleModal from "./BlogScheduleModal";
import { getScheduleConfig, initializeScheduling } from "@/lib/schedulingService";

export default function BlogManager() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState(getScheduleConfig());
  const navigate = useNavigate();

  // Initialize scheduling when component mounts
  useEffect(() => {
    // Generate blog posts according to schedule
    const cleanup = initializeScheduling(async () => {
      try {
        await handleGenerateDaily();
        toast.success("Scheduled blog post generated", {
          description: "Automatic blog generation completed successfully",
        });
      } catch (error) {
        console.error("Scheduled blog generation failed:", error);
        toast.error("Scheduled blog generation failed", {
          description: "Check API key settings and try again",
        });
      }
    });

    return cleanup;
  }, []);

  // Update local state when schedule config changes
  useEffect(() => {
    const handleStorageChange = () => {
      setScheduleConfig(getScheduleConfig());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleGenerateDaily = async () => {
    setIsGenerating(true);
    try {
      // Skip the validation that was causing problems
      // Trust that the API key is valid and let the API call itself validate
      
      const newBlog = await generateDailyBlog();
      
      toast.success("New blog post generated successfully", {
        description: `"${newBlog.title}" has been added to your blog.`,
        action: {
          label: "View",
          onClick: () => navigate(`/ai-blogs/${newBlog.id}`),
        },
      });
      
      return newBlog;
    } catch (error) {
      console.error("Blog generation error:", error);
      toast.error("Failed to generate blog post", {
        description: error instanceof Error ? error.message : "Please try again",
        action: {
          label: "Settings",
          onClick: () => navigate("/blog-settings"),
        },
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const openScheduleModal = () => {
    setScheduleModalOpen(true);
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
          <Button variant="outline" asChild>
            <Link to="/ai-blogs">
              <FileText className="mr-2 h-4 w-4" />
              View Blog
            </Link>
          </Button>
          <Button 
            variant="outline"
            onClick={openScheduleModal}
          >
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
                <span>
                  {scheduleConfig.isActive 
                    ? `Active (${scheduleConfig.frequency})`
                    : "Scheduling inactive"}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setScheduleModalOpen(true)}
              >
                Configure
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium mb-1">Publication Time</h3>
                  <p className="text-sm text-muted-foreground">{scheduleConfig.time} (Local)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium mb-1">Content Categories</h3>
                  <p className="text-sm text-muted-foreground">
                    {scheduleConfig.categories.join(", ")}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium mb-1">Status</h3>
                  <div className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${scheduleConfig.isActive ? "bg-green-500" : "bg-gray-400"}`}></div>
                    <p className="text-sm text-muted-foreground">
                      {scheduleConfig.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setScheduleModalOpen(true)}
          >
            Manage Publication Schedule
          </Button>
        </CardFooter>
      </Card>
      
      <BlogScheduleModal 
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
      />
    </div>
  );
}
