
import { Blog } from "@/types/blog";
import { generateBlogContent } from "./perplexityService";
import { fetchRandomImage } from "./pollinationsService";
import { formatDate } from "./dateUtils";
import { getScheduleConfig } from "./schedulingService";

// In-memory storage for blogs (would typically be in a database)
const blogs: Blog[] = [
  {
    id: 1,
    title: "The Future of AI in 2025: Trends and Predictions",
    excerpt: "Explore the emerging trends and innovations that will shape artificial intelligence in the coming year.",
    content: `
      <p>Artificial intelligence continues to evolve at a remarkable pace, transforming industries and our daily lives. As we look ahead to 2025, several key trends are emerging that will define the next phase of AI development.</p>
      
      <h2>Multimodal AI Systems</h2>
      <p>One of the most significant developments is the rise of multimodal AI systems—models that can process and generate different types of data simultaneously, including text, images, audio, and video. These systems are becoming increasingly sophisticated, enabling more natural and versatile interactions between humans and machines.</p>
      
      <p>Instead of specialized AI systems for specific tasks, we're seeing the emergence of models that can seamlessly transition between different modes of communication and analysis. This convergence of capabilities is opening up new possibilities for applications in fields ranging from healthcare to creative industries.</p>
      
      <blockquote>
        <p>"Multimodal AI represents the next frontier in artificial intelligence. By combining different forms of perception and generation, these systems are beginning to develop a more holistic understanding of the world."</p>
        <cite>— Dr. Emma Chen, AI Research Director</cite>
      </blockquote>
      
      <h2>Responsible AI Development</h2>
      <p>As AI becomes more powerful and pervasive, the focus on responsible development and deployment is intensifying. Organizations are increasingly adopting ethical frameworks and governance structures to ensure AI systems are fair, transparent, accountable, and aligned with human values.</p>
      
      <p>Regulatory bodies around the world are establishing guidelines and standards for AI development, with a particular emphasis on high-risk applications. This regulatory landscape is expected to mature significantly by 2025, providing clearer guardrails for innovation while mitigating potential harms.</p>
      
      <h2>Edge AI Advancements</h2>
      <p>Edge AI—artificial intelligence that runs directly on devices rather than in the cloud—is gaining momentum due to advances in hardware and algorithmic efficiency. This approach offers several advantages, including:</p>
      
      <ul>
        <li>Reduced latency for real-time applications</li>
        <li>Enhanced privacy by keeping sensitive data on-device</li>
        <li>Improved reliability with less dependence on network connectivity</li>
        <li>Lower power consumption and carbon footprint</li>
      </ul>
      
      <p>By 2025, we expect to see more sophisticated AI capabilities running on everything from smartphones and wearables to industrial equipment and autonomous vehicles.</p>
      
      <h2>AI-Human Collaboration</h2>
      <p>Rather than replacing human workers, the most successful AI implementations are those that enhance human capabilities through effective collaboration. Organizations are increasingly designing AI systems that complement human strengths while compensating for limitations.</p>
      
      <p>This collaborative approach is yielding productivity gains across various sectors, from creative fields where AI serves as a co-pilot for designers and writers, to complex decision-making scenarios where AI helps process vast amounts of data while humans provide contextual understanding and ethical judgment.</p>
      
      <h2>Conclusion</h2>
      <p>The AI landscape of 2025 will be characterized by more capable and versatile systems that work alongside humans in increasingly seamless ways. As these technologies continue to mature, maintaining a focus on responsible development and thoughtful integration will be essential to realizing their full potential while managing associated risks.</p>
      
      <p>The organizations that thrive in this environment will be those that view AI not merely as a technology to be deployed, but as a collaborative partner in solving complex problems and creating new value.</p>
    `,
    date: "2025-04-15",
    readTime: "5 min read",
    category: "AI Trends",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    author: {
      name: "Alex Morgan",
      role: "AI Research Analyst"
    },
    tags: ["artificial intelligence", "future tech", "machine learning", "technology trends"]
  },
  {
    id: 2,
    title: "Understanding Large Language Models",
    excerpt: "A comprehensive guide to how LLMs work and their impact on various industries.",
    content: `
      <p>Large Language Models (LLMs) have transformed the field of artificial intelligence, enabling systems to generate human-like text, translate languages, write different kinds of creative content, and answer questions in an informative way. This article provides an in-depth exploration of how these powerful models work and their growing impact across industries.</p>
      
      <h2>The Architecture Behind LLMs</h2>
      <p>At their core, modern LLMs utilize transformer architectures—a type of neural network design that excels at processing sequential data like text. Unlike earlier models that processed text one word at a time, transformers use a mechanism called "attention" to consider the entire context of a passage simultaneously.</p>
      
      <p>This parallel processing approach allows LLMs to better understand the relationships between words and concepts in a text, regardless of how far apart they appear. The result is a more coherent and contextually appropriate output that can maintain consistency across long passages.</p>
      
      <pre><code class="language-python">
# Simplified example of how a transformer processes text
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

# Process text
input_text = "Large language models are"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids
output = model.generate(input_ids, max_length=50)

# Decode the output
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)
      </code></pre>
      
      <h2>Training and Scale</h2>
      <p>Modern LLMs are trained on vast datasets containing hundreds of billions of words from diverse sources, including books, articles, websites, and code repositories. This extensive training allows them to develop a broad understanding of language patterns, factual knowledge, and even some reasoning capabilities.</p>
      
      <p>The scale of these models has grown dramatically in recent years. Parameters—the adjustable elements that determine how the model processes information—have increased from millions to hundreds of billions. This growth in scale has corresponded with significant improvements in capabilities, though it also raises challenges related to computational resources and environmental impact.</p>
      
      <h2>Industrial Applications</h2>
      <p>LLMs are being deployed across numerous industries, transforming how organizations operate and interact with customers:</p>
      
      <ul>
        <li><strong>Healthcare:</strong> Assisting with medical documentation, research literature analysis, and preliminary diagnostic support</li>
        <li><strong>Legal:</strong> Contract analysis, legal research, and document preparation</li>
        <li><strong>Customer Service:</strong> Powering advanced chatbots and virtual assistants that can handle complex inquiries</li>
        <li><strong>Content Creation:</strong> Generating marketing copy, articles, and creative content with human guidance</li>
        <li><strong>Software Development:</strong> Code generation, documentation, and debugging assistance</li>
      </ul>
      
      <h2>Limitations and Challenges</h2>
      <p>Despite their impressive capabilities, LLMs face several important limitations:</p>
      
      <ol>
        <li>They can generate plausible-sounding but incorrect or fabricated information</li>
        <li>They have limited understanding of the physical world and causal relationships</li>
        <li>They may produce biased or harmful outputs reflecting biases in their training data</li>
        <li>They have a knowledge cutoff date after which they lack information about world events</li>
        <li>They require significant computational resources, raising environmental and access concerns</li>
      </ol>
      
      <p>Addressing these challenges remains an active area of research, with approaches including retrieval-augmented generation (connecting models to external knowledge sources), human feedback mechanisms, and more efficient training methods.</p>
      
      <h2>Future Directions</h2>
      <p>The field continues to evolve rapidly, with several emerging trends likely to shape the next generation of language models:</p>
      
      <blockquote>
        <p>"The future of language models isn't just about making them bigger—it's about making them more aligned with human values, more factual, and more accessible across languages and cultures."</p>
        <cite>— Dr. Sarah Johnson, NLP Researcher</cite>
      </blockquote>
      
      <p>Key developments include multimodal models that combine language with image, audio, and video understanding; more efficient architectures that reduce computational requirements; and specialized models tailored for particular domains or tasks.</p>
      
      <h2>Conclusion</h2>
      <p>Large Language Models represent one of the most significant advances in artificial intelligence of the past decade. While they have limitations and raise important ethical questions, their ability to understand and generate human language is transforming how we interact with technology and enabling new capabilities across countless applications.</p>
      
      <p>As these models continue to evolve, maintaining a balanced approach that harnesses their benefits while mitigating their risks will be essential to their successful integration into business processes and society at large.</p>
    `,
    date: "2025-04-10",
    readTime: "7 min read",
    category: "Deep Learning",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    author: {
      name: "Dr. Rachel Chen",
      role: "ML Research Scientist"
    },
    tags: ["LLM", "NLP", "machine learning", "transformer models", "GPT"]
  },
  {
    id: 3,
    title: "AI Ethics: Navigating the Challenges",
    excerpt: "Key considerations for responsible AI development and implementation.",
    content: `
      <p>The rapid advancement of artificial intelligence technologies has brought unprecedented opportunities for innovation and efficiency. However, these developments also raise complex ethical questions that must be addressed to ensure AI systems benefit humanity and minimize potential harms.</p>
      
      <h2>The Ethical Landscape</h2>
      <p>AI ethics encompasses a broad range of considerations, including fairness, transparency, privacy, accountability, and alignment with human values. As AI systems become more autonomous and influential in critical domains—from healthcare and finance to criminal justice and public safety—the stakes of getting these ethical considerations right continue to rise.</p>
      
      <p>Organizations developing or deploying AI face a complex landscape of challenges, requiring thoughtful approaches that balance innovation with responsibility.</p>
      
      <h2>Addressing Algorithmic Bias</h2>
      <p>One of the most pressing ethical challenges is algorithmic bias—instances where AI systems produce results that systematically disadvantage certain groups. These biases often stem from historical patterns in training data, reflecting and potentially amplifying existing societal inequalities.</p>
      
      <p>Addressing bias requires comprehensive approaches at multiple stages of the AI lifecycle:</p>
      
      <ul>
        <li>Diverse and representative training data collection</li>
        <li>Robust testing across demographic groups</li>
        <li>Regular auditing of model outputs for disparate impact</li>
        <li>Clear processes for addressing identified biases</li>
      </ul>
      
      <blockquote>
        <p>"The question isn't whether your algorithm is biased—it's whether you've taken the necessary steps to understand and mitigate that bias."</p>
        <cite>— Dr. Maya Williams, AI Ethics Researcher</cite>
      </blockquote>
      
      <h2>Transparency and Explainability</h2>
      <p>As AI systems become more complex, understanding how they arrive at particular decisions or recommendations becomes increasingly challenging. This "black box" problem raises concerns about accountability, trustworthiness, and the ability to identify and address errors or biases.</p>
      
      <p>Explainable AI (XAI) techniques aim to make model decisions more transparent and interpretable to humans. These approaches include:</p>
      
      <ol>
        <li>Using inherently interpretable models where appropriate</li>
        <li>Developing post-hoc explanation methods for complex models</li>
        <li>Providing confidence scores and uncertainty estimates</li>
        <li>Creating user-friendly interfaces that communicate model reasoning</li>
      </ol>
      
      <h2>Privacy and Data Governance</h2>
      <p>AI systems often rely on vast amounts of data, including potentially sensitive personal information. Balancing the benefits of data-driven insights with respect for individual privacy requires thoughtful data governance approaches.</p>
      
      <p>Key considerations include:</p>
      
      <ul>
        <li>Obtaining meaningful consent for data collection and use</li>
        <li>Implementing robust data security measures</li>
        <li>Minimizing data collection to what's necessary</li>
        <li>Exploring privacy-preserving techniques like federated learning and differential privacy</li>
      </ul>
      
      <h2>Human Oversight and Control</h2>
      <p>As AI systems become more autonomous, questions about human oversight and control become increasingly important. Determining the appropriate balance between automation and human judgment depends on the context and stakes of particular applications.</p>
      
      <p>Effective human-AI collaboration typically requires:</p>
      
      <ul>
        <li>Clear delineation of decision-making authority</li>
        <li>Meaningful human review of high-stakes automated decisions</li>
        <li>Ability for humans to override automated decisions when necessary</li>
        <li>Regular evaluation of system performance and impact</li>
      </ul>
      
      <h2>Building Ethical Frameworks</h2>
      <p>Organizations developing or deploying AI increasingly recognize the need for structured approaches to ethical considerations. This has led to the development of AI ethics frameworks, principles, and governance structures.</p>
      
      <p>Effective ethical frameworks typically include:</p>
      
      <ul>
        <li>Clear guiding principles aligned with organizational values</li>
        <li>Practical tools and processes for ethical assessment</li>
        <li>Diverse perspectives in development and oversight</li>
        <li>Mechanisms for addressing ethical issues that arise</li>
        <li>Regular review and updating as technology and social expectations evolve</li>
      </ul>
      
      <h2>The Path Forward</h2>
      <p>Navigating AI ethics effectively requires collaboration across disciplines and stakeholders. Technical experts, ethicists, policymakers, industry leaders, and representatives from affected communities all have important perspectives to contribute.</p>
      
      <p>While there are no simple solutions to many ethical challenges, organizations that approach these issues thoughtfully—integrating ethical considerations throughout the AI lifecycle rather than treating them as an afterthought—are best positioned to develop AI systems that earn trust and create sustainable value.</p>
      
      <p>As AI continues to evolve and permeate more aspects of society, ongoing dialogue and adaptation of ethical approaches will be essential to ensuring these powerful technologies serve humanity's best interests.</p>
    `,
    date: "2025-04-05",
    readTime: "6 min read",
    category: "AI Ethics",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    author: {
      name: "Dr. James Wilson",
      role: "Ethics Director"
    },
    tags: ["AI ethics", "responsible AI", "algorithmic bias", "transparency"]
  }
];

