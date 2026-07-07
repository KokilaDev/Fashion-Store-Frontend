import React, { useState } from 'react';
import type { Product } from '../../types/types';
import { useStore } from '../../context/StoreContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [showQuickView, setShowQuickView] = useState(false);
  const [addedNotification, setAddedNotification] = useState(false);

  const favorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <>
      <div 
        id={`product-card-${product.id}`}
        className="group relative flex flex-col bg-white overflow-hidden rounded-lg border border-neutral-100 transition-all duration-300 hover:shadow-lg"
      >
        {/* Product Image Wrapper */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-50 cursor-pointer" onClick={() => setShowQuickView(true)}>
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.isNewProduct && (
              <span className="bg-charcoal-900 text-white text-[10px] tracking-widest uppercase font-semibold px-2 py-1 rounded">
                New
              </span>
            )}
            {product.isTrending && (
              <span className="bg-gold-600 text-white text-[10px] tracking-widest uppercase font-semibold px-2 py-1 rounded">
                Trending
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-600 text-white text-[10px] tracking-widest uppercase font-semibold px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Heart */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-charcoal-900 shadow-sm transition-transform duration-300 hover:scale-110 active:scale-90"
            aria-label="Add to wishlist"
          >
            <Heart 
              className={`w-4 h-4 transition-colors duration-300 ${favorited ? 'fill-red-500 text-red-500' : 'text-neutral-500 hover:text-charcoal-900'}`} 
            />
          </button>

          {/* Main Image */}
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Hover Overlay Actions */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowQuickView(true)}
              className="p-3 bg-white text-charcoal-900 rounded-full shadow-md hover:bg-neutral-50 transition-colors duration-200"
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category */}
          <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-1">
            {product.category}
          </p>

          {/* Title */}
          <h3 
            className="text-sm font-medium text-neutral-800 line-clamp-1 hover:text-gold-600 transition-colors duration-200 mb-1 cursor-pointer"
            onClick={() => setShowQuickView(true)}
          >
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-neutral-200'}`} 
                />
              ))}
            </div>
            <span className="text-[10px] text-neutral-400 font-medium">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-sm font-semibold text-charcoal-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Size Selector */}
          <div className="mt-auto pt-3 border-t border-neutral-100">
            <div className="flex items-center justify-between gap-1 mb-3">
              <span className="text-[11px] text-neutral-400 tracking-wider">SIZE</span>
              <div className="flex gap-1 overflow-x-auto max-w-full no-scrollbar">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-6 h-6 flex items-center justify-center text-[10px] font-medium border rounded transition-all duration-200 ${
                      selectedSize === sz
                        ? 'border-charcoal-900 bg-charcoal-900 text-white'
                        : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-4 rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden ${
                addedNotification 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-charcoal-900 hover:bg-gold-700 text-white'
              }`}
            >
              {addedNotification ? (
                <span>Added to Cart</span>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add To Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickView(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
              >
                &times; Close
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side: Image */}
                <div className="relative aspect-[3/4] bg-neutral-50">
                  <img
                    src={`https://fashion-store-backend-red.vercel.app/uploads/${product.image}`}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {product.isNewProduct && (
                    <span className="absolute top-4 left-4 bg-charcoal-900 text-white text-xs uppercase tracking-widest font-bold px-3 py-1">
                      New Arrival
                    </span>
                  )}
                </div>

                {/* Right Side: Info */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2 block">
                      {product.category}
                    </span>
                    <h2 className="text-2xl font-serif text-charcoal-900 mb-2">
                      {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-500 font-medium">{product.rating} Rating</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-2xl font-semibold text-charcoal-900">
                        Rs. {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-base text-neutral-400 line-through">
                          Rs. {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Size Selector */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-3">
                        SELECT SIZE
                      </h4>
                      <div className="flex gap-2">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`w-10 h-10 flex items-center justify-center text-xs font-semibold border rounded-lg transition-all duration-200 ${
                              selectedSize === sz
                                ? 'border-charcoal-900 bg-charcoal-900 text-white shadow-md scale-105'
                                : 'border-neutral-200 hover:border-neutral-400 text-neutral-700'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleAddToCart}
                      className={`flex-grow py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                        addedNotification 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-charcoal-900 hover:bg-gold-700 text-white'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {addedNotification ? 'Added to Cart' : 'Add To Cart'}
                    </button>

                    <button
                      onClick={handleWishlistToggle}
                      className={`p-3 border border-neutral-200 rounded-lg transition-all hover:border-red-500 hover:bg-red-50 ${
                        favorited ? 'text-red-500 border-red-200 bg-red-50' : 'text-neutral-600'
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
