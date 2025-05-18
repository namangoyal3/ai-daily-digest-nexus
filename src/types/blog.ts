
export interface Blog {
  id: number | string;
  title: string;
  excerpt?: string | null;
  content: string;
  date: string;
  read_time?: string | null;
  category: string;
  image_url?: string | null;
  featured?: boolean | null;
  created_at?: string;
  updated_at?: string;
  author?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  tags?: string[];
}
