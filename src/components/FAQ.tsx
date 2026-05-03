"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq-section" className="section-padding bg-black/40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 glass rounded-full text-xs font-bold uppercase tracking-widest text-purple-400">
            <HelpCircle size={14} />
            Support Center
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.faq.title}</h2>
          <p className="text-gray-400">Everything you need to know about the voting process</p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((item, index) => (
            <div key={index} className="glass-card border-white/5 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between group hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-lg md:text-xl group-hover:text-blue-400 transition-colors">
                  {item.q}
                </span>
                <div className={cn(
                  "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  openIndex === index ? "bg-blue-600 text-white rotate-180" : "bg-white/5 text-gray-400"
                )}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
