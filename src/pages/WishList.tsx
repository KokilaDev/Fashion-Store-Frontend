import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/products/ProductCard';
import { Heart, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div id="wishlist-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[75vh]">
      
      {/* Breadcrumb path */}
      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-6">
        <Link to="/" className="hover:text-charcoal-900 transition-colors">AURA</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal-900 font-bold">MY WISHLIST</span>
      </div>

      <div className="border-b border-neutral-200 pb-4 mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-charcoal-900 flex items-center gap-2.5">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <span>My Saved Garments</span>
        </h1>
        <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider mt-1">Your personal luxury collection</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-24 bg-white border border-neutral-100 rounded-2xl max-w-lg mx-auto shadow-sm">
          <Heart className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
          <h2 className="font-serif text-lg font-bold text-neutral-800">Your Wishlist is Empty</h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto leading-relaxed">
            Save elegant items to your wishlist while browsing. They will appear here for easy comparison or quick buying later.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal-900 hover:bg-gold-600 text-white font-bold text-[10px] tracking-widest uppercase rounded transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Discover Apparel</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 animate-fade-in">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
