
import { generateBlogContent, generateBlogsForCategories } from './perplexityService';
import { generateImageWithPrompt } from './pollinationsService';
import { v4 as uuidv4 } from 'uuid';
import { Blog } from '@/types/blog';
import { toast } from 'sonner';

// Initialize blogs if they don't exist
const initializeBlogs = (): Blog[] => {
  const storedBlogs = localStorage.getItem('neural-nextgen-blogs');
  if (!storedBlogs) {
    return [];
  }
  return JSON.parse(storedBlogs);
};

// Get all blogs from local storage
export const getBlogs = (): Blog[] => {
  return initializeBlogs();
};

// Get a blog by ID
export const getBlogById = (id: string): Blog => {
  const blogs = initializeBlogs();
  const blog = blogs.find(blog => blog.id.toString() === id);
  
  if (!blog) {
    throw new Error(`Blog with ID ${id} not found`);
  }
  
  return blog;
};

// Get blogs by category
export const getBlogsByCategory = (category: string): Blog[] => {
  const blogs = initializeBlogs();
  
  if (category === 'All') {
    return blogs;
  }
  
  return blogs.filter(blog => blog.category === category);
};

// Get related blogs (same category, excluding current blog)
export const getRelatedBlogs = (currentBlogId: string, category: string, limit: number = 3): Blog[] => {
  const blogs = initializeBlogs();
  
  return blogs
    .filter(blog => blog.category === category && blog.id.toString() !== currentBlogId)
    .slice(0, limit);
};

// Save a blog to local storage
const saveBlog = (blog: Blog): void => {
  const blogs = initializeBlogs();
  blogs.push(blog);
  localStorage.setItem('neural-nextgen-blogs', JSON.stringify(blogs));
  // Dispatch a storage event to notify other components that blogs have been updated
  window.dispatchEvent(new StorageEvent('storage', { key: 'neural-nextgen-blogs' }));
};

// Save multiple blogs to local storage
const saveMultipleBlogs = (newBlogs: Blog[]): void => {
  const blogs = initializeBlogs();
  blogs.push(...newBlogs);
  localStorage.setItem('neural-nextgen-blogs', JSON.stringify(blogs));
  // Dispatch a storage event to notify other components that blogs have been updated
  window.dispatchEvent(new StorageEvent('storage', { key: 'neural-nextgen-blogs' }));
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
    const blog: Blog = {
      id: uuidv4(),
      title: blogData.title,
      content: blogData.content,
      excerpt: blogData.excerpt,
      image: imageUrl,
      category: blogData.category,
      date: generateDateString(),
      readTime: calculateReadTime(blogData.content),
    };
    
    // Save the blog to local storage
    saveBlog(blog);
    return blog;
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
    const newBlogs: Blog[] = await Promise.all(
      blogResults.map(async (blogData) => {
        // Generate an image for each blog
        const imagePrompt = `A futuristic tech visualization representing: ${blogData.title}`;
        const imageUrl = await generateImageWithPrompt(imagePrompt);
        
        // Create the blog object
        return {
          id: uuidv4(),
          title: blogData.title,
          content: blogData.content,
          excerpt: blogData.excerpt,
          image: imageUrl,
          category: blogData.category,
          date: generateDateString(),
          readTime: calculateReadTime(blogData.content),
        };
      })
    );
    
    // Save all blogs to local storage
    saveMultipleBlogs(newBlogs);
    return newBlogs;
  } catch (error) {
    console.error("Error generating blogs for all categories:", error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = (id: string): void => {
  const blogs = initializeBlogs();
  const updatedBlogs = blogs.filter(blog => blog.id.toString() !== id);
  localStorage.setItem('neural-nextgen-blogs', JSON.stringify(updatedBlogs));
  window.dispatchEvent(new StorageEvent('storage', { key: 'neural-nextgen-blogs' }));
};
