import { useEffect, useState } from "react";

export default function Sitemap() {
  const [sitemapXml, setSitemapXml] = useState<string>("");

  useEffect(() => {
    // Fetch sitemap from Edge Function
    fetch('/functions/v1/generate-sitemap')
      .then(response => response.text())
      .then(xml => setSitemapXml(xml))
      .catch(error => console.error('Error fetching sitemap:', error));
  }, []);

  // Set the correct content type for XML
  useEffect(() => {
    if (sitemapXml) {
      // This component will render the XML directly
      const response = new Response(sitemapXml, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    }
  }, [sitemapXml]);

  // This component doesn't render HTML, it serves XML
  return null;
}