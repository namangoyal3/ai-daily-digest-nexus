
import { supabase } from './supabase-client';
import { generateBlogContent, generateBlogsForCategories } from './perplexityService';
import { generateImageWithPrompt } from './pollinationsService';
import { v4 as uuidv4 } from 'uuid';
import { Blog } from '@/types/blog';
import { toast } from 'sonner';

// Get all blogs from database
export const getBlogs = async (): Promise<Blog[]> => {
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
  
  return blogs || [];
};

// Get a blog by ID
export const getBlogById = async (id: string): Promise<Blog> => {
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
  
  if (!blog) {
    throw new Error(`Blog with ID ${id} not found`);
  }
  
  return blog;
};

// Get blogs by category
export const getBlogsByCategory = async (category: string): Promise<Blog[]> => {
  if (category === 'All') {
    return getBlogs();
  }
  
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error(`Error fetching blogs for category ${category}:`, error);
    throw error;
  }
  
  return blogs || [];
};

// Get related blogs (same category, excluding current blog)
export const getRelatedBlogs = async (currentBlogId: string, category?: string): Promise<Blog[]> => {
  if (!category) return [];
  
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('category', category)
    .neq('id', currentBlogId)
    .limit(3);
  
  if (error) {
    console.error(`Error fetching related blogs:`, error);
    throw error;
  }
  
  return blogs || [];
};

// Save a blog to database
const saveBlog = async (blog: Omit<Blog, 'id'>): Promise<Blog> => {
  const { data, error } = await supabase
    .from('blogs')
    .insert([blog])
    .select()
    .single();
  
  if (error) {
    console.error('Error saving blog:', error);
    throw error;
  }
  
  return data;
};

// Save multiple blogs to database
const saveMultipleBlogs = async (newBlogs: Omit<Blog, 'id'>[]): Promise<Blog[]> => {
  const { data, error } = await supabase
    .from('blogs')
    .insert(newBlogs)
    .select();
  
  if (error) {
    console.error('Error saving multiple blogs:', error);
    throw error;
  }
  
  return data || [];
};

// Calculate estimated read time based on content
const calculateReadTime = (content: string): string => {
  // Remove HTML tags and calculate words
  const plainText = content.replace(/<[^>]*>/g, '');
  const words = plainText.split(/\s+/).length;
  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

// Generate a date string for the blog post
const generateDateString = (): string => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Generate a daily AI blog
export const generateDailyBlog = async (): Promise<Blog> => {
  try {
    // Generate blog content
    const blogData = await generateBlogContent();
    
    // Generate an image for the blog
    const imagePrompt = `A futuristic tech visualization representing: ${blogData.title}`;
    const imageUrl = await generateImageWithPrompt(imagePrompt);
    
    // Create the blog object
    const blogToSave = {
      title: blogData.title,
      content: blogData.content,
      excerpt: blogData.excerpt,
      image_url: imageUrl,
      category: blogData.category,
      date: generateDateString(),
      read_time: calculateReadTime(blogData.content),
    };
    
    // Save the blog to database
    const savedBlog = await saveBlog(blogToSave);
    return savedBlog;
  } catch (error) {
    console.error("Error generating blog:", error);
    throw error;
  }
};

// Generate blogs for all predefined categories
export const generateBlogForAllCategories = async (): Promise<Blog[]> => {
  try {
    const categories = ["AI Trends", "Deep Learning", "AI Ethics", "Machine Learning", "AI Applications"];
    const blogResults = await generateBlogsForCategories(categories);
    
    // Generate blogs with images
    const blogsToSave = await Promise.all(
      blogResults.map(async (blogData) => {
        // Generate an image for each blog
        const imagePrompt = `A futuristic tech visualization representing: ${blogData.title}`;
        const imageUrl = await generateImageWithPrompt(imagePrompt);
        
        // Create the blog object
        return {
          title: blogData.title,
          content: blogData.content,
          excerpt: blogData.excerpt,
          image_url: imageUrl,
          category: blogData.category,
          date: generateDateString(),
          read_time: calculateReadTime(blogData.content),
        };
      })
    );
    
    // Save all blogs to database
    const savedBlogs = await saveMultipleBlogs(blogsToSave);
    return savedBlogs;
  } catch (error) {
    console.error("Error generating blogs for all categories:", error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw error;
  }
};