// Get all blogs
export async function getBlogs(): Promise<Blog[]> {
  // In a real app, this would fetch from an API or database
  return blogs;
}

// Filter blogs by category
export async function getBlogsByCategory(category: string): Promise<Blog[]> {
  return category === "All" 
    ? blogs
    : blogs.filter(blog => blog.category === category);
}

// Get a single blog by ID
export async function getBlogById(id: string): Promise<Blog> {
  // In a real app, this would fetch from an API or database
  const blog = blogs.find(blog => blog.id.toString() === id);
  
  if (!blog) {
    throw new Error(`Blog with id ${id} not found`);
  }
  
  return blog;
}

// Get related blogs based on category (excluding current blog)
export async function getRelatedBlogs(currentBlogId: string, category?: string): Promise<Blog[]> {
  // In a real app, this would use a more sophisticated recommendation algorithm
  const related = blogs
    .filter(blog => blog.id.toString() !== currentBlogId)
    .filter(blog => category ? blog.category === category : true)
    .slice(0, 3);
  
  return related;
}

// Generate a new blog using Perplexity API
export async function generateDailyBlog(): Promise<Blog> {
  try {
    console.log("Starting blog generation process");
    
    // Get scheduled categories if available
    const scheduleConfig = getScheduleConfig();
    const categories = scheduleConfig.categories;
    
    // Randomly select one of the configured categories
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    console.log(`Selected category: ${selectedCategory}`);
    
    // Generate blog content using Perplexity
    console.log("Generating blog content...");
    const { title, content, excerpt, category } = await generateBlogContent(selectedCategory);
    console.log("Content generated successfully");
    
    // Fetch a relevant image from Pollinations
    console.log("Fetching image...");
    const imageQuery = `${category || selectedCategory} ${title.split(' ').slice(0, 3).join(' ')}`;
    const imageUrl = await fetchRandomImage(imageQuery);
    console.log("Image URL generated:", imageUrl);
    
    // Calculate approximate read time (1 min per 200 words)
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
    
    // Create new blog entry with a numeric ID
    const newBlog: Blog = {
      id: blogs.length > 0 ? Math.max(...blogs.map(b => typeof b.id === 'number' ? b.id : 0)) + 1 : 1,
      title,
      excerpt,
      content,
      date: formatDate(new Date()),
      readTime,
      category: category || selectedCategory,
      image: imageUrl,
      author: {
        name: "AI Content Generator",
        role: "Assistant Writer"
      },
      tags: title.split(" ")
        .filter(word => word.length > 4)
        .map(word => word.toLowerCase().replace(/[^a-z]/g, ''))
        .filter(Boolean)
        .slice(0, 5)
    };
    
    console.log("New blog created:", newBlog.title);
    
    // In a real app, we would save this to a database
    blogs.push(newBlog);
    
    return newBlog;
  } catch (error) {
    console.error("Error generating daily blog:", error);
    throw new Error("Failed to generate daily blog");
  }
}
