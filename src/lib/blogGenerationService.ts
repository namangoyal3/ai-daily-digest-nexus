
import { supabaseClient } from './supabase';
import { toast } from 'sonner';

interface GenerateBlogParams {
  category: string;
  title?: string;
}

interface GenerateBlogResponse {
  success: boolean;
  message: string;
  blogId?: string;
  imageUrl?: string;
  duplicate?: boolean;
}

/**
 * Generate a blog post using the Supabase Edge Function
 */
export async function generateBlogPost({
  category,
  title
}: GenerateBlogParams): Promise<GenerateBlogResponse> {
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabaseClient.functions.invoke('generate-blog', {
      body: {
        category,
        title
      }
    });

    if (error) {
      console.error('Error invoking generate-blog function:', error);
      toast.error('Failed to generate blog post', {
        description: error.message || 'Please try again or check API settings'
      });
      
      return {
        success: false,
        message: error.message || 'Failed to generate blog post'
      };
    }

    if (data.duplicate) {
      toast.error('Duplicate blog post', {
        description: data.message
      });
      
      return {
        success: false,
        message: data.message,
        duplicate: true,
        blogId: data.blog_id
      };
    }

    if (!data.success) {
      toast.error('Failed to generate blog post', {
        description: data.message
      });
      
      return {
        success: false,
        message: data.message
      };
    }

    toast.success('Blog post generated successfully', {
      description: 'New blog post has been created and published'
    });

    return {
      success: true,
      message: data.message,
      blogId: data.blog_id,
      imageUrl: data.image_url
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error generating blog post:', errorMessage);
    
    toast.error('Failed to generate blog post', {
      description: 'An unexpected error occurred'
    });
    
    return {
      success: false,
      message: errorMessage
    };
  }
}

/**
 * Generate blog posts for multiple categories 
 */
export async function generateBlogPostsForCategories(categories: string[]): Promise<{
  success: boolean;
  message: string;
  generatedCount: number;
  failedCategories?: string[];
}> {
  const results = [];
  const failed = [];
  let successCount = 0;

  for (const category of categories) {
    try {
      const result = await generateBlogPost({ category });
      results.push(result);
      
      if (result.success) {
        successCount++;
      } else {
        failed.push(category);
      }
      
      // Add a small delay between generations to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error generating blog for category ${category}:`, error);
      failed.push(category);
    }
  }

  if (successCount === 0) {
    toast.error('Blog generation failed', {
      description: 'Failed to generate any blog posts'
    });
    
    return {
      success: false,
      message: 'Failed to generate any blog posts',
      generatedCount: 0,
      failedCategories: failed
    };
  }

  if (failed.length > 0) {
    toast.warning(`Generated ${successCount} of ${categories.length} blog posts`, {
      description: `Failed categories: ${failed.join(', ')}`
    });
    
    return {
      success: true,
      message: `Generated ${successCount} of ${categories.length} blog posts`,
      generatedCount: successCount,
      failedCategories: failed
    };
  }

  toast.success('Blog generation complete', {
    description: `Successfully generated ${successCount} blog posts`
  });
  
  return {
    success: true,
    message: `Successfully generated ${successCount} blog posts`,
    generatedCount: successCount
  };
}
