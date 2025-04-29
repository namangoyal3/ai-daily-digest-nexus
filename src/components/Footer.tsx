
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Twitter, Facebook, Instagram, Linkedin, Youtube, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailSubscribe from "./EmailSubscribe";
import FooterSubscribeSection from "./FooterSubscribeSection";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4">
        {/* Newsletter Signup Section */}
        <div className="rounded-t-xl py-12">
          <FooterSubscribeSection />
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-aiblue to-aipurple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <h1 className="ml-2 text-xl text-white font-heading font-semibold">NeuralNextGen</h1>
            </Link>
            <p className="text-gray-400 mb-6">
              Bridging the AI gap through accessible knowledge, tools, and education.
              Making artificial intelligence your trusted companion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link to="/ai-digest" className="hover:text-white transition-colors">AI Daily Digest</Link></li>
              <li><Link to="/ai-agents" className="hover:text-white transition-colors">AI Agents Marketplace</Link></li>
              <li><Link to="/ai-courses" className="hover:text-white transition-colors text-white">AI Courses</Link></li>
              <li><a href="#" className="hover:text-white transition-colors text-white">Enterprise Solutions</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-white">API Access</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-aipurple" />
                <span>123 AI Avenue, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-aipurple" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-aipurple" />
                <span>info@neuralnextgen.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 py-8 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} NeuralNextGen. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="#" className="text-white hover:opacity-80 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-white hover:opacity-80 transition-opacity">Terms of Service</a>
            <a href="#" className="text-white hover:opacity-80 transition-opacity">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
