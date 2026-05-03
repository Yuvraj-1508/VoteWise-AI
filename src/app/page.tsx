"use client";

import Hero from "@/components/Hero";
import Chat from "@/components/Chat";
import Timeline from "@/components/Timeline";
import Quiz from "@/components/Quiz";
import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";
import Countdown from "@/components/Countdown";
import Checklist from "@/components/Checklist";
import LocationFinder from "@/components/LocationFinder";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/context/LanguageContext";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 origin-left z-[60]"
          style={{ scaleX }}
        />

        <Navbar />
        
        <div className="relative z-10">
          <Hero />
          
          <div className="space-y-32 pb-32">
            <Countdown />
            <Timeline />
            <Checklist />
            <Chat />
            <Quiz />
            <LocationFinder />
            <FAQ />
          </div>
        </div>

        <BackToTop />

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-black/40 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="font-bold text-white">V</span>
              </div>
              <span className="text-lg font-bold">VoteWise AI</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} VoteWise AI. Empowering democracy through education.
            </p>
            <div className="mt-6 flex justify-center gap-6 text-gray-400 text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </footer>

        {/* Global background elements */}
        <div className="fixed inset-0 -z-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#3b82f615,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#8b5cf610,transparent_50%)]" />
        </div>
      </main>
    </LanguageProvider>
  );
}
