import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Shirt, Award, Gem, Layers } from 'lucide-react';

const CATEGORY_ITEMS = [
  { name: 'All', icon: Layers },
  { name: 'Frocks', icon: Sparkles },
  { name: 'Blouses', icon: Shirt },
  { name: 'Tops', icon: Shirt },
  { name: 'Skirts', icon: Sparkles },
  { name: 'Party Wear', icon: Gem },
  { name: 'Jeans', icon: Award },
  { name: 'Trousers', icon: Award },
  { name: 'Suits', icon: Gem },
];

export const CategorySection: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useStore();
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (window.location.pathname !== '/products') {
      navigate('/products');
    }
  };

  return (
    <section id="categories-section" className="py-6 bg-white overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Scrollable Categories Container */}
        <div className="flex items-center justify-start md:justify-center gap-4 overflow-x-auto pb-1 pt-1 px-2 no-scrollbar">
          {CATEGORY_ITEMS.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 min-w-[100px] cursor-pointer group select-none ${
                  isSelected
                    ? 'border-black bg-black text-white shadow-sm'
                    : 'border-[#E5E1D8] bg-[#F5F2ED] hover:bg-[#EBE7DF] hover:border-neutral-300 text-neutral-600'
                }`}
              >
                {/* Icon wrapper */}
                <div 
                  className={`p-1 rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-white/10 text-white' : 'bg-white text-neutral-500 group-hover:text-gold-600 shadow-sm'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                {/* Name */}
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
