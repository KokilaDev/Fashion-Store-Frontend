import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import TrendingProducts from "../components/home/TrendingProducts";
import NewArrivals from "../components/home/NewArrivals";
import OfferBanner from "../components/home/OfferBanner";
import FeaturedCollection from "../components/home/FeaturedCollection";
import Testimonials from "../components/home/Testimonials";
import InstagramGallery from "../components/home/InstagramGallery";
import Newsletter from "../components/home/Newsletter";

import "../styles/home.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <CategorySection />

      <div id="home">
        <HeroSection />
      </div>

      <div id="offers">
        <OfferBanner />
      </div>

      <div id="trending">
        <TrendingProducts />
      </div>

      <div id="new-arrivals">
        <NewArrivals />
      </div>

      <div id="featured">
        <FeaturedCollection />
      </div>

      <div id="reviews">
        <Testimonials />
      </div>

      <div id="instagram">
        <InstagramGallery />
      </div>

      <div id="newsletter">
        <Newsletter />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;