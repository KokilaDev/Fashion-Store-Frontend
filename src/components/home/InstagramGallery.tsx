import React from 'react';

// interface InstagramPost {
//   id: string;
//   imageUrl: string;
//   likes: string;
//   comments: string;
// }

// const INSTA_POSTS: InstagramPost[] = [
//   {
//     id: "insta1",
//     imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
//     likes: "1.2k",
//     comments: "48"
//   },
//   {
//     id: "insta2",
//     imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
//     likes: "945",
//     comments: "32"
//   },
//   {
//     id: "insta3",
//     imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80",
//     likes: "2.4k",
//     comments: "112"
//   },
//   {
//     id: "insta4",
//     imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80",
//     likes: "1.8k",
//     comments: "74"
//   },
//   {
//     id: "insta5",
//     imageUrl: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&auto=format&fit=crop&q=80",
//     likes: "732",
//     comments: "19"
//   },
//   {
//     id: "insta6",
//     imageUrl: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&auto=format&fit=crop&q=80",
//     likes: "1.5k",
//     comments: "63"
//   }
// ];

export const InstagramGallery: React.FC = () => {
  return (
    <section id="instagram-gallery-section" className="p-4 bg-white h-full flex flex-col justify-center rounded-2xl border border-[#E5E1D8]">
      <div className="mb-3 flex justify-between items-center px-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">Aura Lifestyle</span>
        <span className="text-[9px] font-bold text-[#F27D26] tracking-tight">@AURA_ATELIER</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F5F2ED] rounded-xl border border-[#E5E1D8]">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1537832816519-689ad163238b?w=150&auto=format&fit=crop&q=80"
            alt="Aura style"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=150&auto=format&fit=crop&q=80"
            alt="Aura look"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&auto=format&fit=crop&q=80"
            alt="Aura vibe"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <div className="aspect-square flex items-center justify-center text-[9px] font-mono font-bold text-neutral-400 select-none bg-white rounded-lg">
          @AURA
        </div>
      </div>
    </section>
  );
};
