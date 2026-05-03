"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Quiz() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === t.quiz.questions[currentStep].a;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentStep < t.quiz.questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <section id="quiz-section" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.quiz.title}</h2>
          <p className="text-gray-400">Test your knowledge about voting and elections</p>
        </div>

        <div className="glass-card p-8 md:p-12 relative overflow-hidden border-white/5 min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">
                    {t.quiz.question} {currentStep + 1} / {t.quiz.questions.length}
                  </span>
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / t.quiz.questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-8">
                  {t.quiz.questions[currentStep].q}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {t.quiz.questions[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={selectedOption !== null}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between group",
                        selectedOption === null 
                          ? "border-white/10 hover:border-blue-500 hover:bg-blue-500/10" 
                          : idx === t.quiz.questions[currentStep].a
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : selectedOption === idx
                              ? "border-red-500 bg-red-500/20 text-red-400"
                              : "border-white/5 opacity-50"
                      )}
                    >
                      <span className="font-medium">{option}</span>
                      {selectedOption !== null && idx === t.quiz.questions[currentStep].a && (
                        <CheckCircle2 size={20} className="text-green-500" />
                      )}
                      {selectedOption === idx && idx !== t.quiz.questions[currentStep].a && (
                        <XCircle size={20} className="text-red-500" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                  <Trophy size={48} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Quiz Completed!</h3>
                <p className="text-gray-400 mb-8">
                  {t.quiz.score}: <span className="text-blue-400 font-bold text-2xl">{score}</span> / {t.quiz.questions.length}
                </p>
                <button 
                  onClick={restartQuiz}
                  className="gradient-button flex items-center gap-2 mx-auto"
                >
                  <RotateCcw size={18} />
                  {t.quiz.restart}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
