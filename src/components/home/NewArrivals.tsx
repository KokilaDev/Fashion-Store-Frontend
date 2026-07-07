import React, { useState, useEffect } from 'react';
import type { Product } from '../../types/types';
import { ProductCard } from '../products/ProductCard';
import { RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { getLatestProducts } from '../../api/productApi';

export const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldSimulateError, setShouldSimulateError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchLatest = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLatestProducts();
        if (active) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || "Failed to load latest arrivals");
          setLoading(false);
        }
      }
    };

    fetchLatest();

    return () => {
      active = false;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <section id="new-arrivals-section" className="py-4 bg-white w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title & Error Simulator Toggle */}
        <div className="flex items-center justify-between mb-6 border-b border-[#E5E1D8] pb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>New Arrivals</span>
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">Fresh off the atelier</p>
          </div>

          {/* High-Fidelity API Simulation Controls */}
          <div className="flex items-center gap-2 bg-[#F5F2ED] border border-[#E5E1D8] px-2.5 py-1 rounded-full">
            <button
              onClick={() => {
                setShouldSimulateError(!shouldSimulateError);
                handleRetry();
              }}
              className="text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 text-[#1A1A1A]"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${shouldSimulateError ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span>{shouldSimulateError ? "Fail API" : "Healthy API"}</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex flex-col gap-3 animate-pulse">
                <div className="aspect-[3/4] w-full bg-neutral-100 rounded-lg" />
                <div className="h-3 w-1/3 bg-neutral-100 rounded" />
                <div className="h-4 w-3/4 bg-neutral-100 rounded" />
                <div className="h-3 w-1/2 bg-neutral-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error Handling State */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-6 px-4 bg-red-50/50 border border-red-100 rounded-xl text-center"
          >
            <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
            <h3 className="font-serif text-sm font-bold text-red-900 mb-1">
              Atelier Fetching Issue
            </h3>
            <p className="text-[11px] text-red-700 leading-relaxed max-w-xs mb-4">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-full font-bold text-[9px] tracking-widest uppercase flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </motion.div>
        )}

        {/* Loaded Success State */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {products.length === 0 ? (
              <div className="text-center py-6 text-neutral-400 text-xs">
                No new arrivals available.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.slice(0, 2).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
};
