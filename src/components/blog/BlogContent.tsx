
import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Code, BookOpen, CheckCircle } from "lucide-react";

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Process content to enhance structure, formatting, and organization
  const processedContent = processContent(content);

  // Add syntax highlighting for code blocks and prepare anchor links
  useEffect(() => {
    if (contentRef.current) {
      // Apply code syntax highlighting
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
      
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
        .blog-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1A1F2C;
          font-family: var(--font-heading);
          line-height: 1.2;
        }
        
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #1A1F2C;
          font-family: var(--font-heading);
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #1A1F2C;
        }
        
        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }
        
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content .toc {
          background-color: #F6F7F8;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 2rem 0;
        }
        
        .blog-content .toc-title {
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .blog-content .toc-link {
          color: #4361EE;
          text-decoration: none;
          display: block;
          padding: 0.25rem 0;
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
        
        .blog-content code {
          background-color: #F1F5F9;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #334155;
        }
        
        .blog-content pre {
          background-color: #1E293B;
          color: #E2E8F0;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
          color: #E2E8F0;
        }
        
        .blog-content strong {
          font-weight: 600;
          color: #1A1F2C;
        }
        
        .blog-content em {
          font-style: italic;
          color: #4B5563;
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
        }
        
        .blog-content .key-takeaways ul {
          margin-bottom: 0;
        }
        
        .blog-content .comparison-table {
          margin: 2rem 0;
          overflow-x: auto;
        }
        
        .blog-content .json-example {
          margin: 1.5rem 0;
        }
        
        .blog-content .json-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
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
        
        @media (max-width: 768px) {
          .blog-content h1 {
            font-size: 1.75rem;
          }
          
          .blog-content h2 {
            font-size: 1.5rem;
          }
          
          .blog-content h3 {
            font-size: 1.25rem;
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
  
  // Step 1: Deduplicate content
  let processedContent = deduplicateContent(content);
  
  // Step 2: Structure the content into logical sections
  processedContent = structureContent(processedContent);
  
  // Step 3: Add table of contents
  processedContent = addTableOfContents(processedContent);
  
  // Step 4: Format headings with icons
  processedContent = formatHeadings(processedContent);
  
  // Step 5: Enhance paragraph readability
  processedContent = enhanceParagraphReadability(processedContent);
  
  // Step 6: Add callout boxes for important information
  processedContent = addCalloutBoxes(processedContent);
  
  // Step 7: Process JSON content
  processedContent = processJsonContent(processedContent);
  
  // Step 8: Add key takeaways sections
  processedContent = addKeyTakeaways(processedContent);
  
  // Step 9: Add comparison tables
  processedContent = addComparisonTables(processedContent);
  
  return processedContent;
}

/**
 * Deduplicate content by removing repeated paragraphs and information
 */
function deduplicateContent(content: string): string {
  // Simple deduplication: remove exact duplicate paragraphs
  const paragraphs = content.split(/\n\n+/);
  const uniqueParagraphs = [...new Set(paragraphs)];
  
  // Further deduplication based on similarity could be implemented here
  // This would require more complex text analysis
  
  return uniqueParagraphs.join('\n\n');
}

/**
 * Structure content into logical sections with proper heading hierarchy
 */
function structureContent(content: string): string {
  // Identify if the content already has a clear structure
  const hasH1 = /<h1>.*?<\/h1>/i.test(content);
  const hasIntro = /introduction|overview|summary/i.test(content);
  const hasConclusion = /conclusion|summary|final thoughts/i.test(content);
  
  // If the content doesn't have a clear structure, add one
  if (!hasH1) {
    // Extract title from the first paragraph if available
    const firstParagraph = content.match(/<p>(.*?)<\/p>/);
    const title = firstParagraph ? firstParagraph[1] : 'AI Applications';
    
    // Replace the first paragraph with an H1 heading
    content = content.replace(/<p>(.*?)<\/p>/, `<h1>${title}</h1>`);
  }
  
  // If no introduction section exists, identify the first paragraph and mark it as introduction
  if (!hasIntro) {
    const introMatch = content.match(/<p>(.*?)<\/p>/);
    if (introMatch) {
      const introContent = introMatch[0];
      content = content.replace(introMatch[0], `<h2>Introduction</h2>\n${introContent}`);
    }
  }
  
  // If no conclusion exists, add one at the end
  if (!hasConclusion) {
    content += `\n\n<h2>Conclusion</h2>\n<p>As AI technology continues to evolve, its applications across various industries will only expand, bringing new opportunities and challenges. The tools and innovations discussed in this article represent just the beginning of what's possible with artificial intelligence.</p>`;
  }
  
  // Ensure proper section structure for AI applications
  const hasProductivitySection = /productivity|tools|efficiency|automation/i.test(content);
  const hasContentCreationSection = /content creation|generation|creative/i.test(content);
  const hasIndustrySection = /industry|business|enterprise|commercial/i.test(content);
  
  let structuredContent = content;
  
  // Add missing sections if needed
  if (!hasProductivitySection) {
    structuredContent += `\n\n<h2>AI in Productivity Tools</h2>\n<p>AI-powered productivity tools are revolutionizing how we work, automate routine tasks, and optimize efficiency across various domains.</p>`;
  }
  
  if (!hasContentCreationSection) {
    structuredContent += `\n\n<h2>AI in Content Creation</h2>\n<p>Content creation has been transformed by AI tools that can generate text, images, and even code, enabling creators to work more efficiently.</p>`;
  }
  
  if (!hasIndustrySection) {
    structuredContent += `\n\n<h2>AI in Industry Innovation</h2>\n<p>Industries across the board are implementing AI solutions to solve complex problems, improve processes, and drive innovation.</p>`;
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
    
    headings.push({
      level,
      title,
      id: title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
    });
  }
  
  // Generate table of contents HTML
  if (headings.length > 0) {
    let tocHtml = `
      <div class="toc">
        <div class="toc-title">
          <BookOpen class="w-5 h-5" /> Table of Contents
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
    if (h1Match) {
      const insertPosition = h1Match.index! + h1Match[0].length;
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
    let icon = '<span class="section-icon"><Lightbulb /></span>';
    
    if (/productivity|tools|efficiency|automation/i.test(headingText)) {
      icon = '<span class="section-icon"><Code /></span>';
    } else if (/content creation|generation|creative/i.test(headingText)) {
      icon = '<span class="section-icon"><Code /></span>';
    } else if (/industry|business|enterprise|commercial/i.test(headingText)) {
      icon = '<span class="section-icon"><BookOpen /></span>';
    } else if (/conclusion|summary|final/i.test(headingText)) {
      icon = '<span class="section-icon"><CheckCircle /></span>';
    }
    
    return `<h2 class="section-h2" id="${headingText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}">${icon}${headingText}</h2>`;
  });
  
  // Add subtle styling to h3 headings
  content = content.replace(/<h3>(.*?)<\/h3>/g, (match, headingText) => {
    return `<h3 class="section-h3" id="${headingText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}">${headingText}</h3>`;
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
      
      paragraphText.split(/(\.\s+)/).forEach((part, i, parts) => {
        currentParagraph += part;
        
        // If this part ends a sentence
        if (part.endsWith('.') && i < parts.length - 1) {
          sentenceCount++;
          
          // After ~3 sentences, create a new paragraph
          if (sentenceCount >= 3 && i < parts.length - 2) {
            newParagraphs += `<p>${currentParagraph}</p>\n`;
            currentParagraph = '';
            sentenceCount = 0;
          }
        }
      });
      
      // Add the last paragraph if there's content
      if (currentParagraph) {
        newParagraphs += `<p>${currentParagraph}</p>`;
      }
      
      return newParagraphs;
    }
    
    // Format key terms in paragraphs (terms that should be bold)
    paragraphText = paragraphText.replace(/\b(AI|artificial intelligence|machine learning|deep learning|neural networks|NLP|GPT|LLM|large language model)\b/gi, 
      match => `<strong>${match}</strong>`);
    
    // Format definitions in paragraphs (terms that should be italicized)
    paragraphText = paragraphText.replace(/\b([A-Z][a-z]+ is defined as|refers to|is a|are defined as)\b(.*?)(\.|,)/g, 
      (match, prefix, definition, punctuation) => `${prefix}<em>${definition}</em>${punctuation}`);
    
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
 * Process JSON content to convert it to human-readable format
 */
function processJsonContent(content: string): string {
  // Find JSON-like content (enclosed in triple backticks with json label)
  const jsonRegex = /```json\s*([\s\S]*?)\s*```/g;
  
  // Replace with formatted tables
  content = content.replace(jsonRegex, (match, jsonContent) => {
    try {
      // Try to parse the JSON
      const parsedJson = JSON.parse(jsonContent.trim());
      
      // Determine if it's an array or object
      if (Array.isArray(parsedJson)) {
        // Create table for array of objects
        if (parsedJson.length > 0 && typeof parsedJson[0] === 'object') {
          // Get all unique keys from all objects in the array
          const keys = Array.from(new Set(
            parsedJson.flatMap(obj => Object.keys(obj))
          ));
          
          let tableHtml = `
            <div class="json-example">
              <p class="json-title">Data Structure:</p>
              <div class="comparison-table">
                <table>
                  <thead>
                    <tr>
                      ${keys.map(key => `<th>${key}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
          `;
          
          parsedJson.forEach(item => {
            tableHtml += '<tr>';
            keys.forEach(key => {
              const value = item[key] !== undefined ? item[key] : '';
              tableHtml += `<td>${typeof value === 'object' ? JSON.stringify(value) : value}</td>`;
            });
            tableHtml += '</tr>';
          });
          
          tableHtml += `
                  </tbody>
                </table>
              </div>
              <p>The table above shows structured data with ${keys.length} properties and ${parsedJson.length} items.</p>
            </div>
          `;
          
          return tableHtml;
        } else {
          // Simple array
          return `
            <div class="json-example">
              <p class="json-title">Data Array:</p>
              <pre><code class="language-json">${JSON.stringify(parsedJson, null, 2)}</code></pre>
              <p>This array contains ${parsedJson.length} items of type ${typeof parsedJson[0]}.</p>
            </div>
          `;
        }
      } else {
        // Object
        return `
          <div class="json-example">
            <p class="json-title">Configuration Object:</p>
            <pre><code class="language-json">${JSON.stringify(parsedJson, null, 2)}</code></pre>
            <p>This object defines ${Object.keys(parsedJson).length} properties that configure the behavior of the system.</p>
          </div>
        `;
      }
    } catch (e) {
      // If parsing fails, return the original content with syntax highlighting
      return `
        <div class="json-example">
          <p class="json-title">Code Example:</p>
          <pre><code class="language-json">${jsonContent}</code></pre>
        </div>
      `;
    }
  });
  
  // Process code blocks for other languages
  const codeRegex = /```([a-z]*)\s*([\s\S]*?)\s*```/g;
  content = content.replace(codeRegex, (match, language, codeContent) => {
    if (language && language !== 'json') {
      return `
        <div class="json-example">
          <p class="json-title">${language.toUpperCase()} Code Example:</p>
          <pre><code class="language-${language}">${codeContent}</code></pre>
          <p>The above snippet demonstrates how to implement this functionality in ${language}.</p>
        </div>
      `;
    }
    return match;  // Return unchanged if it's not a language we're targeting
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
          
          // Add takeaways before the next heading
          processedContent += `
            <div class="key-takeaways">
              <div class="key-takeaways-title">
                <CheckCircle class="w-5 h-5" /> Key Takeaways
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
  
  return processedContent;
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
    }
    if (/content creation/i.test(heading)) {
      takeaways.push('AI-powered content generation enables creators to focus more on strategy and less on production.');
    }
    if (/industry/i.test(heading)) {
      takeaways.push('Industry-specific AI applications are creating new opportunities for innovation and efficiency.');
    }
  }
  
  // Ensure we have at least 3 takeaways
  while (takeaways.length < 3) {
    takeaways.push(`${heading} represents a significant advancement in how AI is being applied in practical scenarios.`);
  }
  
  return takeaways.slice(0, 4); // Limit to 4 takeaways maximum
}

/**
 * Add comparison tables for AI tools mentioned in the content
 */
function addComparisonTables(content: string): string {
  // Check if content already has comparison tables
  if (/<table/i.test(content)) {
    return content;
  }
  
  // Look for sections that mention multiple tools
  const aiToolRegex = /\b(GPT-4|Claude|DALL-E|Midjourney|Stable Diffusion|Jasper|Copy\.ai|GitHub Copilot|Tabnine|Codeium)\b/gi;
  const matches = content.match(aiToolRegex);
  
  // If we found tool mentions and there are multiple unique tools
  if (matches && new Set(matches.map(m => m.toLowerCase())).size > 2) {
    // Create two groups: text generation and image generation tools
    const textTools = ['GPT-4', 'Claude', 'Jasper', 'Copy.ai'].filter(
      tool => matches.some(m => m.toLowerCase() === tool.toLowerCase())
    );
    
    const codeTools = ['GitHub Copilot', 'Tabnine', 'Codeium'].filter(
      tool => matches.some(m => m.toLowerCase() === tool.toLowerCase())
    );
    
    const imageTools = ['DALL-E', 'Midjourney', 'Stable Diffusion'].filter(
      tool => matches.some(m => m.toLowerCase() === tool.toLowerCase())
    );
    
    // Create tables based on which tools were found
    let tableHtml = '';
    
    if (textTools.length >= 2) {
      tableHtml += `
        <div class="comparison-table">
          <h3>Text Generation AI Tools Comparison</h3>
          <table>
            <thead>
              <tr>
                <th>Tool</th>
                <th>Strengths</th>
                <th>Best For</th>
                <th>Limitations</th>
              </tr>
            </thead>
            <tbody>
              ${textTools.includes('GPT-4') ? `
              <tr>
                <td>GPT-4</td>
                <td>Advanced reasoning, broad knowledge, versatile</td>
                <td>Complex writing, creative content, research assistance</td>
                <td>May hallucinate facts, high cost, limited context window</td>
              </tr>
              ` : ''}
              ${textTools.includes('Claude') ? `
              <tr>
                <td>Claude</td>
                <td>Nuanced understanding, long context window, detailed responses</td>
                <td>Document analysis, conversational AI, content summarization</td>
                <td>Less widespread adoption, more limited API access</td>
              </tr>
              ` : ''}
              ${textTools.includes('Jasper') ? `
              <tr>
                <td>Jasper</td>
                <td>Marketing-focused, templates, team collaboration</td>
                <td>SEO content, email campaigns, social media posts</td>
                <td>Higher price point, learning curve for templates</td>
              </tr>
              ` : ''}
              ${textTools.includes('Copy.ai') ? `
              <tr>
                <td>Copy.ai</td>
                <td>User-friendly interface, good for short-form content</td>
                <td>Ad copy, product descriptions, social media captions</td>
                <td>Less effective for long-form content, limited customization</td>
              </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      `;
    }
    
    if (codeTools.length >= 2) {
      tableHtml += `
        <div class="comparison-table">
          <h3>AI Coding Assistants Comparison</h3>
          <table>
            <thead>
              <tr>
                <th>Tool</th>
                <th>Strengths</th>
                <th>Best For</th>
                <th>Limitations</th>
              </tr>
            </thead>
            <tbody>
              ${codeTools.includes('GitHub Copilot') ? `
              <tr>
                <td>GitHub Copilot</td>
                <td>Deep GitHub integration, whole-function suggestions</td>
                <td>General programming, multiple languages, project context</td>
                <td>Subscription cost, occasional inaccurate suggestions</td>
              </tr>
              ` : ''}
              ${codeTools.includes('Tabnine') ? `
              <tr>
                <td>Tabnine</td>
                <td>Lightweight, privacy-focused, local models available</td>
                <td>Code completion, function suggestions, varied environments</td>
                <td>Less powerful than larger models, shorter completions</td>
              </tr>
              ` : ''}
              ${codeTools.includes('Codeium') ? `
              <tr>
                <td>Codeium</td>
                <td>Free tier available, multi-editor support</td>
                <td>Quick code snippets, learning programming concepts</td>
                <td>Newer platform, smaller community, fewer integrations</td>
              </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      `;
    }
    
    if (imageTools.length >= 2) {
      tableHtml += `
        <div class="comparison-table">
          <h3>AI Image Generation Tools Comparison</h3>
          <table>
            <thead>
              <tr>
                <th>Tool</th>
                <th>Strengths</th>
                <th>Best For</th>
                <th>Limitations</th>
              </tr>
            </thead>
            <tbody>
              ${imageTools.includes('DALL-E') ? `
              <tr>
                <td>DALL-E</td>
                <td>Photorealistic outputs, intuitive prompt understanding</td>
                <td>Product visualization, concept art, marketing images</td>
                <td>Usage limits, less artistic stylization than competitors</td>
              </tr>
              ` : ''}
              ${imageTools.includes('Midjourney') ? `
              <tr>
                <td>Midjourney</td>
                <td>Artistic quality, stunning visuals, strong community</td>
                <td>Digital art, illustration, creative concepts</td>
                <td>Discord-only interface, less photorealism in some cases</td>
              </tr>
              ` : ''}
              ${imageTools.includes('Stable Diffusion') ? `
              <tr>
                <td>Stable Diffusion</td>
                <td>Open source, customizable, local installation option</td>
                <td>Custom models, experimental projects, unlimited generation</td>
                <td>Technical setup required, more prompt engineering needed</td>
              </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      `;
    }
    
    if (tableHtml) {
      // Find a good insertion point after the first mention of these tools
      const toolMentionRegex = new RegExp(`\\b(${textTools.concat(codeTools, imageTools).join('|')})\\b`, 'i');
      const match = content.match(toolMentionRegex);
      
      if (match && match.index) {
        // Find the end of the paragraph containing this mention
        const paragraphEndMatch = content.slice(match.index).match(/<\/p>/);
        
        if (paragraphEndMatch && paragraphEndMatch.index) {
          const insertPosition = match.index + paragraphEndMatch.index + paragraphEndMatch[0].length;
          content = content.slice(0, insertPosition) + tableHtml + content.slice(insertPosition);
        } else {
          // If we can't find the paragraph end, append to the content
          content += tableHtml;
        }
      } else {
        // Append to the content if no good insertion point
        content += tableHtml;
      }
    }
  }
  
  return content;
}

export default BlogContent;
