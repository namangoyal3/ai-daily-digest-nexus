import { Helmet } from "react-helmet";
import { Blog } from "@/types/blog";
import { generateStructuredData } from "@/lib/seoService";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  blog?: Blog;
}

export default function SEOHead({
  title = "NeuralNextGen - AI Tools, Insights & Analysis",
  description = "Discover the latest AI tools, insights, and analysis. Stay informed with expert articles on artificial intelligence, machine learning, and their applications.",
  keywords = ["AI tools", "artificial intelligence", "machine learning", "AI insights", "AI analysis", "AI trends"],
  canonicalUrl,
  ogImage,
  ogType = "website",
  blog
}: SEOHeadProps) {
  const baseUrl = "https://neuralnextgen.com";
  const fullCanonicalUrl = canonicalUrl || baseUrl;
  const fullOgImage = ogImage || `${baseUrl}/favicon.ico`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="NeuralNextGen" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="NeuralNextGen" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Blog-specific structured data */}
      {blog && (
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData(blog))}
        </script>
      )}

      {/* General structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NeuralNextGen",
          "url": baseUrl,
          "logo": `${baseUrl}/favicon.ico`,
          "description": "Leading AI insights, tools, and analysis platform",
          "sameAs": [
            "https://twitter.com/neuralnextgen",
            "https://linkedin.com/company/neuralnextgen"
          ]
        })}
      </script>
    </Helmet>
  );
}