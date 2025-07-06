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

    return new Response(rssContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=1800'
      },
    });

  } catch (error) {
    console.error('Error generating RSS feed:', error);
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