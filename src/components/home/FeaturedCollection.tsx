import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Sparkles, MoveRight } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const { setSelectedCategory } = useStore();
  const navigate = useNavigate();

  const handleExploreCollection = () => {
    setSelectedCategory('All');
    navigate('/products');
  };

  return (
    <section id="featured-collection-section" className="p-6 sm:p-8 bg-[#E5E1D8] text-[#1A1A1A] h-full flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Narrative text & CTA button */}
          <div className="md:col-span-6 flex flex-col items-start gap-4">
            <span className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] uppercase font-bold text-[#F27D26]">
              <Sparkles className="w-3 h-3" />
              <span>Limited Drop</span>
            </span>

            <h2 className="font-serif text-2.5xl sm:text-3.5xl font-light italic text-[#1A1A1A] leading-tight">
              Summer '26 Lookbook
            </h2>

            <p className="text-xs font-light text-neutral-700 leading-relaxed italic">
              Pure linens, raw organic silks, and lightweight silhouettes crafted for the golden hour of coastal leisure.
            </p>

            {/* Premium Details Bullets */}
            <div className="space-y-2 pt-1 text-[10px] font-bold tracking-widest uppercase text-neutral-600">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#F27D26] rounded-full" />
                <span>100% Flax-Linen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#F27D26] rounded-full" />
                <span>Hand-stitched in Milano</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleExploreCollection}
              className="mt-4 text-[11px] font-bold underline uppercase tracking-tighter hover:text-[#F27D26] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore Lookbook</span>
              <MoveRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Large Image Showcase */}
          <div className="md:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white/20 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=300"
                alt="Summer Collection 2026 Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              />
              
              {/* Overlay Tag */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-2 border border-neutral-100 shadow-sm rounded">
                <p className="text-[8px] font-bold text-neutral-500 tracking-widest uppercase mb-0.5">DESIGNED IN</p>
                <p className="text-[10px] font-extrabold text-[#1A1A1A] uppercase tracking-widest font-mono">MILANO</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
