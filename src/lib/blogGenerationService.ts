
import { supabase } from './supabase';
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
    console.log(`Generating blog post for category: ${category}${title ? `, title: ${title}` : ''}`);
    
    // Check if the API key is configured before proceeding
    const { data: keyData, error: keyError } = await supabase.functions.invoke('check-api-key-status', {
      body: { key_name: 'PERPLEXITY_API_KEY' }
    });
    
    if (keyError) {
      console.error('Error checking API key status:', keyError);
      toast.error('API key configuration error', {
        description: keyError.message || 'Failed to check API key configuration'
      });
      
      return {
        success: false,
        message: 'Failed to verify API key configuration: ' + keyError.message
      };
    }
    
    if (!keyData.configured) {
      toast.error('Perplexity API key not configured', {
        description: 'Please add your API key in the settings',
        action: {
          label: 'Settings',
          onClick: () => window.location.href = '/blog-settings'
        }
      });
      
      return {
        success: false,
        message: 'Perplexity API key is not configured in Supabase secrets'
      };
    }

    // Call the Supabase Edge Function
    console.log('Invoking generate-blog edge function...');
    const { data, error } = await supabase.functions.invoke('generate-blog', {
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

    console.log('Edge function response:', data);

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
      description: 'An unexpected error occurred: ' + errorMessage
    });
    
    return {
      success: false,
      message: errorMessage
    };
  }
}

/**
 * Generate blog posts one category at a time, sequentially 
 */
export async function generateBlogPostsForCategories(categories: string[]): Promise<{
  success: boolean;
  message: string;
  generatedCount: number;
  failedCategories?: string[];
}> {
  if (categories.length === 0) {
    toast.error('No categories selected', {
      description: 'Please select at least one category'
    });
    
    return {
      success: false,
      message: 'No categories provided',
      generatedCount: 0
    };
  }
  
  const results = [];
  const failed = [];
  let successCount = 0;
  
  console.log(`Starting sequential generation for ${categories.length} categories:`, categories);
  
  // Pick only the first category for now
  const selectedCategory = categories[0];
  
  try {
    console.log(`Generating blog for category: ${selectedCategory}...`);
    toast.info('Generating blog post', {
      description: `Creating content for category: ${selectedCategory}`
    });
    
    const result = await generateBlogPost({ category: selectedCategory });
    results.push(result);
    
    if (result.success) {
      console.log(`Successfully generated blog for ${selectedCategory}`);
      successCount++;
    } else {
      console.error(`Failed to generate blog for ${selectedCategory}:`, result.message);
      failed.push(selectedCategory);
    }
  } catch (error) {
    console.error(`Error generating blog for category ${selectedCategory}:`, error);
    failed.push(selectedCategory);
  }
  
  console.log(`Generation complete. Success: ${successCount}, Failed: ${failed.length}`);
  
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
    toast.warning(`Generated ${successCount} blog post`, {
      description: `Failed category: ${failed.join(', ')}`
    });
    
    return {
      success: true,
      message: `Generated ${successCount} blog post`,
      generatedCount: successCount,
      failedCategories: failed
    };
  }
  
  toast.success('Blog generation complete', {
    description: `Successfully generated a blog post for ${selectedCategory}`
  });
  
  return {
    success: true,
    message: `Successfully generated a blog post for ${selectedCategory}`,
    generatedCount: successCount
  };
}
