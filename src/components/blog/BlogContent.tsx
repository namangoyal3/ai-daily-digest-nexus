
import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { CheckCircle, BookOpen } from "lucide-react";

interface BlogContentProps {
  content: string;
}

// Define an array of gradients that match the design system
const sectionGradients = [
  'from-white to-blue-50/30', // Light blue gradient
  'from-white to-purple-50/30', // Light purple gradient
  'from-white to-green-50/20', // Light green gradient
  'from-white to-amber-50/20', // Light amber gradient
  'from-white to-rose-50/20', // Light rose gradient
  'from-white to-teal-50/20', // Light teal gradient
  'from-white to-indigo-50/20', // Light indigo gradient
  'from-white to-sky-50/20', // Light sky gradient
];

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

      // Apply alternating backgrounds to sections
      applyAlternatingBackgrounds(contentRef.current);
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
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        #root {
          width: 100vw;
          max-width: 100vw;
          margin: 0 auto;
          padding: 0;
        }

        .blog-content-full-width {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    
      <div 
        ref={contentRef}
        className="prose prose-gray max-w-none w-full blog-content blog-content-full-width"
        dangerouslySetInnerHTML={{ __html: isFormattedHtml ? enhanceContent(content) : processLegacyContent(content) }}
      />
    </>
  );
};

/**
 * Apply alternating background gradients to sections
 */
function applyAlternatingBackgrounds(container: HTMLElement): void {
  const sections = container.querySelectorAll('section');
  sections.forEach((section, index) => {
    // Get a random gradient for this section
    const randomGradientIndex = Math.floor(Math.random() * sectionGradients.length);
    const gradientClass = sectionGradients[randomGradientIndex];
    
    // Apply the gradient class and additional styling
    section.classList.add('bg-gradient-to-br', ...gradientClass.split(' '));
    section.classList.add('rounded-xl', 'p-6', 'md:p-8', 'my-8', 'md:my-10', 'shadow-sm');
  });
}

/**
 * Enhance HTML content with design system styling
 */
function enhanceContent(content: string): string {
  // Apply font classes to headings
  let enhancedContent = content
    .replace(/<h1([^>]*)>/g, '<h1$1 class="font-heading font-bold text-aipurple mb-6 text-3xl md:text-4xl">') 
    .replace(/<h2([^>]*)>/g, '<h2$1 class="font-heading font-semibold text-aiblue mt-8 mb-4 text-2xl md:text-3xl">') 
    .replace(/<h3([^>]*)>/g, '<h3$1 class="font-heading font-medium text-gray-800 mt-6 mb-3 text-xl md:text-2xl">')
    .replace(/<blockquote([^>]*)>/g, '<blockquote$1 class="border-l-4 border-aipurple bg-purple-50/50 pl-4 py-2 my-6 italic">')
    .replace(/<a([^>]*)>/g, '<a$1 class="text-aiblue hover:text-aipurple transition-colors underline">');

  // Add design system styling to any bulleted lists
  enhancedContent = enhancedContent.replace(/<ul([^>]*)>/g, '<ul$1 class="space-y-3 my-6 list-none">');
  enhancedContent = enhancedContent.replace(/<li([^>]*)>/g, '<li$1 class="flex items-start"><span class="inline-block mr-2 mt-1 text-aipurple">•</span><span>');
  enhancedContent = enhancedContent.replace(/<\/li>/g, '</span></li>');
  
  // Style paragraphs with proper spacing
  enhancedContent = enhancedContent.replace(/<p([^>]*)>/g, '<p$1 class="my-4 leading-relaxed">');
  
  // Add container wrapper to ensure full width
  enhancedContent = `<div class="w-full mx-auto px-4">${enhancedContent}</div>`;

  return enhancedContent;
}

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
  
  // Build proper HTML structure with design system classes
  let formattedHtml = `<h1 class="font-heading font-bold text-aipurple mb-6 text-3xl md:text-4xl">${title}</h1>`;
  
  // Process sections
  for (let i = 1; i < sections.length; i += 2) {
    const sectionTitle = sections[i];
    const sectionContent = sections[i + 1] || '';
    
    formattedHtml += `
      <section class="rounded-xl p-6 md:p-8 my-8 md:my-10 shadow-sm">
        <h2 class="font-heading font-semibold text-aiblue mb-4 text-2xl md:text-3xl">${sectionTitle}</h2>
        ${sectionContent}
      </section>
    `;
  }
  
  // Handle case where content doesn't have h2 headings
  if (sections.length <= 1) {
    formattedHtml += `<section class="rounded-xl p-6 md:p-8 my-8 md:my-10 shadow-sm">${processedContent}</section>`;
  }
  
  // Use full width container
  formattedHtml = `<div class="w-full mx-auto px-4">${formattedHtml}</div>`;
  
  return formattedHtml;
}

export default BlogContent;
