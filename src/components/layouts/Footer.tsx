import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-charcoal-900 text-neutral-300 pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-neutral-800">
          
          {/* Column 1: Brand Description */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-2xl font-bold tracking-[0.2em] text-white">AURA</h3>
            <p className="text-xs font-light text-neutral-400 leading-relaxed max-w-sm">
              Established with an absolute devotion to slow fashion, exquisite fabrics, and effortless elegance. Aura crafts timeless investment garments that empower and elevate the modern soul.
            </p>
            <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-mono tracking-widest mt-2 uppercase">
              <ShieldCheck className="w-4.5 h-4.5 text-gold-500" />
              <span>Certified 100% Organic Fabric</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-medium">
              <Link to="/products" className="hover:text-gold-500 transition-colors duration-200">Shop Collection</Link>
              <Link to="/wishlist" className="hover:text-gold-500 transition-colors duration-200">My Wishlist</Link>
              <Link to="/cart" className="hover:text-gold-500 transition-colors duration-200">Shopping Bag</Link>
              <Link to="/profile" className="hover:text-gold-500 transition-colors duration-200">User Dashboard</Link>
              <a href="#testimonials-section" className="hover:text-gold-500 transition-colors duration-200">Customer Reviews</a>
              <a href="#newsletter-section" className="hover:text-gold-500 transition-colors duration-200">Join Aura Club</a>
              <span className="text-neutral-500 cursor-not-allowed">Sustainability</span>
              <span className="text-neutral-500 cursor-not-allowed">Terms of Service</span>
            </div>
          </div>

          {/* Column 3: Contact & Social Icons */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">Contact & Connect</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-neutral-400">742 luxury Boulevard, Suite 10, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-neutral-400">+1 (800) AURA-FASHION</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-neutral-400">concierge@aurafashion.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 mt-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-800 hover:bg-gold-600 hover:text-white text-neutral-300 rounded-full transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-800 hover:bg-gold-600 hover:text-white text-neutral-300 rounded-full transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-800 hover:bg-gold-600 hover:text-white text-neutral-300 rounded-full transition-all duration-300 shadow-sm"
                aria-label="Twitter"
              >
                <FiTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] text-neutral-500 font-mono uppercase tracking-widest">
          <p>© 2026 AURA Fashion Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span>Security</span>
            <span>Privacy</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
