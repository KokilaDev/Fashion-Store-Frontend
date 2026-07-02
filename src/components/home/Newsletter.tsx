import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API newsletter register with latency
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section id="newsletter-section" className="p-6 bg-white border border-[#E5E1D8] h-full flex flex-col justify-center rounded-2xl relative overflow-hidden">
      
      {/* Background radial soft light gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.04)_0,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!subscribed ? (
            <motion.div
              key="newsletter-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full"
            >
              {/* Badge */}
              <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-[9px] tracking-widest font-bold uppercase text-neutral-600 mb-4">
                <Sparkles className="w-3 h-3 text-[#F27D26]" />
                <span>The Aura Club</span>
              </span>

              {/* Title & Description */}
              <h2 className="font-serif text-lg font-bold text-neutral-900 leading-snug mb-1.5">
                Elevate Your Vibe
              </h2>
              <p className="text-[10px] font-light text-neutral-500 max-w-xs leading-relaxed mb-5 italic">
                Get early drops, private lounge vouchers, and 10% off your first buy.
              </p>

              {/* Input Form */}
              <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2">
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-[#E5E1D8] focus:border-black rounded-lg text-[11px] focus:outline-none focus:ring-0 bg-[#F5F2ED] text-neutral-800 transition-all duration-300"
                    disabled={loading}
                  />
                  <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-black hover:bg-[#F27D26] text-white font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <span>Join Elite</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="newsletter-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center py-4"
            >
              <div className="p-3 bg-emerald-50 rounded-full text-emerald-600 border border-emerald-100 mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-base font-bold text-neutral-900 mb-1">
                Welcome To Aura
              </h2>
              <p className="text-[10px] font-light text-neutral-500 max-w-xs leading-relaxed mb-4 italic">
                Membership active! Use code <b>“FIRSTBUY10”</b> for 10% off.
              </p>
              
              <div className="bg-[#F5F2ED] border border-dashed border-[#E5E1D8] px-4 py-2 rounded-lg text-[10px] font-mono font-bold tracking-widest text-black">
                FIRSTBUY10
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
