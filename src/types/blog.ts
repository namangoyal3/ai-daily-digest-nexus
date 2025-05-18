
export interface Blog {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  image_url: string;
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  tags?: string[];
}
