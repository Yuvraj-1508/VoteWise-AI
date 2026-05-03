"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Clock } from "lucide-react";

export default function Countdown() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date (e.g., 1 year from now for demonstration)
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: t.countdown.days, value: timeLeft.days },
    { label: t.countdown.hours, value: timeLeft.hours },
    { label: t.countdown.minutes, value: timeLeft.minutes },
    { label: t.countdown.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <Clock className="text-blue-500 animate-pulse" size={24} />
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest">{t.countdown.title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {units.map((unit, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass bg-white/5 p-6 rounded-2xl border border-white/10"
            >
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                {unit.value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-tighter">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
