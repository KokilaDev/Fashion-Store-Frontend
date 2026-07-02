import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCheck, ShieldCheck, Mail, MapPin, Award, ArrowRight, Phone, Gift } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
        navigate('/login?mode=login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const orderCount = user.orders?.length ?? 0;
  // Calculate Loyalty Status Tier
  const tier = orderCount >= 5 ? 'Platinum Elite' : orderCount >= 3 ? 'Gold Lounge' : 'VIP Member';
  const points = orderCount * 120 + 250; // Dynamic loyalty points simulation

  return (
    <div id="profile-page" className="max-w-4xl mx-auto px-4 py-12 min-h-[75vh]">
      
      {/* Header Profile Title */}
      <div className="border-b border-neutral-200 pb-5 mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-charcoal-900 flex items-center gap-2.5">
          <UserCheck className="w-8 h-8 text-gold-600" />
          <span>My Profile Dashboard</span>
        </h1>
        <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider mt-1">Aura Elite Member Lounge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Member Card & Loyalty Status */}
        <div className="md:col-span-1 space-y-6">
          {/* VIP Member Card */}
          <div className="bg-gradient-to-br from-charcoal-900 to-neutral-800 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden border border-neutral-800">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-500/10 to-transparent rounded-full" />
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] tracking-widest font-mono uppercase text-gold-200">Aura Lounge Card</span>
              <Award className="w-6 h-6 text-gold-400" />
            </div>
            
            <p className="text-lg font-serif tracking-wide mb-1 text-white">{user.name}</p>
            <p className="text-[10px] text-neutral-400 mb-8">{user.email}</p>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] uppercase tracking-widest font-mono text-neutral-400">MEMBERSHIP TIER</p>
                <p className="text-xs font-bold text-gold-300 tracking-wider uppercase font-mono">{tier}</p>
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500">EST. 2026</span>
            </div>
          </div>

          {/* Loyalty Rewards Points details */}
          <div className="bg-white border border-neutral-100 rounded-xl p-5 shadow-sm text-center">
            <Gift className="w-7 h-7 text-gold-500 mx-auto mb-2.5" />
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">LOYALTY LOUNGE POINTS</p>
            <p className="text-3xl font-extrabold text-charcoal-900 font-mono mt-1">{points}</p>
            <p className="text-[10px] text-neutral-400 mt-2">
              You are <span className="font-bold text-gold-600">{(points % 500)} points</span> away from your next complimentary $50 shopping reward.
            </p>
          </div>
        </div>

        {/* Right Column: Address Detail, Shipping, Orders Summary (Col Span 2) */}
        <div className="md:col-span-2 space-y-6">
          {/* Account Profile Details */}
          <div className="bg-white border border-neutral-100 rounded-xl shadow-sm p-6 space-y-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Account Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">EMAIL ADDRESS</span>
                <div className="flex items-center gap-2 text-neutral-700">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">CONTACT SUPPORT PHONE</span>
                <div className="flex items-center gap-2 text-neutral-700">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>+1 (800) AURA-FASHION</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-neutral-100 rounded-xl shadow-sm p-6 space-y-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-600" />
              <span>Default Shipping Address</span>
            </h3>

            <div className="text-xs text-neutral-600 space-y-1">
              <p className="font-bold text-charcoal-900">{user.name}</p>
              <p>742 Luxury Boulevard, Suite 10</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <p className="text-[10px] text-neutral-400 italic pt-2">To alter delivery address details, consult active orders during custom checkout.</p>
            </div>
          </div>

          {/* Quick Access Menu */}
          <div className="flex justify-between items-center bg-gold-50/30 border border-gold-100 p-5 rounded-xl">
            <div>
              <p className="text-xs font-bold text-charcoal-900">Have purchase questions?</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Explore your historical invoices and active order state.</p>
            </div>
            <Link
              to="/orders"
              className="px-4 py-2 bg-charcoal-900 hover:bg-gold-600 text-white font-bold text-[10px] tracking-widest uppercase rounded flex items-center gap-1.5 transition-colors"
            >
              <span>View Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
