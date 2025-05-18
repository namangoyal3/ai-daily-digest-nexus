
export interface Blog {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  tags?: string[];
}
