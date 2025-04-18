
import { Button } from "@/components/ui/button";

interface CTAButton {
  id: string;
  text: string;
  url: string;
  variant: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size: "default" | "sm" | "lg" | "icon";
  isExternal: boolean;
}

interface ContentSection {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  alignment?: "left" | "center" | "right";
  background?: "white" | "light" | "dark" | "gradient";
  ctaButtons?: CTAButton[];
  items?: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
  }>;
}

interface PageContent {
  title: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  sections: ContentSection[];
}

interface HomePagePreviewProps {
  content: PageContent;
  isEditing: boolean;
}

export default function HomePagePreview({ content, isEditing }: HomePagePreviewProps) {
  // Function to render different section types
  const renderSection = (section: ContentSection) => {
    const bgClasses = {
      white: "bg-white",
      light: "bg-gray-50",
      dark: "bg-gray-900 text-white",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
    };
    
    const bgClass = bgClasses[section.background || "white"];
    
    switch (section.type) {
      case "hero":
        return (
          <section className={`py-16 ${bgClass}`} id={section.id}>
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{section.title}</h1>
              {section.subtitle && (
                <p className="text-xl mb-8 max-w-3xl mx-auto">{section.subtitle}</p>
              )}
              {section.ctaButtons && section.ctaButtons.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                  {section.ctaButtons.map((cta) => (
                    <Button 
                      key={cta.id}
                      variant={cta.variant}
                      size={cta.size}
                      asChild
                    >
                      <a href={cta.url} target={cta.isExternal ? "_blank" : "_self"} rel={cta.isExternal ? "noopener noreferrer" : ""}>
                        {cta.text}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
        
      case "features":
        return (
          <section className={`py-16 ${bgClass}`} id={section.id}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">{section.title}</h2>
              {section.items && section.items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {section.items.map((item) => (
                    <div key={item.id} className="text-center p-4">
                      {item.imageUrl && (
                        <div className="mb-4 flex justify-center">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
        
      case "cta":
        return (
          <section className={`py-16 ${bgClass}`} id={section.id}>
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              {section.description && (
                <p className="text-xl mb-8 max-w-3xl mx-auto">{section.description}</p>
              )}
              {section.ctaButtons && section.ctaButtons.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                  {section.ctaButtons.map((cta) => (
                    <Button 
                      key={cta.id}
                      variant={cta.variant}
                      size={cta.size}
                      asChild
                    >
                      <a href={cta.url} target={cta.isExternal ? "_blank" : "_self"} rel={cta.isExternal ? "noopener noreferrer" : ""}>
                        {cta.text}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
        
      case "content":
        return (
          <section className={`py-16 ${bgClass}`} id={section.id}>
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                {section.description && (
                  <div className="prose max-w-none">
                    <p>{section.description}</p>
                  </div>
                )}
                {section.ctaButtons && section.ctaButtons.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-8">
                    {section.ctaButtons.map((cta) => (
                      <Button 
                        key={cta.id}
                        variant={cta.variant}
                        size={cta.size}
                        asChild
                      >
                        <a href={cta.url} target={cta.isExternal ? "_blank" : "_self"} rel={cta.isExternal ? "noopener noreferrer" : ""}>
                          {cta.text}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
        
      case "testimonials":
        return (
          <section className={`py-16 ${bgClass}`} id={section.id}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">{section.title}</h2>
              {section.items && section.items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                      <div className="text-gray-500 dark:text-gray-400 italic mb-4">"{item.description}"</div>
                      <div className="flex items-center">
                        {item.imageUrl && (
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                        )}
                        <div>
                          <div className="font-bold">{item.title}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
        
      default:
        return (
          <section className={`py-16 ${bgClass}`} id={section.id}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              {section.description && <p>{section.description}</p>}
            </div>
          </section>
        );
    }
  };
  
  return (
    <div className={`home-page-preview ${isEditing ? 'editing' : ''}`}>
      {content.sections.map((section) => (
        <div key={section.id} className={isEditing ? 'relative group' : ''}>
          {renderSection(section)}
          {isEditing && (
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 pointer-events-none"></div>
          )}
        </div>
      ))}
    </div>
  );
}
