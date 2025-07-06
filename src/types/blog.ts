
export interface Blog {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  image_url: string;
  slug?: string;
  meta_description?: string;
  keywords?: string[];
  canonical_url?: string;
  author_name?: string;
  author_bio?: string;
  tags?: string[];
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
}
