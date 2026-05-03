"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, ShieldCheck, Info, HelpCircle, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const { t } = useLanguage();
  const [count, setCount] = useState(15420);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full text-sm font-medium text-blue-400 border border-blue-500/20">
          <ShieldCheck size={16} />
          <span>Securing Democracy with Knowledge</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="gradient-text">{t.hero.title}</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button 
            onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="gradient-button flex items-center gap-2 group"
          >
            {t.hero.cta}
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full font-semibold glass hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Info size={18} />
            Learn More
          </button>
        </div>

        {/* Live Analytics */}
        <div className="inline-flex items-center gap-6 p-4 glass border-white/5 bg-white/5">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
            <Users size={24} />
          </div>
          <div className="text-left">
            <div className="text-2xl font-black text-white">{count.toLocaleString()}+</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t.stats.label}</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[10%] hidden lg:block glass p-4 rotate-12"
      >
        <ShieldCheck className="text-blue-500" size={32} />
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-[10%] hidden lg:block glass p-4 -rotate-12"
      >
        <HelpCircle className="text-purple-500" size={32} />
      </motion.div>
    </section>
  );
}
