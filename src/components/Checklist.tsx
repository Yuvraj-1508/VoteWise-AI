"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle, Info } from "lucide-react";
import { useState } from "react";

export default function Checklist() {
  const { t } = useLanguage();
  const [checked, setChecked] = useState<boolean[]>(new Array(t.checklist.items.length).fill(false));

  const toggle = (idx: number) => {
    const next = [...checked];
    next[idx] = !next[idx];
    setChecked(next);
  };

  return (
    <section className="section-padding bg-black/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.checklist.title}</h2>
          <p className="text-gray-400">{t.checklist.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.checklist.items.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => toggle(idx)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                checked[idx] 
                  ? "bg-green-500/10 border-green-500/50 text-green-400" 
                  : "glass-card border-white/5 text-gray-300"
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                checked[idx] ? "bg-green-500 border-green-500" : "border-white/20"
              }`}>
                {checked[idx] && <CheckCircle size={14} className="text-white" />}
              </div>
              <span className="font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 p-6 glass border-blue-500/20 flex items-start gap-4">
          <Info className="text-blue-500 shrink-0" size={24} />
          <p className="text-sm text-gray-400 italic">
            Note: This checklist is for general awareness. Please check with the Election Commission for specific requirements in your region.
          </p>
        </div>
      </div>
    </section>
  );
}
