
import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { CheckCircle, BookOpen } from "lucide-react";

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Apply syntax highlighting and prepare anchor links
  useEffect(() => {
    if (contentRef.current) {
      // Apply code syntax highlighting for code blocks (if any remain)
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
      
      // Add IDs to headings for table of contents links
      const headings = contentRef.current.querySelectorAll('h2, h3');
      headings.forEach((heading) => {
        const headingText = heading.textContent;
        if (headingText) {
          const id = headingText.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '-');
          heading.setAttribute('id', id);
        }
      });
    }
  }, [content]);
  
  // Check if content is properly formatted HTML or not
  const isFormattedHtml = 
    content && (
      content.includes('<h1>') || 
      content.includes('<section>') || 
      content.includes('<div class=')
    );
  
  // Safety check to ensure content exists
  if (!content) {
    return <div className="text-gray-600">No content available</div>;
  }
  
  return (
    <div 
      ref={contentRef}
      className="prose prose-gray max-w-none blog-content"
      dangerouslySetInnerHTML={{ __html: isFormattedHtml ? content : processLegacyContent(content) }}
    />
  );
};

/**
 * Process legacy content format to make it compatible with the new newsletter style
 */
function processLegacyContent(content: string): string {
  if (!content) return '';
  
  // Extract h1/title if present
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const title = h1Match ? h1Match[1] : 'AI Insights';
  
  // Remove any code blocks or technical content
  let processedContent = content.replace(/```[\s\S]*?```/g, '');
  processedContent = processedContent.replace(/`[^`]*`/g, '');
  processedContent = processedContent.replace(/<pre><code[\s\S]*?<\/code><\/pre>/g, '');
  
  // Split content by h2 headings to create proper sections
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const sections = processedContent.split(h2Regex);
  
  // Build proper HTML structure
  let formattedHtml = `<h1>${title}</h1>`;
  
  // Process sections
  for (let i = 1; i < sections.length; i += 2) {
    const sectionTitle = sections[i];
    const sectionContent = sections[i + 1] || '';
    
    formattedHtml += `
      <section>
        <h2>${sectionTitle}</h2>
        ${sectionContent}
      </section>
    `;
  }
  
  // Handle case where content doesn't have h2 headings
  if (sections.length <= 1) {
    formattedHtml += `<section>${processedContent}</section>`;
  }
  
  return formattedHtml;
}

export default BlogContent;
