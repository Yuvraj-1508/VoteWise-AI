"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe, Menu, X, Eye, Type, Settings2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { language, setLanguage, highContrast, setHighContrast, largeFont, setLargeFont } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const navLinks = [
    { name: "Explore", href: "#timeline-section" },
    { name: "Assistant", href: "#chat-section" },
    { name: "Quiz", href: "#quiz-section" },
    { name: "FAQ", href: "#faq-section" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-4 border-white/5 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="font-black text-white text-xl">V</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            VoteWise <span className="text-blue-500">AI</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              aria-label="Toggle Accessibility Settings"
              aria-expanded={showSettings}
              className={cn(
                "p-2 rounded-lg glass border-white/10 text-gray-400 hover:text-white transition-all",
                showSettings && "bg-blue-600 text-white"
              )}
            >
              <Settings2 size={20} />
            </button>
            
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-48 glass p-4 border-white/10 shadow-2xl z-[70]"
                >
                  <div className="space-y-4">
                    <button 
                      onClick={() => setHighContrast(!highContrast)}
                      className={cn(
                        "w-full flex items-center justify-between text-sm p-2 rounded-md transition-colors",
                        highContrast ? "bg-blue-600/20 text-blue-400" : "text-gray-400 hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Eye size={16} /> High Contrast
                      </div>
                      <div className={cn("w-2 h-2 rounded-full", highContrast ? "bg-blue-400" : "bg-gray-600")} />
                    </button>
                    
                    <button 
                      onClick={() => setLargeFont(!largeFont)}
                      className={cn(
                        "w-full flex items-center justify-between text-sm p-2 rounded-md transition-colors",
                        largeFont ? "bg-blue-600/20 text-blue-400" : "text-gray-400 hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Type size={16} /> Large Font
                      </div>
                      <div className={cn("w-2 h-2 rounded-full", largeFont ? "bg-blue-400" : "bg-gray-600")} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex glass rounded-lg p-1 border-white/10" role="group" aria-label="Language Selector">
            <button
              onClick={() => setLanguage("en")}
              aria-label="Switch to English"
              aria-pressed={language === "en"}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-md transition-all",
                language === "en" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hi")}
              aria-label="Switch to Hindi"
              aria-pressed={language === "hi"}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-md transition-all",
                language === "hi" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
              )}
            >
              हिन्दी
            </button>
          </div>

          <button 
            className="md:hidden text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 md:hidden glass p-6 border-white/10 shadow-2xl space-y-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-gray-300 hover:text-white py-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
