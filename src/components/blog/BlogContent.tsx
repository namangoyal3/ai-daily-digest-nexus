
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  // Apply syntax highlighting to code blocks on component mount
  React.useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [content]);

  // Process the content to enhance various elements
  const processContent = () => {
    // Create a temporary element to work with the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Add classes to headings for styling
    tempDiv.querySelectorAll('h2').forEach(heading => {
      heading.classList.add('text-2xl', 'font-heading', 'font-bold', 'mt-8', 'mb-4', 'text-aiblue');
    });

    tempDiv.querySelectorAll('h3').forEach(heading => {
      heading.classList.add('text-xl', 'font-heading', 'font-bold', 'mt-6', 'mb-3', 'text-gray-800');
    });

    // Style paragraphs for readability
    tempDiv.querySelectorAll('p').forEach(paragraph => {
      paragraph.classList.add('my-4', 'text-gray-700', 'leading-relaxed');
    });

    // Enhance lists
    tempDiv.querySelectorAll('ul, ol').forEach(list => {
      list.classList.add('my-4', 'ml-6', 'space-y-2');
      
      list.querySelectorAll('li').forEach(item => {
        item.classList.add('text-gray-700');
      });
    });

    // Style blockquotes
    tempDiv.querySelectorAll('blockquote').forEach(quote => {
      quote.classList.add('my-6', 'pl-4', 'border-l-4', 'border-aiblue', 'italic', 'text-gray-700', 'bg-gray-50', 'p-4', 'rounded-r');
    });

    // Add button styling to call-to-action links
    tempDiv.querySelectorAll('a').forEach(link => {
      // If this link is part of a call to action section, style it as a button
      const parentHeading = link.closest('h2, h3, p');
      if (parentHeading && (
        parentHeading.textContent?.includes('Call to Action') || 
        parentHeading.previousElementSibling?.textContent?.includes('Call to Action')
      )) {
        link.classList.add('inline-flex', 'items-center', 'gap-1', 'bg-gradient-to-r', 'from-aiblue', 'to-aipurple', 'text-white', 'px-4', 'py-2', 'rounded', 'hover:from-aipurple', 'hover:to-aiblue', 'transition-all', 'font-medium', 'mt-2');
        
        // Add an external link icon
        const icon = document.createElement('span');
        icon.innerHTML = '→';
        icon.classList.add('ml-1');
        link.appendChild(icon);
      } else {
        link.classList.add('text-aiblue', 'hover:text-aipurple', 'underline', 'transition-colors');
      }
    });

    // Format feedback section
    const feedbackHeading = Array.from(tempDiv.querySelectorAll('h2, h3')).find(
      heading => heading.textContent?.includes('Feedback')
    );
    if (feedbackHeading) {
      const feedbackSection = document.createElement('div');
      feedbackSection.classList.add('my-8', 'p-6', 'bg-gray-50', 'rounded-lg', 'border', 'border-gray-200');
      
      // Move the heading and subsequent elements until the next heading
      let currentElement = feedbackHeading;
      const elementsToMove = [currentElement];
      
      while (currentElement.nextElementSibling && 
             !['H2', 'H3'].includes(currentElement.nextElementSibling.tagName)) {
        elementsToMove.push(currentElement.nextElementSibling);
        currentElement = currentElement.nextElementSibling;
      }
      
      // Add elements to the feedback section
      elementsToMove.forEach(el => {
        feedbackSection.appendChild(el.cloneNode(true));
      });
      
      // Replace the original elements with the feedback section
      if (elementsToMove.length > 0) {
        elementsToMove[0].parentNode?.insertBefore(feedbackSection, elementsToMove[0]);
        elementsToMove.forEach(el => el.remove());
      }
    }

    // Add line separators between major sections
    tempDiv.querySelectorAll('h2').forEach(heading => {
      if (heading.previousElementSibling && heading.previousElementSibling.tagName !== 'HR') {
        const separator = document.createElement('hr');
        separator.classList.add('my-8', 'border-t', 'border-gray-200');
        heading.parentNode?.insertBefore(separator, heading);
      }
    });

    return tempDiv.innerHTML;
  };

  return (
    <div 
      className="prose prose-gray max-w-none"
      dangerouslySetInnerHTML={{ __html: processContent() }}
    />
  );
};

export default BlogContent;
