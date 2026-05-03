"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { UserPlus, FileText, Megaphone, CheckSquare, BarChart, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, any> = {
  UserPlus,
  FileText,
  Megaphone,
  CheckSquare,
  BarChart,
  Trophy,
};

export default function Timeline() {
  const { t } = useLanguage();

  return (
    <section id="timeline-section" className="section-padding bg-black/40">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.timeline.title}</h2>
        <p className="text-gray-400">Your step-by-step guide to the democratic process</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Connector Line */}
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 hidden md:block" />

        <div className="space-y-12">
          {t.timeline.steps.map((step, index) => {
            const Icon = ICONS[step.icon];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className="flex-1 w-full md:w-auto">
                  <div className={cn(
                    "glass-card p-6 border-white/5",
                    isEven ? "md:mr-12" : "md:ml-12"
                  )}>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl font-bold text-white/10">{index + 1}</span>
                      <h3 className="text-xl font-bold text-blue-400">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl">
                  {Icon && <Icon size={28} className="text-white" />}
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
