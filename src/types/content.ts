
export interface ContentItem {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export interface ContentSection {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  backgroundImage?: string;
  items?: Array<ContentItem>;
}

export interface PageContent {
  pageId: string;
  title: string;
  path: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
  };
  sections: ContentSection[];
}
