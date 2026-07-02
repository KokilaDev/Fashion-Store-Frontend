import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  review: string;
  rating: number;
  date: string;
}

const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Elena Rostova",
    location: "Milan, Italy",
    review: "The Aura Silk Evening Frock is absolute perfection. The flow, the seams, and the organic silk fabric feel incredibly premium against the skin. Buying other garments feels like an afterthought now.",
    rating: 5,
    date: "June 20, 2026"
  },
  {
    id: "t2",
    name: "Genevieve Dubois",
    location: "Paris, France",
    review: "I ordered the Double-Breasted Silk Suit. The tailoring matches bespoke suits costing thousands on Savile Row. Crisp shoulder lines, neat stitching, and incredible comfort. Outstanding craft.",
    rating: 5,
    date: "May 14, 2026"
  },
  {
    id: "t3",
    name: "Victoria Sterling",
    location: "New York, USA",
    review: "Customer service is exemplary, and delivery is incredibly prompt. The wide-leg pleated trousers fit like a dream. Aura is officially my new primary destination for quality wardrobe staples.",
    rating: 5,
    date: "April 08, 2026"
  }
];

export const Testimonials: React.FC = () => {
  const primaryAccolade = TESTIMONIAL_DATA[0];

  return (
    <section id="testimonials-section" className="p-6 bg-black text-white h-full flex flex-col justify-center rounded-2xl relative overflow-hidden">
      {/* Decorative quotes */}
      <div className="absolute top-4 right-4 text-white/5 opacity-20">
        <Quote className="w-16 h-16 transform rotate-180" />
      </div>

      <div className="relative z-10 space-y-4">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F27D26] block">
          Client Acclaim
        </span>

        {/* Dynamic / Prime Review Quote */}
        <p className="text-xs sm:text-sm font-light italic leading-relaxed text-white/90">
          "Absolute perfection in every stitch. The fit is incomparable. Aura is officially my destination for quality wardrobe investment pieces."
        </p>

        {/* Critic Meta */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-white/10">
          <div className="w-6 h-6 rounded-full bg-[#F27D26]/20 text-[#F27D26] flex items-center justify-center text-[10px] font-bold">
            {primaryAccolade.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-[10px] font-bold tracking-wider text-white">
              {primaryAccolade.name}
            </h4>
            <p className="text-[8px] text-white/50 tracking-wider uppercase">{primaryAccolade.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
