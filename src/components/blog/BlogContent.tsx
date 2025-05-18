
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const highlightCodeBlocks = async () => {
      if (contentRef.current) {
        const codeBlocks = contentRef.current.querySelectorAll('pre code');
        
        if (codeBlocks.length > 0) {
          // Dynamically import highlight.js only if needed
          try {
            const hljs = await import('highlight.js');
            codeBlocks.forEach((block) => {
              hljs.default.highlightElement(block as HTMLElement);
            });
          } catch (error) {
            console.error('Failed to load highlight.js', error);
          }
        }
      }
    };

    highlightCodeBlocks();
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={cn(
        "prose prose-gray max-w-none",
        "prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900",
        "prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4",
        "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3",
        "prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4",
        "prose-a:text-aiblue prose-a:no-underline hover:prose-a:text-aipurple prose-a:transition-colors",
        "prose-blockquote:border-l-4 prose-blockquote:border-aipurple/30 prose-blockquote:bg-purple-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:my-6 prose-blockquote:rounded-r-sm prose-blockquote:italic",
        "prose-code:text-aipurple prose-code:bg-purple-50/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal",
        "prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg",
        "prose-img:rounded-lg prose-img:shadow-sm",
        "prose-strong:font-semibold",
        "prose-ul:my-6 prose-li:my-2",
        "prose-table:border-collapse prose-table:w-full prose-th:bg-gray-100 prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-gray-200"
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
