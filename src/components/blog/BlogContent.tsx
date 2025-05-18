
import React, { useEffect, useRef } from 'react';
import { CheckCircle, BookOpen } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Process content to enhance structure, formatting, and organization
  const processedContent = processContent(content);

  // Add anchor links and prepare interactive elements
  useEffect(() => {
    if (contentRef.current) {
      // Add IDs to headings for table of contents links
      const headings = contentRef.current.querySelectorAll('h2, h3');
      headings.forEach((heading) => {
        const id = heading.textContent?.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-') || '';
        heading.setAttribute('id', id);
      });
      
      // Add click handlers for table of contents links
      const tocLinks = contentRef.current.querySelectorAll('.toc-link');
      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = (link as HTMLAnchorElement).getAttribute('href')?.substring(1);
          if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    }
  }, [processedContent]);

  return (
    <>
      <style>
        {`
        .blog-content {
          font-family: var(--font-sans);
          line-height: 1.8;
          color: #1A1F2C;
          font-size: 1.05rem;
        }
        
        .blog-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1.5rem;
          color: #1A1F2C;
          font-family: 'Montserrat', sans-serif;
          line-height: 1.3;
        }
        
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #1A1F2C;
          font-family: 'Montserrat', sans-serif;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #1A1F2C;
          font-family: 'Montserrat', sans-serif;
        }
        
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-size: 1.05rem;
        }
        
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        
        .blog-content .toc {
          background-color: #F8F9FA;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 2rem 0;
          border: 1px solid #E9ECEF;
        }
        
        .blog-content .toc-title {
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Montserrat', sans-serif;
          color: #4361EE;
        }
        
        .blog-content .toc-link {
          color: #4361EE;
          text-decoration: none;
          display: block;
          padding: 0.4rem 0;
          transition: all 0.2s;
        }
        
        .blog-content .toc-link:hover {
          color: #2E3192;
          text-decoration: underline;
        }
        
        .blog-content .section-h2 {
          margin-top: 2.5rem;
          padding-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .blog-content .section-h2 svg {
          color: #4361EE;
        }
        
        .blog-content .section-h3 {
          margin-top: 1.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #1A1F2C;
        }
        
        .blog-content strong {
          font-weight: 600;
          color: #1A1F2C;
        }
        
        .blog-content em {
          font-style: italic;
          color: #4B5563;
          font-family: 'Playfair Display', serif;
        }
        
        .blog-content .callout {
          background-color: #EEF2FF;
          border-left: 4px solid #4361EE;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
        }
        
        .blog-content .key-takeaways {
          background-color: #F0F9FF;
          border: 1px solid #BAE6FD;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0.5rem;
        }
        
        .blog-content .key-takeaways-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #0369A1;
          font-family: 'Montserrat', sans-serif;
        }
        
        .blog-content .key-takeaways ul {
          margin-bottom: 0;
        }
        
        .blog-content .comparison-table {
          margin: 2rem 0;
          overflow-x: auto;
        }
        
        .blog-content .comparison-table table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .blog-content .comparison-table th {
          background-color: #F8F9FA;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #E9ECEF;
        }
        
        .blog-content .comparison-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #E9ECEF;
        }
        
        .blog-content .comparison-table tr:hover {
          background-color: #F8F9FA;
        }
        
        .blog-content .section-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background-color: #EEF2FF;
          border-radius: 0.5rem;
          margin-right: 0.75rem;
        }
        
        .blog-content .section-icon svg {
          color: #4361EE;
          width: 1.25rem;
          height: 1.25rem;
        }
        
        .blog-content blockquote {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: #4B5563;
          border-left: 3px solid #7C3AED;
          padding-left: 1.5rem;
          margin: 2rem 0;
          line-height: 1.7;
        }
        
        .blog-content blockquote p {
          margin-bottom: 0.5rem;
        }
        
        .blog-content blockquote cite {
          display: block;
          font-style: normal;
          font-weight: 500;
          font-size: 0.9rem;
          margin-top: 0.75rem;
          color: #6B7280;
        }
        
        @media (max-width: 768px) {
          .blog-content h1 {
            font-size: 1.75rem;
          }
          
          .blog-content h2 {
            font-size: 1.35rem;
          }
          
          .blog-content h3 {
            font-size: 1.15rem;
          }
          
          .blog-content p {
            font-size: 1rem;
          }
          
          .blog-content .comparison-table {
            font-size: 0.875rem;
          }
        }
        `}
      </style>
      <div 
        ref={contentRef}
        className="prose prose-gray max-w-none blog-content"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </>
  );
};

