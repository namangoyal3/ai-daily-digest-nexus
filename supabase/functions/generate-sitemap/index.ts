import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const baseUrl = 'https://neuralnextgen.com';
    const urls: any[] = [];

    // Static pages
    const staticPages = [
      { path: '/', changefreq: 'weekly', priority: 1.0 },
      { path: '/ai-digest', changefreq: 'weekly', priority: 0.9 },
      { path: '/ai-agents', changefreq: 'weekly', priority: 0.9 },
      { path: '/ai-courses', changefreq: 'weekly', priority: 0.8 },
      { path: '/ai-blogs', changefreq: 'daily', priority: 0.8 },
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

    // Generate XML
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.images ? url.images.map((img: any) => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title || '')}</image:title>
      <image:caption>${escapeXml(img.caption || '')}</image:caption>
    </image:image>`).join('') : ''}
  </url>`).join('\n')}
</urlset>`;

    return new Response(xmlContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}