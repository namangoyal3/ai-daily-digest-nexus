import { useEffect, useState } from "react";

export default function RSS() {
  const [rssXml, setRssXml] = useState<string>("");

  useEffect(() => {
    // Fetch RSS from Edge Function
    fetch('/functions/v1/generate-rss')
      .then(response => response.text())
      .then(xml => setRssXml(xml))
      .catch(error => console.error('Error fetching RSS:', error));
  }, []);

  // This component doesn't render HTML, it serves XML
  return null;
}