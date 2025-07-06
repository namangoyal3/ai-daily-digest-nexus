import { Blog } from "@/types/blog";
import { supabase } from "@/lib/supabase";

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: {
    loc: string;
    title?: string;
    caption?: string;
  }[];
}

export async function generateSitemap(): Promise<string> {
  const baseUrl = 'https://neuralnextgen.com';
  const urls: SitemapUrl[] = [];

  // Static pages
  const staticPages = [
    { path: '/', changefreq: 'weekly' as const, priority: 1.0 },
    { path: '/ai-digest', changefreq: 'weekly' as const, priority: 0.9 },
    { path: '/ai-agents', changefreq: 'weekly' as const, priority: 0.9 },
    { path: '/ai-courses', changefreq: 'weekly' as const, priority: 0.8 },
    { path: '/ai-blogs', changefreq: 'daily' as const, priority: 0.8 },
  ];

  staticPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Dynamic blog pages
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('id, slug, title, image_url, updated_at, published_at')
      .order('published_at', { ascending: false });

    if (!error && blogs) {
      blogs.forEach(blog => {
        const blogPath = blog.slug ? `/ai-blogs/${blog.slug}` : `/ai-blogs/${blog.id}`;
        const lastmod = blog.updated_at || blog.published_at || new Date().toISOString();
        
        urls.push({
          loc: `${baseUrl}${blogPath}`,
          lastmod: lastmod.split('T')[0],
          changefreq: 'monthly',
          priority: 0.7,
          images: blog.image_url ? [{
            loc: blog.image_url,
            title: blog.title,
            caption: `${blog.title} - NeuralNextGen Blog`
          }] : undefined
        });
      });
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  // Generate XML
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.images ? url.images.map(img => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title || '')}</image:title>
      <image:caption>${escapeXml(img.caption || '')}</image:caption>
    </image:image>`).join('') : ''}
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
}

export async function generateRSSFeed(): Promise<string> {
  const baseUrl = 'https://neuralnextgen.com';
  
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(20);

    if (error) {
      throw error;
    }

    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NeuralNextGen - AI Insights &amp; Analysis</title>
    <description>Stay informed with expert articles on AI technology, ethics, and applications</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>NeuralNextGen RSS Generator</generator>
    <webMaster>contact@neuralnextgen.com (NeuralNextGen)</webMaster>
    <managingEditor>contact@neuralnextgen.com (NeuralNextGen AI Team)</managingEditor>
    <category>Technology</category>
    <category>Artificial Intelligence</category>
    <ttl>60</ttl>
${blogs?.map(blog => {
  const blogUrl = blog.slug ? `${baseUrl}/ai-blogs/${blog.slug}` : `${baseUrl}/ai-blogs/${blog.id}`;
  const pubDate = blog.published_at ? new Date(blog.published_at).toUTCString() : new Date().toUTCString();
  
  return `    <item>
      <title>${escapeXml(blog.title)}</title>
      <description>${escapeXml(blog.excerpt || blog.meta_description || '')}</description>
      <link>${blogUrl}</link>
      <guid isPermaLink="true">${blogUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>contact@neuralnextgen.com (${escapeXml(blog.author_name || 'NeuralNextGen')})</author>
      <category>${escapeXml(blog.category)}</category>${blog.tags?.map(tag => `
      <category>${escapeXml(tag)}</category>`).join('') || ''}${blog.image_url ? `
      <enclosure url="${blog.image_url}" type="image/jpeg"/>` : ''}
    </item>`;
}).join('\n') || ''}
  </channel>
</rss>`;

    return rssContent;
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    throw error;
  }
}

export function generateStructuredData(blog: Blog): object {
  const baseUrl = 'https://neuralnextgen.com';
  const blogUrl = blog.slug ? `${baseUrl}/ai-blogs/${blog.slug}` : `${baseUrl}/ai-blogs/${blog.id}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.meta_description || blog.excerpt,
    "image": blog.image_url ? [blog.image_url] : undefined,
    "datePublished": blog.published_at || blog.date,
    "dateModified": blog.updated_at || blog.published_at || blog.date,
    "author": {
      "@type": "Organization",
      "name": blog.author_name || "NeuralNextGen",
      "description": blog.author_bio || "AI Research Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NeuralNextGen",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.ico`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": blogUrl
    },
    "url": blogUrl,
    "keywords": blog.keywords?.join(', '),
    "articleSection": blog.category,
    "wordCount": blog.content ? blog.content.split(' ').length : undefined,
    "timeRequired": blog.read_time,
    "inLanguage": "en-US"
  };
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}