/**
 * Process content to enhance structure, formatting, and organization
 */
function processContent(content: string): string {
  if (!content) return '';
  
  // Step 1: Remove JSON code blocks and technical content
  let processedContent = removeCodeBlocks(content);
  
  // Step 2: Deduplicate content - remove repeated paragraphs and sentences
  processedContent = deduplicateContent(processedContent);
  
  // Step 3: Structure the content into logical sections
  processedContent = structureContent(processedContent);
  
  // Step 4: Add table of contents
  processedContent = addTableOfContents(processedContent);
  
  // Step 5: Format headings with icons
  processedContent = formatHeadings(processedContent);
  
  // Step 6: Enhance paragraph readability
  processedContent = enhanceParagraphReadability(processedContent);
  
  // Step 7: Add callout boxes for important information
  processedContent = addCalloutBoxes(processedContent);
  
  // Step 8: Add key takeaways sections
  processedContent = addKeyTakeaways(processedContent);
  
  // Step 9: Fix any content alignment issues
  processedContent = fixContentAlignment(processedContent);
  
  // Step 10: Remove empty sections or placeholders
  processedContent = removeEmptySections(processedContent);
  
  // Step 11: Convert any tables to properly styled tables
  processedContent = convertTables(processedContent);
  
  return processedContent;
}

/**
 * Remove code blocks and technical content
 */
