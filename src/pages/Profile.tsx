import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCheck, ShieldCheck, Mail, MapPin, Award, ArrowRight, Phone, Gift, Edit2, Save, X, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { updateMyDetails } from '../services/auth';

export const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [zip, setZip] = useState(user?.zip || '');
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      navigate('/login?mode=login');
      console.log("User not logged in.");
    }
  }, [user, navigate]);

  if (!user) {
    console.log("User is null, redirecting to login.");
    return null
  };

  const orderCount = user.orders?.length || 0;
  const tier = orderCount >= 5 ? 'Platinum Elite' : orderCount >= 3 ? 'Gold Lounge' : 'VIP Member';
  const points = orderCount * 120 + 250;

  const handleSave = async () => {
    if (!name.trim()) {
      console.log("Name cannot be empty.");
      setNotification({
        text: 'Name cannot be empty.',
        type: 'error'
      });
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      console.log("Email must be a valid email address.");
      setNotification({
        text: 'Please enter a valid email address.',
        type: 'error'
      });
      return;
    }

    try {
      console.log("Attempting to update profile with:", { name, email, phone, address });

      const response = await updateMyDetails({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        zip: zip.trim()
      });

      console.log("Profile update response:", response);

      if (response.success) {
        console.log("Profile updated successfully.", response.data);

        setUser((prev: any) => ({
          ...prev,
          ...response.data,
          isLoggedIn: true
        }));

        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone || '');
        setAddress(response.data.address || '');
        setCity(response.data.city || '');
        setZip(response.data.zip || '');
        setIsEditing(false);

        setNotification({
          text: 'Profile updated successfully.',
          type: 'success'
        });
      }
    } catch (error: any) {
      console.log("Failed to update profile.");
      setNotification({
        text: error.message || 'Update failed',
        type: 'error'
      });
    }
  };

  return (
    <div id="profile-page" className="max-w-4xl mx-auto px-4 py-12 min-h-[75vh]">
      
      {/* Header Profile Title */}
      <div className="border-b border-neutral-200 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-charcoal-900 flex items-center gap-2.5">
            <UserCheck className="w-8 h-8 text-gold-600" />
            <span>My Profile Dashboard</span>
          </h1>
          <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider mt-1">Aura Elite Member Lounge</p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="self-start sm:self-center px-4 py-2 bg-charcoal-900 hover:bg-gold-600 text-white font-bold text-[10px] tracking-widest uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white font-bold text-[10px] tracking-widest uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                if (user) {
                  setName(user.name || '');
                  setEmail(user.email || '');
                  setPhone(user.phone || '');
                  setAddress(user.address || '');
                  setCity(user.city || '');
                  setZip(user.zip || '');
                }
                setNotification(null);
              }}
              className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-[10px] tracking-widest uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          </div>
        )}
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
            
            <p className="text-lg font-serif tracking-wide mb-1 text-white truncate">{user.name}</p>
            <p className="text-[10px] text-neutral-400 mb-8 truncate">{user.email}</p>

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
          
          {notification && (
            <div className={`p-3.5 rounded-xl text-xs font-semibold border flex items-center gap-2 ${
              notification.type === 'success' 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                : 'bg-red-50 border-red-100 text-red-800'
            }`}>
              {notification.type === 'success' ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-600" />}
              <span>{notification.text}</span>
            </div>
          )}

          {/* Account Profile Details */}
          <div className="bg-white border border-neutral-100 rounded-xl shadow-sm p-6 space-y-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Account Credentials</span>
            </h3>

            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold-500 bg-neutral-50 text-neutral-800 focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold-500 bg-neutral-50 text-neutral-800 focus:ring-1 focus:ring-gold-500"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Contact Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold-500 bg-neutral-50 text-neutral-800 focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">FULL NAME</span>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <UserCheck className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{user.name}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">EMAIL ADDRESS</span>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">CONTACT PHONE</span>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{user.phone || '+1 (555) 019-2831'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-neutral-100 rounded-xl shadow-sm p-6 space-y-5">
            <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-600" />
              <span>Default Shipping Address</span>
            </h3>

            {isEditing ? (
              <div className="text-xs space-y-1">
                <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Shipping Address Details</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold-500 bg-neutral-50 text-neutral-800 text-xs font-sans leading-relaxed focus:ring-1 focus:ring-gold-500"
                  placeholder="Street Address, City, State, ZIP, Country"
                />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold-500 bg-neutral-50 text-neutral-800 text-xs font-sans leading-relaxed focus:ring-1 focus:ring-gold-500"
                  placeholder="City"
                />
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold-500 bg-neutral-50 text-neutral-800 text-xs font-sans leading-relaxed focus:ring-1 focus:ring-gold-500"
                  placeholder="ZIP Code"
                />
              </div>
            ) : (
              <div className="text-xs text-neutral-600 space-y-1">
                <p className="font-bold text-charcoal-900">{user.name}</p>
                <p className="whitespace-pre-line font-medium leading-relaxed">
                  {user.address || 'No address added'}
                </p>
                <p className="whitespace-pre-line font-medium leading-relaxed">
                  {user.city || 'No city added'}
                </p>
                <p className="whitespace-pre-line font-medium leading-relaxed">
                  {user.zip || 'No ZIP code added'}
                </p>
                <p className="text-[10px] text-neutral-400 italic pt-2">This is your standard address for seamless checkouts.</p>
              </div>
            )}
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

