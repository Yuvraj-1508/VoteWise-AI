"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Send, User, Bot, Sparkles, Loader2, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const KNOWLEDGE_BASE: Record<string, Record<string, string>> = {
  en: {
    "how to vote": "To vote, you must be a registered voter. On election day, go to your polling booth with a valid ID, get your finger marked, press the button on the EVM for your candidate, and check the VVPAT slip.",
    "register": "You can register as a voter online at voters.eci.gov.in or by submitting Form 6 to your local Electoral Registration Officer.",
    "documents": "Valid documents include Voter ID (EPIC), Aadhaar Card, PAN Card, Driving License, Passport, or Bank Passbook with photo.",
    "evm": "Electronic Voting Machine (EVM) is a device used to record votes. It consists of a Balloting Unit and a Control Unit, and is connected to a VVPAT for verification.",
    "counting": "Counting is done in a centralized location under strict surveillance. Each candidate's agents are present. Machines are unsealed and votes are tallied securely.",
    "default": "I'm sorry, I don't have specific info on that yet. Try asking about voting steps, registration, EVMs, or required documents!"
  },
  hi: {
    "कैसे वोट दें": "वोट देने के लिए, आपको एक पंजीकृत मतदाता होना चाहिए। चुनाव के दिन, वैध आईडी के साथ अपने मतदान केंद्र पर जाएं, अपनी उंगली पर निशान लगवाएं, अपने उम्मीदवार के लिए ईवीएम पर बटन दबाएं और वीवीपीएटी पर्ची की जांच करें।",
    "पंजीकरण": "आप मतदाता के रूप में ऑनलाइन voters.eci.gov.in पर या अपने स्थानीय निर्वाचक पंजीकरण अधिकारी को फॉर्म 6 जमा करके पंजीकरण कर सकते हैं।",
    "दस्तावेज": "वैध दस्तावेजों में वोटर आईडी (EPIC), आधार कार्ड, पैन कार्ड, ड्राइविंग लाइसेंस, पासपोर्ट या फोटो वाली बैंक पासबुक शामिल हैं।",
    "ईवीएम": "इलेक्ट्रॉनिक वोटिंग मशीन (ईवीएम) एक उपकरण है जिसका उपयोग वोट रिकॉर्ड करने के लिए किया जाता है। इसमें एक बैलेटिंग यूनिट और एक कंट्रोल यूनिट होती है, और सत्यापन के लिए वीवीपीएटी से जुड़ी होती है।",
    "गिनती": "गिनती सख्त निगरानी में एक केंद्रीकृत स्थान पर की जाती है। प्रत्येक उम्मीदवार के एजेंट मौजूद होते हैं। मशीनों को खोल दिया जाता है और वोटों की सुरक्षित रूप से गणना की जाती है।",
    "default": "क्षमा करें, मेरे पास अभी तक उस पर विशिष्ट जानकारी नहीं है। वोटिंग के चरणों, पंजीकरण, ईवीएम या आवश्यक दस्तावेजों के बारे में पूछें!"
  }
};

export default function Chat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: t.chat.initialMessage }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "en" ? "en-US" : "hi-IN";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      const kb = KNOWLEDGE_BASE[language];
      let response = kb.default;

      for (const key in kb) {
        if (lowerInput.includes(key)) {
          response = kb[key];
          break;
        }
      }

      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <section id="chat-section" className="section-padding">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.chat.title}</h2>
        <p className="text-gray-400">Instant answers to your election queries</p>
      </div>

      <div className="max-w-3xl mx-auto glass-card flex flex-col h-[600px] overflow-hidden border-white/5">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold">VoteWise AI</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex items-start gap-3",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === "user" ? "bg-purple-600" : "bg-blue-600"
                )}>
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={cn(
                  "max-w-[80%] p-4 rounded-2xl",
                  msg.role === "user" 
                    ? "bg-purple-600/20 text-white rounded-tr-none border border-purple-500/20" 
                    : "bg-white/5 text-gray-200 rounded-tl-none border border-white/10"
                )}>
                  <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                <Loader2 size={16} className="animate-spin text-blue-400" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-white/5">
          <div className="flex gap-2">
            <button
              onClick={startListening}
              aria-label={isListening ? "Stop listening" : "Start voice input"}
              className={cn(
                "p-3 rounded-xl transition-all duration-300",
                isListening ? "bg-red-500 animate-pulse text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t.chat.placeholder}
              aria-label="Ask a question"
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors p-3 rounded-xl"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
