"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Search, Loader2 } from "lucide-react";

export default function LocationFinder() {
  const { t } = useLanguage();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  const handleSearch = () => {
    if (!pin || pin.length < 6) return;
    setLoading(true);
    setResult(false);
    setTimeout(() => {
      setLoading(false);
      setResult(true);
    }, 1500);
  };

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <MapPin className="text-pink-500" />
                {t.location.title}
              </h2>
              <p className="text-gray-400 mb-8">Enter your postal code to find the nearest voting booth.</p>
              
              <div className="flex gap-2 p-2 glass bg-white/5 border-white/10 rounded-2xl">
                <input
                  type="text"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  placeholder={t.location.placeholder}
                  className="flex-1 bg-transparent border-none px-4 py-3 focus:outline-none text-lg font-bold tracking-widest placeholder:tracking-normal placeholder:font-normal"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading || pin.length < 6}
                  className="gradient-button !px-8 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                  <span className="hidden sm:inline">{t.location.button}</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex-1 glass bg-blue-500/10 border-blue-500/30 p-6 rounded-2xl"
                >
                  <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <MapPin size={18} />
                    Booth Found!
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t.location.result}
                  </p>
                  <div className="mt-4 h-32 w-full bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-600 text-xs italic">
                    Mock Map View
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
