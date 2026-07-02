import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Search, User, Heart, ShoppingBag, Phone, LogOut, FileText, UserCheck, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../api/authApi';
import { toast } from 'sonner';

export const Navbar: React.FC = () => {
  const { cart, wishlist, searchQuery, setSearchQuery } = useStore();
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== '/products') {
      navigate('/products');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      navigate('/');
    } catch (error) {
      toast.error('Logout failed:');
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      navigate('/login', { replace: true });
    }
  };

  return (
    <nav id="main-navbar" className="sticky top-0 z-40 w-full border-b border-neutral-100 glass-nav transition-all duration-300">
      {/* Top bar for luxury branding/shipping offer */}
      <div className="bg-charcoal-900 text-white py-1.5 px-4 text-center text-[10px] tracking-widest uppercase font-medium flex items-center justify-between">
        <div className="hidden md:flex items-center gap-1.5 text-neutral-300">
          <Phone className="w-3 h-3" />
          <span>+1 (800) AURA-FASHION</span>
        </div>
        <div className="mx-auto md:mx-0">
          Complimentary Worldwide Shipping on Orders Over $150
        </div>
        <div className="hidden md:block text-neutral-300">
          Est. 2026 • Curated Haute Couture
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-700 hover:text-charcoal-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.18em] text-charcoal-900 hover:text-gold-600 transition-colors duration-300">
                AURA
              </span>
            </Link>
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-grow max-w-md mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search luxurious fashion, silks, outerwear..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-full text-xs font-medium bg-neutral-50/50 hover:bg-neutral-50 focus:bg-white focus:outline-none focus:border-charcoal-900 focus:ring-1 focus:ring-charcoal-900 transition-all duration-200 text-neutral-800"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-neutral-400" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-4 text-neutral-700">
            {/* Phone support (Mobile view icon) */}
            <a href="tel:+18002872327" className="p-2 hover:text-charcoal-900 transition-colors duration-200 md:hidden" title="Call support">
              <Phone className="w-5 h-5" />
            </a>

            {/* Wishlist Icon with count badge */}
            <Link
              to="/wishlist"
              className="p-2 hover:text-charcoal-900 transition-colors duration-200 relative flex items-center justify-center"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gold-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Shopping Cart Icon with count badge */}
            <Link
              to="/cart"
              className="p-2 hover:text-charcoal-900 transition-colors duration-200 relative flex items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-charcoal-900 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm border border-white"
                >
                  {totalCartCount}
                </motion.span>
              )}
            </Link>

            {/* User Dropdown Profile Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 p-2 hover:text-charcoal-900 transition-colors duration-200 focus:outline-none"
                title="My Account"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-3.5 h-3.5 opacity-60 hidden sm:block" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-neutral-100 rounded-lg shadow-xl py-2 z-50 overflow-hidden text-neutral-800"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
                          <p className="text-xs text-neutral-400 font-medium">Signed in as</p>
                          <p className="text-sm font-semibold text-charcoal-900 truncate">{user.name}</p>
                          <p className="text-[10px] text-neutral-500 truncate mt-0.5">{user.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-charcoal-900"
                        >
                          <UserCheck className="w-4 h-4 text-neutral-400" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-charcoal-900"
                        >
                          <FileText className="w-4 h-4 text-neutral-400" />
                          <span>Order History</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left border-t border-neutral-100 mt-1"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="text-xs font-medium text-neutral-500">Welcome to Aura Fashion</p>
                        </div>
                        <Link
                          to="/login?mode=login"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2.5 text-xs font-semibold hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-charcoal-900"
                        >
                          Login to Account
                        </Link>
                        <Link
                          to="/login?mode=register"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2.5 text-xs font-semibold hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-charcoal-900"
                        >
                          Create New Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar & Menu Items */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-100 bg-white"
          >
            <div className="px-4 pt-3 pb-4 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search elegant apparel..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-xs font-medium bg-neutral-50 focus:outline-none focus:border-charcoal-900 text-neutral-800"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1.5 pt-2">
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-all"
                >
                  Shop Collection
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-all"
                >
                  My Wishlist ({wishlistCount})
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-all"
                >
                  My Bag ({totalCartCount})
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-all"
                    >
                      My Profile ({user.name})
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-all"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login?mode=login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/login?mode=register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 hover:text-charcoal-900 transition-all"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