function removeCodeBlocks(content: string): string {
  // Remove code blocks with triple backticks
  let cleanedContent = content.replace(/```[\s\S]*?```/g, '');
  
  // Remove inline code
  cleanedContent = cleanedContent.replace(/`[^`]*`/g, '');
  
  // Remove JSON blocks
  cleanedContent = cleanedContent.replace(/<pre><code class="language-json">[\s\S]*?<\/code><\/pre>/g, '');
  cleanedContent = cleanedContent.replace(/<pre><code>[\s\S]*?<\/code><\/pre>/g, '');
  
  // Remove any code examples or code blocks
  cleanedContent = cleanedContent.replace(/<div class="json-example">[\s\S]*?<\/div>/g, '');
  
  // Remove JSON specific content
  cleanedContent = cleanedContent.replace(/\{[\s\S]*?"[^"]+"\s*:\s*"[^"]*"[\s\S]*?\}/g, '');
  cleanedContent = cleanedContent.replace(/\[[\s\S]*?\{[\s\S]*?\}[\s\S]*?\]/g, '');
  
  // Remove any remaining technical jargon indicators
  cleanedContent = cleanedContent.replace(/\bJSON\b|\bAPI\b|\bfunction\b|\bparameter\b|\bobject\b|\barray\b|\bstring\b|\bboolean\b|\bnumber\b|\bundefined\b|\bnull\b|\bconsole\.log\b/g, '');
  
  // Remove typical JSON formatting
  cleanedContent = cleanedContent.replace(/\{[\s\n]*"[^"]+"\s*:\s*("[^"]*"|[\d.]+|\{|\[)[\s\S]*?\}/g, '');
  
  // Remove any lines with just curly braces, brackets, or commas (typical JSON syntax)
  cleanedContent = cleanedContent.replace(/^\s*[{}[\],]\s*$/gm, '');
  
  // Remove any remaining code syntax
  cleanedContent = cleanedContent.replace(/(var|let|const|function)\s+\w+\s*=/g, '');
  cleanedContent = cleanedContent.replace(/=>\s*{[\s\S]*?}/g, '');
  
  return cleanedContent;
}

/**
 * Deduplicate content by removing repeated paragraphs and information
 */
function deduplicateContent(content: string): string {
  // Parse the HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  
  // Extract paragraphs
  const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.textContent?.trim());
  
  // Identify duplicates
  const uniqueParagraphs = new Set();
  const duplicateIndices = [];
  
  paragraphs.forEach((paragraph, index) => {
    if (paragraph && paragraph.length > 20) { // Only consider substantial paragraphs
      if (uniqueParagraphs.has(paragraph)) {
        duplicateIndices.push(index);
      } else {
        uniqueParagraphs.add(paragraph);
      }
    }
  });
  
  // Remove duplicate paragraphs
  let processedContent = content;
  const paragraphTags = processedContent.match(/<p>.*?<\/p>/gs) || [];
  
  duplicateIndices.forEach(index => {
    if (paragraphTags[index]) {
      processedContent = processedContent.replace(paragraphTags[index], '');
    }
  });
  
  // Further deduplication - check for similar sentences
  const sentences = processedContent.match(/[^.!?]+[.!?]+/g) || [];
  const uniqueSentences = new Set();
  let deduplicatedContent = processedContent;
  
  sentences.forEach(sentence => {
    const normalized = sentence.trim().toLowerCase();
    if (normalized.length > 30) { // Only consider substantial sentences
      if (uniqueSentences.has(normalized)) {
        deduplicatedContent = deduplicatedContent.replace(sentence, '');
      } else {
        uniqueSentences.add(normalized);
      }
    }
  });
  
  // Remove duplicated phrases within paragraphs
  const paragraphsAgain = deduplicatedContent.match(/<p>.*?<\/p>/gs) || [];
  paragraphsAgain.forEach(paragraph => {
    const cleanParagraph = paragraph.replace(/<\/?p>/g, '');
    const phrases = cleanParagraph.match(/[^.!?]+[.!?]+/g) || [];
    
    // Find duplicated phrases within the same paragraph
    const uniquePhrases = new Set();
    const duplicatedPhrases = [];
    
    phrases.forEach(phrase => {
      const normalized = phrase.trim().toLowerCase();
      if (normalized.length > 20) { // Only consider substantial phrases
        if (uniquePhrases.has(normalized)) {
          duplicatedPhrases.push(phrase);
        } else {
          uniquePhrases.add(normalized);
        }
      }
    });
    
    // Remove duplicated phrases from the paragraph
    let cleanedParagraph = paragraph;
    duplicatedPhrases.forEach(phrase => {
      // Only remove the second instance onwards
      const firstIndex = cleanedParagraph.indexOf(phrase);
      if (firstIndex !== -1) {
        const secondIndex = cleanedParagraph.indexOf(phrase, firstIndex + 1);
        if (secondIndex !== -1) {
          cleanedParagraph = cleanedParagraph.slice(0, secondIndex) + cleanedParagraph.slice(secondIndex + phrase.length);
        }
      }
    });
    
    deduplicatedContent = deduplicatedContent.replace(paragraph, cleanedParagraph);
  });
  
  return deduplicatedContent;
}

/**
 * Structure content into logical sections
 */
function structureContent(content: string): string {
  // Check if content already has a clear structure
  const hasH1 = /<h1>.*?<\/h1>/i.test(content);
  const hasIntro = /introduction|overview|summary/i.test(content);
  const hasConclusion = /conclusion|summary|final thoughts/i.test(content);
  
  let structuredContent = content;
  
  // If no H1 heading, extract a title from the first paragraph
  if (!hasH1) {
    const firstParagraph = content.match(/<p>(.*?)<\/p>/);
    const title = firstParagraph ? firstParagraph[1].replace(/<.*?>/g, '') : 'AI Applications';
    
    // Create a title that's not too long
    const shortenedTitle = title.split(' ').slice(0, 8).join(' ') + (title.split(' ').length > 8 ? '...' : '');
    
    // Replace the first paragraph with an H1 heading
    structuredContent = structuredContent.replace(/<p>(.*?)<\/p>/, `<h1>${shortenedTitle}</h1>`);
  }
  
  // If no introduction section exists, add one
  if (!hasIntro) {
    const introMatch = structuredContent.match(/<p>(.*?)<\/p>/);
    if (introMatch) {
      const introContent = introMatch[0];
      structuredContent = structuredContent.replace(introMatch[0], `<h2>Introduction</h2>\n${introContent}`);
    }
  }
  
  // If no conclusion exists, add one at the end
  if (!hasConclusion) {
    structuredContent += `\n\n<h2>Conclusion</h2>\n<p>As AI technology continues to evolve, its applications across various industries will only expand, bringing new opportunities and challenges. The innovations discussed in this article represent just the beginning of what's possible with artificial intelligence.</p>`;
  }
  
  return structuredContent;
}

/**
 * Add table of contents with anchor links to each section
 */
