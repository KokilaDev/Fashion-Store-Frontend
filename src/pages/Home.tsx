import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { OfferBanner } from '../components/home/OfferBanner';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { NewArrivals } from '../components/home/NewArrivals';
import { FeaturedCollection } from '../components/home/FeaturedCollection';
import { Testimonials } from '../components/home/Testimonials';
import { InstagramGallery } from '../components/home/InstagramGallery';
import { Newsletter } from '../components/home/Newsletter';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    
    console.log('HomePage mounted. Scrolling to top.');

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] py-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1300px] mx-auto space-y-4">
        {/* Row 1: Horizontal Category Bar spanning full-width */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-sm">
          <CategorySection />
        </div>

        {/* Row 2: Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Hero Section - col-span-8 */}
          <div className="lg:col-span-8 rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-sm flex flex-col justify-between">
            <HeroSection />
          </div>

          {/* Offer Banner / Coupon block - col-span-4 */}
          <div className="lg:col-span-4 rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-sm flex flex-col justify-between">
            <OfferBanner />
          </div>
        </div>

        {/* Row 3: Trending Collection */}
        <div className="rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-sm p-6 sm:p-8">
          <TrendingProducts />
        </div>

        {/* Row 4: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Featured Collection - col-span-7 */}
          <div className="lg:col-span-7 rounded-2xl border border-[#E5E1D8] bg-[#E5E1D8] overflow-hidden shadow-sm flex flex-col justify-between">
            <FeaturedCollection />
          </div>

          {/* New Arrivals - col-span-5 */}
          <div className="lg:col-span-5 rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            <NewArrivals />
          </div>
        </div>

        {/* Row 5: Community Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Testimonial Block */}
          <div className="rounded-2xl border border-black overflow-hidden shadow-sm flex flex-col justify-between">
            <Testimonials />
          </div>

          {/* Instagram / Social block */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-sm flex flex-col justify-between">
            <InstagramGallery />
          </div>

          {/* Newsletter sign-up */}
          <div className="rounded-2xl border border-[#E5E1D8] bg-white overflow-hidden shadow-sm flex flex-col justify-between">
            <Newsletter />
          </div>
        </div>

      </div>
    </motion.div>
  );
};
