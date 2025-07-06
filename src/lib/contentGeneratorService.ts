import * as perplexityService from './perplexityService';
import * as huggingfaceService from './huggingfaceService';

export type ContentProvider = 'perplexity' | 'huggingface';

interface BlogGenerationResponse {
  title: string;
  content: string;
  excerpt: string;
  category: string;
}

export function getAvailableProviders(): ContentProvider[] {
  const providers: ContentProvider[] = [];
  
  if (localStorage.getItem('perplexity_api_key')) {
    providers.push('perplexity');
  }
  
  if (localStorage.getItem('huggingface_api_key')) {
    providers.push('huggingface');
  }
  
  return providers;
}

export function getDefaultProvider(): ContentProvider | null {
  const providers = getAvailableProviders();
  
  // Prefer Perplexity as it has better web connectivity
  if (providers.includes('perplexity')) {
    return 'perplexity';
  }
  
  if (providers.includes('huggingface')) {
    return 'huggingface';
  }
  
  return null;
}

export async function generateBlogContent(
  category?: string, 
  provider?: ContentProvider
): Promise<BlogGenerationResponse> {
  const selectedProvider = provider || getDefaultProvider();
  
  if (!selectedProvider) {
    throw new Error("No content generation provider configured. Please set up an API key in settings.");
  }
  
  console.log(`Using ${selectedProvider} for content generation`);
  
  switch (selectedProvider) {
    case 'perplexity':
      return perplexityService.generateBlogContent(category);
    case 'huggingface':
      return huggingfaceService.generateBlogContent(category);
    default:
      throw new Error(`Unsupported provider: ${selectedProvider}`);
  }
}

export function getProviderDisplayName(provider: ContentProvider): string {
  switch (provider) {
    case 'perplexity':
      return 'Perplexity AI';
    case 'huggingface':
      return 'Hugging Face';
    default:
      return provider;
  }
}