function addTableOfContents(content: string): string {
  // Extract all h2 and h3 headings
  const headingPattern = /<h([23])>(.*?)<\/h\1>/g;
  const headings = [];
  let match;
  
  // Clone the content string for matching
  const contentCopy = content.toString();
  
  while ((match = headingPattern.exec(contentCopy)) !== null) {
    const level = match[1];
    const title = match[2].replace(/<.*?>/g, '').trim(); // Remove any HTML tags inside headings
    
    if (title && title.length > 0) {
      headings.push({
        level,
        title,
        id: title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
      });
    }
  }
  
  // Only generate TOC if we have enough headings
  if (headings.length > 2) {
    let tocHtml = `
      <div class="toc">
        <div class="toc-title">
          <BookOpen size={18} /> Table of Contents
        </div>
        <nav>
          <ul>
    `;
    
    headings.forEach(heading => {
      const indent = heading.level === '3' ? 'ml-4' : '';
      tocHtml += `<li class="${indent}"><a href="#${heading.id}" class="toc-link">${heading.title}</a></li>`;
    });
    
    tocHtml += `
          </ul>
        </nav>
      </div>
    `;
    
    // Insert after the first h1 or at the beginning if no h1
    const h1Match = content.match(/<\/h1>/i);
    if (h1Match && h1Match.index !== undefined) {
      const insertPosition = h1Match.index + h1Match[0].length;
      content = content.slice(0, insertPosition) + '\n' + tocHtml + content.slice(insertPosition);
    } else {
      content = tocHtml + content;
    }
  }
  
  return content;
}

/**
 * Format headings with icons and proper hierarchy
 */
function formatHeadings(content: string): string {
  // Add icons to h2 headings based on content
  content = content.replace(/<h2>(.*?)<\/h2>/g, (match, headingText) => {
    // Create an ID for the heading
    const id = headingText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
    
    // Choose icon based on heading content
    if (/introduction|overview|summary/i.test(headingText)) {
      return `<h2 class="section-h2" id="${id}"><span class="section-icon"><BookOpen /></span>${headingText}</h2>`;
    } else if (/productivity|tools|efficiency|automation/i.test(headingText)) {
      return `<h2 class="section-h2" id="${id}"><span class="section-icon"><BookOpen /></span>${headingText}</h2>`;
    } else if (/content creation|generation|creative/i.test(headingText)) {
      return `<h2 class="section-h2" id="${id}"><span class="section-icon"><BookOpen /></span>${headingText}</h2>`;
    } else if (/industry|business|enterprise|commercial/i.test(headingText)) {
      return `<h2 class="section-h2" id="${id}"><span class="section-icon"><BookOpen /></span>${headingText}</h2>`;
    } else if (/conclusion|summary|final/i.test(headingText)) {
      return `<h2 class="section-h2" id="${id}"><span class="section-icon"><CheckCircle /></span>${headingText}</h2>`;
    } else {
      return `<h2 class="section-h2" id="${id}"><span class="section-icon"><BookOpen /></span>${headingText}</h2>`;
    }
  });
  
  // Add proper styling to h3 headings
  content = content.replace(/<h3>(.*?)<\/h3>/g, (match, headingText) => {
    const id = headingText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
    return `<h3 class="section-h3" id="${id}">${headingText}</h3>`;
  });
  
  return content;
}

/**
 * Enhance paragraph readability by breaking up dense paragraphs
 */
function enhanceParagraphReadability(content: string): string {
  // Find long paragraphs (with more than ~4 sentences)
  content = content.replace(/<p>(.*?)<\/p>/gs, (match, paragraphText) => {
    // Count sentences by looking for period + space + capital letter or end of text
    const sentences = paragraphText.split(/\.\s+[A-Z]|\.\s*$/);
    
    if (sentences.length > 4) {
      // Break into multiple paragraphs of ~3 sentences each
      let newParagraphs = '';
      let currentParagraph = '';
      let sentenceCount = 0;
      
      // Rebuild the text with proper sentence endings
      let rebuiltText = paragraphText;
      
      // Split by sentence endings
      const sentenceParts = rebuiltText.split(/(\.\s+)/).filter(Boolean);
      
      for (let i = 0; i < sentenceParts.length; i += 2) {
        // Add the sentence
        currentParagraph += sentenceParts[i];
        
        // Add the period and space if available
        if (i + 1 < sentenceParts.length) {
          currentParagraph += sentenceParts[i + 1];
        }
        
        sentenceCount++;
        
        // After ~3 sentences, create a new paragraph
        if (sentenceCount >= 3 && i < sentenceParts.length - 2) {
          newParagraphs += `<p>${currentParagraph}</p>\n`;
          currentParagraph = '';
          sentenceCount = 0;
        }
      }
      
      // Add the last paragraph if there's content
      if (currentParagraph) {
        newParagraphs += `<p>${currentParagraph}</p>`;
      }
      
      return newParagraphs;
    }
    
    // Format key terms in paragraphs (terms that should be bold)
    paragraphText = paragraphText.replace(/\b(AI|artificial intelligence|machine learning|deep learning|neural networks|NLP|GPT|LLM|large language model)\b/gi, 
      match => `<strong>${match}</strong>`);
    
    return `<p>${paragraphText}</p>`;
  });
  
  return content;
}

