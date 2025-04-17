
// Content Section Types
export interface ImageContent {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ListItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ContentSection {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  images?: ImageContent[];
  items?: ListItem[];
  type?: string;
}

export interface ContentData {
  hero: ContentSection;
  benefits: ContentSection;
  pricing: ContentSection;
  faq: ContentSection;
  customSections: ContentSection[];
}

// Animation Settings
export interface AnimationSettings {
  textAnimationSpeed: number;
}

// Section Templates
export interface SectionTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  thumbnail?: string;
}

export const sectionTemplates: SectionTemplate[] = [
  {
    id: "text-image",
    name: "Text with Image",
    type: "textWithImage",
    description: "A section with text on one side and an image on the other",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "feature-grid",
    name: "Feature Grid",
    type: "featureGrid",
    description: "Grid layout with multiple feature cards",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "testimonials",
    name: "Testimonials",
    type: "testimonials",
    description: "Customer testimonial cards",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "call-to-action",
    name: "Call to Action",
    type: "callToAction",
    description: "A prominent call to action section",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "blog-cards",
    name: "Blog Cards",
    type: "blogCards",
    description: "Display blog posts in card format",
    thumbnail: "/placeholder.svg"
  }
];
