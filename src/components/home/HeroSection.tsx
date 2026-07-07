import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';

export const HeroSection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    if (user && user.isLoggedIn) {
      navigate('/products');
    } else {
      navigate('/login');
    }
  };

  return (
    <section 
      id="hero-banner"
      className="relative min-h-[500px] lg:min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#1A1A1A] text-white px-6 py-16"
    >
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80"
          alt="Aura Fine Couture Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top filter brightness-95 transform scale-102 transition-transform duration-700"
        />
      </div>

      {/* Floating Design Elements */}
      <div className="absolute top-6 left-6 z-10 hidden lg:flex items-center gap-2 text-white/40 text-[9px] tracking-widest font-mono uppercase">
        <Compass className="w-3.5 h-3.5 animate-spin-slow" />
        <span>PARIS • MILAN • TOKYO</span>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-2xl text-center flex flex-col items-center">
        {/* Subtle badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-5"
        >
          <Sparkles className="w-3 h-3 text-white/80" />
          <span className="text-[9px] tracking-widest uppercase font-bold text-white/80">
            Haut-Couture Collection 2026
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3.5xl sm:text-5xl lg:text-5.5xl font-light italic leading-tight mb-5 text-white"
        >
          Welcome to <br />
          <span className="text-white">
            Aura Fashion Store
          </span>
        </motion.h1>

        {/* Subtitle with CTA context */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm font-light text-white/70 max-w-lg leading-relaxed italic mb-8"
        >
          Curated elegance for the modern individual. Discover organic silks, lightweight silhouettes, and effortless everyday staples designed for your capsule wardrobe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <button
            onClick={handleShopNowClick}
            className="w-full sm:w-auto px-8 py-3 bg-white text-black hover:bg-[#F5F2ED] rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 group cursor-pointer"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href="#trending-section"
            className="w-full sm:w-auto px-8 py-3 border border-white/30 text-white hover:bg-white/10 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            Explore Trends
          </a>
        </motion.div>
      </div>

      {/* Hero Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 opacity-65">
        <span className="text-[9px] tracking-widest font-mono text-neutral-300 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-1 h-8 bg-gradient-to-b from-white/80 to-transparent rounded-full animate-bounce" />
      </div>
    </section>
  );
};
