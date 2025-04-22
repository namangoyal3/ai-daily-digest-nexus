
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "AI Daily Digest", path: "/ai-digest" },
    { name: "AI Agents", path: "/ai-agents" },
    { name: "AI Courses", path: "/ai-courses" },
    { name: "AI Blogs", path: "/ai-blogs" },
  ];

  const isCurrentPage = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <header 
      className={`py-4 px-4 md:px-8 sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "glass-panel shadow-md border-b border-teal/10" 
          : "bg-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-neural to-luminous rounded-lg flex items-center justify-center shadow-md animate-pulse-slow">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h1 className="ml-2 text-xl font-heading font-semibold bg-clip-text text-transparent bg-neural-gradient">
              NeuralNextGen
            </h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Enhanced with animations and better active states */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link, index) => (
                <NavigationMenuItem key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-teal animated-border",
                      isCurrentPage(link.path) 
                        ? "text-neural font-semibold" 
                        : "text-gray-600"
                    )}
                  >
                    <span>{link.name}</span>
                    {isCurrentPage(link.path) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block"
        >
          <Button className="bg-gradient-to-r from-neural to-luminous hover:from-neural-dark hover:to-luminous-dark text-white transition-all shadow-lg">
            <Link to="/ai-agents">Get Started</Link>
          </Button>
        </motion.div>

        {/* Mobile Menu Button - Enhanced with animations */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="focus:outline-none focus:ring-2 focus:ring-teal focus:ring-opacity-50"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Menu - Enhanced with animations */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="absolute top-16 right-0 left-0 z-40 glass-panel py-4 md:hidden rounded-b-lg border-t border-teal/10"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="flex flex-col space-y-3 px-6">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={menuItemVariants}
                  >
                    <Link
                      to={link.path}
                      className={`block py-2 px-4 rounded-lg transition-colors ${
                        isCurrentPage(link.path)
                          ? "text-white font-semibold bg-gradient-to-r from-neural to-luminous shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="pt-2"
                  variants={menuItemVariants}
                >
                  <Button className="w-full bg-gradient-to-r from-neural to-luminous shadow-md">
                    <Link to="/ai-agents" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
