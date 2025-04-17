import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import ContentEditor from "@/components/admin/ContentEditor";
import SectionsList from "@/components/admin/content/SectionsList";
import MetadataEditor from "@/components/admin/content/MetadataEditor";
import VersionHistory from "@/components/admin/content/VersionHistory";
import { PageContent, ContentSection } from "@/types/content";

const pageTypes: Record<string, PageContent> = {
  "1": {
    pageId: "1",
    title: "Home Page",
    path: "/",
    meta: {
      title: "AI Platform - Home",
      description: "The leading AI platform for businesses",
      keywords: "ai, artificial intelligence, machine learning, business"
    },
    sections: [
      {
        id: "section-1",
        type: "hero",
        title: "Welcome to the AI Platform",
        subtitle: "Empowering businesses with AI",
        description: "Our platform helps businesses leverage AI to grow faster and more efficiently"
      },
      {
        id: "section-2",
        type: "features",
        title: "Key Features",
        items: [
          { title: "AI Automation", description: "Automate repetitive tasks" },
          { title: "Data Analysis", description: "Get insights from your data" },
          { title: "Custom Models", description: "Build custom AI models" }
        ]
      }
    ]
  },
  "2": {
    pageId: "2",
    title: "About Page",
    path: "/about",
    meta: {
      title: "About Us - AI Platform",
      description: "Learn about our AI platform and team",
      keywords: "about, team, ai platform, history"
    },
    sections: [
      {
        id: "section-1",
        type: "content",
        title: "Our Story",
        content: "We started in 2022 with a mission to make AI accessible to all businesses."
      }
    ]
  }
};

export default function AdminContent() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get("page") || "1";
  const [activeTab, setActiveTab] = useState("content");
  const [activeSectionId, setActiveSectionId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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
    setDraftContent(prev => ({ ...prev, sections: newSections }));
  };

  const handleMoveSectionDown = (index: number) => {
    if (index === draftContent.sections.length - 1) return;
    const newSections = [...draftContent.sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    setDraftContent(prev => ({ ...prev, sections: newSections }));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      handleMoveSectionUp(index);
    } else {
      handleMoveSectionDown(index);
    }
  };

  const handleDuplicateSection = (sectionId: string) => {
    const sectionToDuplicate = draftContent.sections.find(section => section.id === sectionId);
    
    if (sectionToDuplicate) {
      const newSectionId = `section-${Date.now()}`;
      const duplicatedSection = {
        ...sectionToDuplicate,
        id: newSectionId,
        title: `${sectionToDuplicate.title || 'Section'} (Copy)`
      };
      
      setDraftContent(prev => ({
        ...prev,
        sections: [...prev.sections, duplicatedSection]
      }));
      
      setActiveSectionId(newSectionId);
    }
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
                    <SectionsList
                      sections={draftContent.sections}
                      activeSectionId={activeSectionId}
                      isEditing={isEditing}
                      onSectionClick={setActiveSectionId}
                      onAddSection={handleAddSection}
                      onMoveSection={handleMoveSection}
                      onDuplicateSection={handleDuplicateSection}
                      onDeleteSection={handleDeleteSection}
                    />
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
                <MetadataEditor
                  content={draftContent}
                  isEditing={isEditing}
                  onMetaChange={handleMetaChange}
                />
              </TabsContent>

              <TabsContent value="history">
                <VersionHistory />
              </TabsContent>
            </Tabs>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    </>
  );
}
