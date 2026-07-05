import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, ShoppingBag, ChevronRight, Plus, Minus, CreditCard, Tag, Check, RefreshCcw, LogIn, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_COUPONS } from '../types/types';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../hooks/useAuth';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useStore();
  const { user } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  // Shipping details state
  const [shippingName, setShippingName] = useState('');
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [addressError, setAddressError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * activeDiscount) / 100;
  const shippingFee = subtotal > 150 ? 0 : 15.00; // Free shipping over $150
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const codeUpper = promoCode.trim().toUpperCase();
    const matchedCoupon = MOCK_COUPONS.find(c => c.code === codeUpper);

    if (matchedCoupon) {
      setActiveDiscount(matchedCoupon.discountPercent);
      setPromoSuccess(`Promo applied successfully! Saved ${matchedCoupon.discountPercent}% OFF.`);
    } else {
      setPromoError('Invalid coupon code. Try "AURA15", "ELEGANCE20", or "FIRSTBUY10".');
      setActiveDiscount(0);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?mode=login');
      return;
    }

    setCheckingOut(true);
    // Simulate payment processing
    setTimeout(() => {
      const order = placeOrder(activeDiscount);
      setCheckingOut(false);
      if (order) {
        setPlacedOrderId(order.id);
        setShowSuccessModal(true);
      }
    }, 1800);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    navigate('/orders');
  };

  return (
    <div id="cart-checkout-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh] relative">
      
      {/* Breadcrumb path */}
      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-6">
        <Link to="/" className="hover:text-charcoal-900 transition-colors">AURA</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal-900 font-bold">SHOPPING BAG</span>
      </div>

      <div className="border-b border-neutral-200 pb-4 mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-charcoal-900 flex items-center gap-2.5">
          <ShoppingBag className="w-8 h-8 text-neutral-800" />
          <span>My Shopping Bag</span>
        </h1>
        <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider mt-1">Review luxury investment pieces</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-24 bg-white border border-neutral-100 rounded-2xl max-w-lg mx-auto shadow-sm">
          <ShoppingBag className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
          <h2 className="font-serif text-lg font-bold text-neutral-800">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto leading-relaxed">
            There are no items currently added. Elevate your wardrobe with Aura's custom-cut seasonal attire.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal-900 hover:bg-gold-600 text-white font-bold text-[10px] tracking-widest uppercase rounded transition-all"
          >
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items (Col Span 8) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div 
                key={`${item.product.id}-${item.size}`}
                className="flex items-center gap-4 bg-white border border-neutral-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="w-20 aspect-[3/4] bg-neutral-50 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block mb-0.5">
                    {item.product.category}
                  </span>
                  <h3 className="text-sm font-semibold text-charcoal-900 line-clamp-1">
                    {item.product.name}
                  </h3>
                  
                  {/* Size Pill */}
                  <span className="inline-flex items-center justify-center bg-neutral-100 text-neutral-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase mt-1">
                    SIZE: {item.size}
                  </span>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-2.5 mt-3">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold font-mono tracking-wide w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Price and Delete Actions */}
                <div className="flex flex-col items-end justify-between self-stretch">
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    title="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                  <p className="text-sm font-bold text-charcoal-900 font-mono mt-auto">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {/* Shipping Information Card */}
            {user && (
              <div id="shipping-form-section" className="bg-white border border-[#E5E1D8] rounded-2xl shadow-sm p-6 space-y-4">
                <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F27D26]" />
                  <span>Tailoring Dispatch & Shipping Details</span>
                </h3>
                
                {addressError && (
                  <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-100 animate-pulse">
                    {addressError}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase">Recipient Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sophia Reynolds"
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl bg-[#F5F2ED] text-neutral-800 text-[11px] focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 321-4920"
                      value={shippingPhone}
                      onChange={(e) => setShippingPhone(e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl bg-[#F5F2ED] text-neutral-800 text-[11px] focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 452 Regency Dr"
                    value={shippingStreet}
                    onChange={(e) => setShippingStreet(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl bg-[#F5F2ED] text-neutral-800 text-[11px] focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase">City & State</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Beverly Hills, CA"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl bg-[#F5F2ED] text-neutral-800 text-[11px] focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase">ZIP / Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 90210"
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl bg-[#F5F2ED] text-neutral-800 text-[11px] focus:outline-none focus:ring-1 focus:ring-[#F27D26]"
                  />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary (Col Span 4) */}
          <div className="lg:col-span-4 bg-white border border-neutral-100 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 border-b border-neutral-100 pb-3">
              ORDER SUMMARY
            </h2>

            {/* Price Details */}
            <div className="space-y-3.5 text-xs text-neutral-600 border-b border-neutral-100 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold font-mono text-charcoal-900">${subtotal.toFixed(2)}</span>
              </div>
              
              {activeDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon ({activeDiscount}% Off)</span>
                  </span>
                  <span className="font-bold font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping (Express courier)</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px]">FREE SHIPPING</span>
                ) : (
                  <span className="font-bold font-mono text-charcoal-900">${shippingFee.toFixed(2)}</span>
                )}
              </div>
              
              {shippingFee > 0 && (
                <p className="text-[9px] text-neutral-400 font-medium italic">
                  Spend ${(150 - subtotal).toFixed(2)} more to unlock FREE shipping!
                </p>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-serif font-bold text-charcoal-900">Final Total</span>
              <span className="text-xl font-extrabold text-charcoal-900 font-mono">${finalTotal.toFixed(2)}</span>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">PROMO / VOUCHER CODE</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon (e.g. AURA15)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow px-3 py-2 border border-neutral-200 focus:border-charcoal-900 rounded text-xs font-semibold focus:outline-none uppercase text-neutral-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 hover:border-neutral-300 text-charcoal-900 font-bold text-[10px] tracking-wider uppercase rounded transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {promoError && <p className="text-[10px] text-red-600 font-semibold">{promoError}</p>}
              {promoSuccess && <p className="text-[10px] text-emerald-600 font-semibold">{promoSuccess}</p>}
            </form>

            {/* Checkout CTA */}
            <div className="pt-2">
              {!currentUser ? (
                <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-xl text-center flex flex-col gap-2.5">
                  <p className="text-[11px] text-amber-800 leading-relaxed font-semibold">
                    You are currently checking out as a Guest. Join or login to earn luxury rewards.
                  </p>
                  <button
                    onClick={() => navigate('/login?mode=login')}
                    className="w-full py-2 bg-amber-800 hover:bg-amber-950 text-white font-bold text-[10px] tracking-widest uppercase rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login & Secure Checkout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full py-3.5 bg-charcoal-900 hover:bg-gold-600 disabled:bg-neutral-400 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {checkingOut ? (
                    <>
                      <RefreshCcw className="w-4 h-4 animate-spin" />
                      <span>SECURE PROCESSING...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>PLACE SECURE ORDER</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Security Note */}
            <p className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest text-center mt-3">
              🔒 256-Bit SSL Encrypted checkout
            </p>
          </div>

        </div>
      )}

      {/* Checkout Success Modal overlay */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
              onClick={handleCloseSuccess}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 p-8 text-center"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-5">
                <Check className="w-8 h-8 stroke-[3px]" />
              </div>

              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-emerald-600 block mb-1">
                Order Received
              </span>
              <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
                Bespoke Purchase Complete
              </h2>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed mb-6">
                Your order <b className="text-charcoal-900 font-mono">{placedOrderId}</b> has been received and routed to our tailoring atelier. Complimentary tracking updates have been forwarded to your email.
              </p>

              <button
                onClick={handleCloseSuccess}
                className="w-full py-3 bg-charcoal-900 hover:bg-gold-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md transition-all cursor-pointer"
              >
                Track My Order History
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