/**
 * Add callout boxes for important information, statistics, or quotes
 */
function addCalloutBoxes(content: string): string {
  // Look for potential statistics or important statements
  content = content.replace(/(<p>.*?)(according to.*?|studies show.*?|research indicates.*?|statistics reveal.*?)(\.|,)(.*?<\/p>)/gi, 
    (match, prefix, quote, punctuation, suffix) => {
      return `<div class="callout">${prefix}<strong>${quote}${punctuation}</strong>${suffix}</div>`;
    });
  
  // Look for quotes or cited information
  content = content.replace(/(<p>.*?)("[^"]{30,}")(.*?<\/p>)/g, 
    (match, prefix, quote, suffix) => {
      return `<div class="callout">${prefix}<strong>${quote}</strong>${suffix}</div>`;
    });
  
  return content;
}

/**
 * Add key takeaways sections after major content segments
 */
function addKeyTakeaways(content: string): string {
  // Find major sections (h2 headings) that don't already have key takeaways
  const sections = content.split(/(<h2.*?>.*?<\/h2>)/g);
  
  let processedContent = '';
  
  for (let i = 0; i < sections.length; i++) {
    processedContent += sections[i];
    
    // If this is a heading and there's content after it
    if (i % 2 === 1 && i < sections.length - 1) {
      const sectionContent = sections[i + 1];
      
      // Skip if this section already has key takeaways
      if (!/key takeaways|summary of|to summarize/i.test(sectionContent)) {
        // Don't add key takeaways to the introduction or conclusion
        if (!/introduction|conclusion/i.test(sections[i])) {
          const heading = sections[i].match(/>([^<]*)</)?.[1] || 'This Section';
          
          // Generate takeaways based on content
          const takeaways = generateKeyTakeaways(sectionContent, heading);
          
          if (takeaways.length > 0) {
            // Add takeaways before the next heading
            processedContent += `
              <div class="key-takeaways">
                <div class="key-takeaways-title">
                  <CheckCircle size={18} /> Key Takeaways
                </div>
                <ul>
                  ${takeaways.map(point => `<li>${point}</li>`).join('')}
                </ul>
              </div>
            `;
          }
        }
      }
    }
  }
  
  return processedContent;
}

/**
 * Convert any table-like content to properly formatted HTML tables
 */
