import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../products/ProductCard';
import { Sparkles } from 'lucide-react';

export const TrendingProducts: React.FC = () => {
  const { allProducts } = useStore();
  const trendingProducts = allProducts.filter((product) => product.isTrending);

  return (
    <section id="trending-section" className="py-4 bg-white w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="flex items-center justify-between mb-6 border-b border-[#E5E1D8] pb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>Trending Collection</span>
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">Highly coveted investment garments</p>
          </div>
          <span className="text-[10px] text-black/50 underline cursor-pointer hover:text-black transition-colors font-semibold uppercase">View All</span>
        </div>

        {/* Product Card Grid (2-4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
