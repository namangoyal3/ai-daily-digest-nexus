
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const relatedArticles = [
  {
    title: "Top 10 AI Chatbots for Customer Service in 2025",
    description: "Discover the best AI chatbots that can transform your customer service operations with 24/7 support and natural conversations.",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e",
    slug: "top-ai-chatbots-customer-service",
    date: "April 15, 2025"
  },
  {
    title: "How to Choose the Right AI Image Generator for Your Creative Projects",
    description: "Compare the leading AI image generation tools like Midjourney, DALL-E 3, and Stable Diffusion to find your perfect creative companion.",
    image: "https://images.unsplash.com/photo-1633186680566-3b8dd9eb8815",
    slug: "choose-right-ai-image-generator",
    date: "April 10, 2025"
  },
  {
    title: "Free vs Paid AI Tools: Is the Premium Worth It?",
    description: "We analyze the differences between free and paid AI solutions to help you decide when it's worth investing in premium AI tools.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    slug: "free-vs-paid-ai-tools-comparison",
    date: "April 5, 2025"
  },
];

const relatedGuides = [
  "Beginner's Guide to Using AI for Content Creation",
  "How to Integrate AI Tools into Your Business Workflow",
  "The Complete Guide to AI Image Generators",
  "Understanding AI Models: GPT, Claude, and LLaMa Explained",
  "AI Safety and Ethics: What Users Should Know"
];

export default function RelatedContent() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Resources & Guides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {relatedArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/article/${article.slug}`} className="block h-full">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.description}</p>
                      <div className="flex items-center text-aiblue font-medium">
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-6">Popular AI Guides</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedGuides.map((guide, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/guide/${guide.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="flex items-center group">
                    <span className="w-2 h-2 bg-aiblue rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    <span className="text-gray-700 group-hover:text-aiblue transition-colors">{guide}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