function convertTables(content: string): string {
  // Look for potential comparison sections
  const hasComparisonSection = /comparison|versus|vs\.|comparing|difference between/i.test(content);
  
  if (hasComparisonSection) {
    // Find paragraphs that might contain comparisons
    const paragraphs = content.match(/<p>.*?<\/p>/gs) || [];
    
    for (const paragraph of paragraphs) {
      if (/comparison|versus|vs\.|comparing|difference between/i.test(paragraph)) {
        // Extract the comparison content
        const comparisonText = paragraph.replace(/<\/?p>/g, '');
        
        // Check if there are enough items to compare (at least 2 items with properties)
        const items = comparisonText.match(/([A-Z][a-zA-Z0-9\s]+)(\sis\s|\shas\s|\soffers\s|\sprovides\s)/g);
        
        if (items && items.length >= 2) {
          // Create a comparison table
          const itemNames = items.map(item => item.replace(/(\sis\s|\shas\s|\soffers\s|\sprovides\s)/g, '').trim());
          
          // Extract properties for each item
          const properties = [];
          itemNames.forEach(item => {
            const regex = new RegExp(`${item}\\s(is|has|offers|provides)\\s([^.]+)`, 'gi');
            const matches = comparisonText.match(regex);
            if (matches) {
              matches.forEach(match => {
                const property = match.replace(regex, '$2').trim();
                properties.push({ item, property });
              });
            }
          });
          
          // Only create a table if we have enough properties
          if (properties.length >= 4) {
            let tableHtml = `
              <div class="comparison-table">
                <h4>Comparison of ${itemNames.join(' vs. ')}</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Feature</th>
                      ${itemNames.map(name => `<th>${name}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
            `;
            
            // Group properties by similar descriptions
            const groupedProperties: Record<string, { description: string, items: Record<string, string> }> = {};
            properties.forEach(({ item, property }) => {
              // Create a simplified key for grouping similar properties
              const simplifiedProperty = property.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ');
              
              if (!groupedProperties[simplifiedProperty]) {
                groupedProperties[simplifiedProperty] = { description: property, items: {} };
              }
              groupedProperties[simplifiedProperty].items[item] = property;
            });
            
            // Create table rows
            Object.values(groupedProperties).forEach(group => {
              tableHtml += '<tr>';
              tableHtml += `<td>Feature</td>`;
              
              itemNames.forEach(item => {
                if (group.items && group.items[item]) {
                  tableHtml += `<td>${group.items[item]}</td>`;
                } else {
                  tableHtml += '<td>-</td>';
                }
              });
              
              tableHtml += '</tr>';
            });
            
            tableHtml += `
                  </tbody>
                </table>
              </div>
            `;
            
            // Replace the paragraph with the table
            content = content.replace(paragraph, tableHtml);
          }
        }
      }
    }
  }
  
  return content;
}

/**
 * Fix content alignment issues
 */
function fixContentAlignment(content: string): string {
  // Make sure images are centered and responsive
  content = content.replace(/<img/g, '<img style="display: block; margin: 0 auto; max-width: 100%; height: auto;"');
  
  // Ensure paragraphs are properly aligned
  content = content.replace(/<p style="text-align: justify;/g, '<p');
  
  // Remove any fixed width constraints
  content = content.replace(/width: \d+px;/g, 'max-width: 100%;');
  content = content.replace(/max-width: \d+px;/g, 'max-width: 100%;');
  
  return content;
}

/**
 * Remove empty sections or placeholders
 */
function removeEmptySections(content: string): string {
  // Remove sections with no content
  content = content.replace(/<h[23]>.*?<\/h[23]>\s*<h[23]/g, '<h2');
  
  // Remove empty paragraphs
  content = content.replace(/<p>\s*<\/p>/g, '');
  
  // Remove placeholder text
  content = content.replace(/<p>(\s*Lorem ipsum.*?|.*?placeholder.*?)<\/p>/gi, '');

  // Remove empty sections (heading followed immediately by another heading)
  content = content.replace(/<h([23])>(.*?)<\/h\1>\s*(?=<h[23])/g, '');
  
  // Remove "section-h2" or "section-h3" text that might appear in the content
  content = content.replace(/section-h[23]"|id="/g, '');
  
  return content;
}

/**
 * Generate key takeaways based on section content
 */
function generateKeyTakeaways(content: string, heading: string): string[] {
  const takeaways = [];
  
  // Extract sentences with important keywords
  const sentences = content.replace(/<[^>]*>/g, ' ')  // Remove HTML tags
    .split(/\.\s+/)
    .filter(s => s.length > 20);  // Filter out very short sentences
  
  // Look for sentences with key indicators of importance
  const importantSentences = sentences.filter(s => 
    /important|significant|key|essential|critical|fundamental|primary|major|crucial/i.test(s)
  );
  
  // Add important sentences as takeaways
  importantSentences.slice(0, 2).forEach(s => {
    takeaways.push(s + '.');
  });
  
  // If we have fewer than 3 takeaways, add more based on the heading
  if (takeaways.length < 3) {
    if (/productivity/i.test(heading)) {
      takeaways.push('AI productivity tools can significantly reduce time spent on repetitive tasks.');
    } else if (/content creation/i.test(heading)) {
      takeaways.push('AI-powered content generation enables creators to focus more on strategy and less on production.');
    } else if (/industry/i.test(heading)) {
      takeaways.push('Industry-specific AI applications are creating new opportunities for innovation and efficiency.');
    } else if (/ethics/i.test(heading)) {
      takeaways.push('Ethical considerations are essential for responsible development and deployment of AI systems.');
    } else if (/future/i.test(heading)) {
      takeaways.push('Future AI advancements will continue to transform how we work, create, and solve problems.');
    }
  }
  
  // Ensure we have at least 2 takeaways
  while (takeaways.length < 2) {
    takeaways.push(`${heading} represents a significant advancement in how AI is being applied in practical scenarios.`);
  }
  
  return takeaways.slice(0, 3); // Limit to 3 takeaways maximum
}

export default BlogContent;
