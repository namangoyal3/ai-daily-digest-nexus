
import { Bot, Code, Image, Video, Brain, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Bot,
    title: "AI Chatbots",
    count: "50+ Agents",
    description: "Conversational AI agents for customer service, sales, and support.",
    slug: "ai-chatbots",
    agents: [
      {
        id: "gpt-4o",
        name: "GPT-4o",
        company: "OpenAI",
        description: "Advanced multimodal model with enhanced reasoning and knowledge capabilities."
      },
      {
        id: "claude-3-opus",
        name: "Claude 3 Opus",
        company: "Anthropic",
        description: "High-performance AI assistant with strong reasoning and instruction-following abilities."
      },
      {
        id: "gemini-pro",
        name: "Gemini Pro",
        company: "Google",
        description: "Multimodal AI system designed to understand text, images, and code."
      },
      {
        id: "pi",
        name: "Pi",
        company: "Inflection AI",
        description: "Personal AI assistant focused on empathetic conversations and helpful guidance."
      },
      {
        id: "llama-3",
        name: "Llama 3",
        company: "Meta",
        description: "Open-source large language model trained on diverse data with strong reasoning capabilities."
      },
      {
        id: "mistral-large",
        name: "Mistral Large",
        company: "Mistral AI",
        description: "Powerful language model optimized for speed and reasoning accuracy."
      },
      {
        id: "copilot",
        name: "Microsoft Copilot",
        company: "Microsoft",
        description: "AI assistant with strong integration across Microsoft products and services."
      },
      {
        id: "grok",
        name: "Grok",
        company: "xAI",
        description: "AI assistant with real-time knowledge and a unique personality."
      },
      {
        id: "perplexity",
        name: "Perplexity AI",
        company: "Perplexity",
        description: "AI search assistant that provides sourced, comprehensive answers to questions."
      },
      {
        id: "claude-instant",
        name: "Claude Instant",
        company: "Anthropic",
        description: "Fast, cost-effective version of Claude optimized for quick interactions."
      }
    ]
  },
  {
    icon: Image,
    title: "AI Image Generators",
    count: "40+ Agents",
    description: "Tools that create and edit images based on text descriptions.",
    slug: "ai-image-generators",
    agents: [
      {
        id: "midjourney",
        name: "Midjourney",
        company: "Midjourney",
        description: "Advanced AI image generator known for high-quality artistic outputs."
      },
      {
        id: "dalle3",
        name: "DALL-E 3",
        company: "OpenAI",
        description: "Text-to-image model with precise control and photorealistic capabilities."
      },
      {
        id: "stable-diffusion-3",
        name: "Stable Diffusion 3",
        company: "Stability AI",
        description: "Open-source image generation model with high customizability."
      },
      {
        id: "firefly",
        name: "Adobe Firefly",
        company: "Adobe",
        description: "Creative generative AI focused on commercial-safe content generation."
      },
      {
        id: "imagen",
        name: "Imagen",
        company: "Google",
        description: "Google's text-to-image diffusion model with high fidelity and strong language understanding."
      },
      {
        id: "leonardo",
        name: "Leonardo.ai",
        company: "Leonardo",
        description: "AI image generation platform specialized for game development and creative workflows."
      },
      {
        id: "ideogram",
        name: "Ideogram",
        company: "Ideogram",
        description: "Text-to-image AI with strong capabilities for text rendering in images."
      },
      {
        id: "runway",
        name: "Runway Gen-2",
        company: "Runway",
        description: "Multimodal AI system for image, video, and 3D content generation."
      },
      {
        id: "artbreeder",
        name: "Artbreeder",
        company: "Artbreeder",
        description: "Collaborative platform for creating and evolving AI-generated imagery."
      },
      {
        id: "nightcafe",
        name: "NightCafe Creator",
        company: "NightCafe",
        description: "Easy-to-use AI art generator with multiple style options and algorithms."
      }
    ]
  },
  {
    icon: Video,
    title: "AI Video Tools",
    count: "35+ Agents",
    description: "Solutions for video creation, editing, and enhancement.",
    slug: "ai-video-tools",
    agents: [
      {
        id: "runway-gen2",
        name: "Runway Gen-2",
        company: "Runway",
        description: "Advanced text-to-video generation with sophisticated motion and quality."
      },
      {
        id: "pika",
        name: "Pika 1.0",
        company: "Pika Labs",
        description: "AI video generator with strong capabilities for creating high-quality short videos."
      },
      {
        id: "sora",
        name: "Sora",
        company: "OpenAI",
        description: "Text-to-video model generating realistic and imaginative scenes with high fidelity."
      },
      {
        id: "synthesia",
        name: "Synthesia",
        company: "Synthesia",
        description: "AI video platform for creating professional videos with virtual avatars."
      },
      {
        id: "descript",
        name: "Descript",
        company: "Descript",
        description: "All-in-one video editor with AI-powered transcription and editing tools."
      },
      {
        id: "luma-dream-machine",
        name: "Luma Dream Machine",
        company: "Luma AI",
        description: "High-quality text-to-video generator with strong 3D understanding."
      },
      {
        id: "heygen",
        name: "HeyGen",
        company: "HeyGen",
        description: "AI video generation platform specializing in customizable virtual avatars."
      },
      {
        id: "kapwing",
        name: "Kapwing",
        company: "Kapwing",
        description: "Online video editor with AI-powered tools for content creators."
      },
      {
        id: "pictory",
        name: "Pictory",
        company: "Pictory",
        description: "AI video creation tool that turns text into professional videos."
      },
      {
        id: "elai",
        name: "Elai.io",
        company: "Elai",
        description: "Text-to-video platform for creating AI presenter videos without filming."
      }
    ]
  },
  {
    icon: Brain,
    title: "AI Research Assistants",
    count: "30+ Agents",
    description: "Tools that help with analysis, summarization, and research.",
    slug: "ai-research-assistants",
    agents: [
      {
        id: "perplexity-pro",
        name: "Perplexity Pro",
        company: "Perplexity AI",
        description: "AI research assistant with real-time information access and source citation."
      },
      {
        id: "elicit",
        name: "Elicit",
        company: "Ought",
        description: "AI research assistant specialized for academic literature search and summarization."
      },
      {
        id: "consensus",
        name: "Consensus",
        company: "Consensus",
        description: "AI-powered search engine for finding scientific consensus on any topic."
      },
      {
        id: "research-rabbit",
        name: "ResearchRabbit",
        company: "ResearchRabbit",
        description: "AI-powered literature discovery and research mapping tool."
      },
      {
        id: "scispace",
        name: "SciSpace",
        company: "SciSpace",
        description: "AI research platform for discovering, reading, and understanding scientific papers."
      },
      {
        id: "scholarcy",
        name: "Scholarcy",
        company: "Scholarcy",
        description: "AI research summarizer that creates flashcards from academic papers."
      },
      {
        id: "scite",
        name: "Scite.ai",
        company: "Scite",
        description: "Citation analysis platform showing how papers have been cited with context."
      },
      {
        id: "paperpal",
        name: "Paperpal",
        company: "Paperpal",
        description: "AI writing assistant for academic research papers and manuscripts."
      },
      {
        id: "semanticscholar",
        name: "Semantic Scholar",
        company: "Allen Institute for AI",
        description: "AI-powered research tool for finding and understanding scientific literature."
      },
      {
        id: "iris-ai",
        name: "Iris.ai",
        company: "Iris.ai",
        description: "AI science assistant for research discovery and innovation."
      }
    ]
  },
  {
    icon: Code,
    title: "AI Coding Tools",
    count: "45+ Agents",
    description: "Development assistants and code generation solutions.",
    slug: "ai-coding-tools",
    agents: [
      {
        id: "github-copilot",
        name: "GitHub Copilot",
        company: "GitHub",
        description: "AI pair programmer that suggests code completions in real-time."
      },
      {
        id: "devin",
        name: "Devin",
        company: "Cognition Labs",
        description: "Autonomous AI software engineer capable of solving complex programming tasks."
      },
      {
        id: "codeium",
        name: "Codeium",
        company: "Codeium",
        description: "Free AI coding assistant with support for multiple languages and IDEs."
      },
      {
        id: "tabnine",
        name: "Tabnine",
        company: "Tabnine",
        description: "AI code completion tool that learns from your coding patterns."
      },
      {
        id: "replit-ghostwriter",
        name: "Replit Ghostwriter",
        company: "Replit",
        description: "AI coding assistant integrated within Replit's development environment."
      },
      {
        id: "amazon-codewhisperer",
        name: "Amazon CodeWhisperer",
        company: "Amazon",
        description: "AI coding companion that provides code suggestions during development."
      },
      {
        id: "codacy",
        name: "Codacy",
        company: "Codacy",
        description: "Automated code review tool with AI-powered quality checks."
      },
      {
        id: "sourcegraph-cody",
        name: "Sourcegraph Cody",
        company: "Sourcegraph",
        description: "AI coding assistant with strong codebase understanding capabilities."
      },
      {
        id: "cursor",
        name: "Cursor",
        company: "Cursor",
        description: "AI-first code editor designed to enhance programming productivity."
      },
      {
        id: "codium",
        name: "CodiumAI",
        company: "CodiumAI",
        description: "AI test generation tool that creates meaningful tests for your code."
      }
    ]
  },
  {
    icon: MessageSquare,
    title: "AI Customer Service",
    count: "35+ Agents",
    description: "Support agents that handle customer inquiries and requests.",
    slug: "ai-customer-service",
    agents: [
      {
        id: "intercom-fin",
        name: "Intercom Fin",
        company: "Intercom",
        description: "AI customer service agent that can resolve common support queries."
      },
      {
        id: "zendesk-ai",
        name: "Zendesk AI",
        company: "Zendesk",
        description: "AI-powered customer service platform for automated support."
      },
      {
        id: "kore-ai",
        name: "Kore.ai",
        company: "Kore.ai",
        description: "Conversational AI platform for enterprise virtual assistants."
      },
      {
        id: "ada",
        name: "Ada",
        company: "Ada",
        description: "AI-powered customer service automation platform for personalized support."
      },
      {
        id: "cognigy",
        name: "Cognigy.AI",
        company: "Cognigy",
        description: "Enterprise conversational AI platform for customer service automation."
      },
      {
        id: "ultimate-ai",
        name: "Ultimate.ai",
        company: "Ultimate",
        description: "AI customer service automation platform with strong integrations."
      },
      {
        id: "amelia",
        name: "Amelia",
        company: "Amelia",
        description: "Enterprise AI assistant for customer service and IT operations."
      },
      {
        id: "dialpad-ai",
        name: "Dialpad AI",
        company: "Dialpad",
        description: "AI-powered contact center platform with real-time assistance."
      },
      {
        id: "haptik",
        name: "Haptik",
        company: "Jio Haptik",
        description: "Conversational AI platform for customer engagement and support."
      },
      {
        id: "forethought",
        name: "Forethought",
        company: "Forethought",
        description: "AI platform for customer support with generative AI capabilities."
      }
    ]
  }
];

export default function AgentContentPreview() {
  return (
    <section id="categories" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-aiblue">
            Browse by Category
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our comprehensive collection of AI agents across various categories. We've curated the best tools and solutions to help you find the perfect AI agent for your specific needs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-aiblue to-aipurple rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-aipurple font-medium mb-3">{category.count}</p>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white"
                  asChild
                >
                  <Link to={`/agent/${category.agents[0].id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button 
              className="bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white px-8 py-3 text-lg"
              asChild
            >
              <Link to="/ai-agents">
                View All Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
