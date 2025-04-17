
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isNewsletterPage = location.pathname === "/";
  const isAgentsPage = location.pathname === "/ai-agents";

  return (
    <header className="py-4 px-4 md:px-8 border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-aiblue to-aipurple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h1 className="ml-2 text-xl font-heading font-semibold">
              {isAgentsPage ? "AI Agents" : "Daily Digest"}
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isNewsletterPage ? (
            <>
              <a href="#benefits" className="text-gray-600 hover:text-aiblue transition-colors">Benefits</a>
              <a href="#preview" className="text-gray-600 hover:text-aiblue transition-colors">Preview</a>
              <a href="#pricing" className="text-gray-600 hover:text-aiblue transition-colors">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-aiblue transition-colors">FAQ</a>
              <Link to="/ai-agents" className="text-gray-600 hover:text-aiblue transition-colors">AI Agents</Link>
            </>
          ) : (
            <>
              <a href="#benefits" className="text-gray-600 hover:text-aiblue transition-colors">Benefits</a>
              <a href="#agents" className="text-gray-600 hover:text-aiblue transition-colors">Directory</a>
              <a href="#faq" className="text-gray-600 hover:text-aiblue transition-colors">FAQ</a>
              <Link to="/" className="text-gray-600 hover:text-aiblue transition-colors">Newsletter</Link>
            </>
          )}
          <Button className="bg-aiblue hover:bg-aiblue-light transition-colors">
            <a href="#subscribe">Subscribe Now</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 left-4 z-40 bg-white rounded-md shadow-lg py-4 md:hidden">
            <div className="flex flex-col space-y-3 px-4">
              {isNewsletterPage ? (
                <>
                  <a 
                    href="#benefits" 
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Benefits
                  </a>
                  <a 
                    href="#preview" 
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Preview
                  </a>
                  <a 
                    href="#pricing" 
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <a 
                    href="#faq" 
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </a>
                  <Link 
                    to="/ai-agents"
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    AI Agents
                  </Link>
                </>
              ) : (
                <>
                  <a 
                    href="#benefits" 
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Benefits
                  </a>
                  <a 
                    href="#agents" 
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Directory
                  </a>
                  <a 
                    href="#faq" 
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </a>
                  <Link 
                    to="/"
                    className="text-gray-600 py-2 hover:text-aiblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Newsletter
                  </Link>
                </>
              )}
              <Button className="bg-aiblue hover:bg-aiblue-light transition-colors w-full">
                <a href="#subscribe" onClick={() => setMobileMenuOpen(false)}>Subscribe Now</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
