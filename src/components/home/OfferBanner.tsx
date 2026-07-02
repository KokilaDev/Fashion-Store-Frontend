import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COUPONS } from '../../types/types';
import { Tag, Clipboard, Check, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OfferBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const navigate = useNavigate();

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      // eslint-disable-next-line react-hooks/immutability
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % MOCK_COUPONS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + MOCK_COUPONS.length) % MOCK_COUPONS.length);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleShopDeals = (_discount: number) => {
    navigate('/products');
  };

  const activeCoupon = MOCK_COUPONS[currentIndex];

  return (
    <section id="offers-carousel" className="py-8 bg-gradient-to-br from-[#F27D26] to-[#d65f0e] text-white relative overflow-hidden h-full flex flex-col justify-between">
      
      {/* Decorative vector assets */}
      <div className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-10 text-white pointer-events-none hidden lg:block">
        <Gift className="w-32 h-32 transform rotate-12" />
      </div>

      <div className="max-w-md mx-auto px-6 relative z-10 text-center flex flex-col justify-between h-full py-4">
        {/* Next/Prev Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-sm transition-all z-20 cursor-pointer"
          aria-label="Previous offer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-sm transition-all z-20 cursor-pointer"
          aria-label="Next offer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Coupon Card Slider Wrapper */}
        <div className="flex-grow flex flex-col items-center justify-center min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3.5"
            >
              {/* Badge */}
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-[9px] tracking-widest font-bold uppercase text-white">
                <Tag className="w-3 h-3" />
                <span>Summer Deal</span>
              </span>

              {/* Offer Description */}
              <h3 className="font-serif text-lg font-bold leading-snug italic text-white px-2">
                "{activeCoupon.description}"
              </h3>

              {/* Coupon Code Copier */}
              <div className="flex items-center gap-2 mt-1 bg-black/25 border border-white/20 px-3 py-1 rounded-lg shadow-sm">
                <span className="text-[10px] font-bold text-white/60 tracking-wider font-mono">CODE:</span>
                <span className="text-xs font-bold text-white font-mono tracking-widest">{activeCoupon.code}</span>
                <button
                  onClick={() => handleCopyCode(activeCoupon.code)}
                  className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Copy code"
                >
                  {copiedCode === activeCoupon.code ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Clipboard className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Toast Copy Alert */}
              <AnimatePresence>
                {copiedCode === activeCoupon.code && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-[9px] text-white font-semibold uppercase tracking-wider"
                  >
                    Coupon copied!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA Button */}
              <button
                onClick={() => handleShopDeals(activeCoupon.discountPercent)}
                className="mt-2 px-6 py-2 bg-white text-black hover:bg-[#F5F2ED] font-bold text-[9px] tracking-[0.15em] uppercase rounded-full shadow-sm transition-all cursor-pointer"
              >
                Claim {activeCoupon.discountPercent}% OFF
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {MOCK_COUPONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-4 bg-white' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
