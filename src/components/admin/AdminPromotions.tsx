import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Coupon } from '../../types/types';

interface AdminPromotionsProps {
  coupons: Coupon[];
  couponForm: {
    code: string;
    discountPercent: number;
    description: string;
  };
  setCouponForm: (form: { code: string; discountPercent: number; description: string }) => void;
  handleCreateCoupon: (e: React.FormEvent) => void;
  handleDeleteCoupon: (code: string) => void;
}

export const AdminPromotions: React.FC<AdminPromotionsProps> = ({
  coupons,
  couponForm,
  setCouponForm,
  handleCreateCoupon,
  handleDeleteCoupon
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Create Promotions (col-span-5) */}
      <div className="lg:col-span-5 bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-fit">
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Launch Active Voucher</h3>
          <p className="text-[11px] text-neutral-400">Configure discount codes instantly live on checkouts</p>
        </div>

        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Coupon Code</label>
            <input
              type="text"
              required
              placeholder="e.g. VIPSUMMER"
              value={couponForm.code}
              onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
              className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl text-xs font-semibold focus:outline-none bg-[#F5F2ED] uppercase tracking-widest text-[#1A1A1A] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Discount Percentage (%)</label>
            <input
              type="number"
              required
              min={5}
              max={75}
              value={couponForm.discountPercent}
              onChange={(e) => setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })}
              className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl text-xs font-semibold focus:outline-none bg-[#F5F2ED] text-[#1A1A1A] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Description narrative</label>
            <textarea
              rows={2}
              placeholder="Give a short summary of constraints..."
              value={couponForm.description}
              onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
              className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl text-xs font-medium focus:outline-none bg-[#F5F2ED] text-neutral-800 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#F27D26] hover:bg-[#d65f0e] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch Coupon</span>
          </button>
        </form>
      </div>

      {/* Right Column: Live coupons list (col-span-7) */}
      <div className="lg:col-span-7 bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Live Active Vouchers ({coupons.length})</h3>
          <p className="text-[11px] text-neutral-400">Coupon rules currently accessible by checkout clients</p>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
          {coupons.map((c) => (
            <div key={c.code} className="p-4 border border-[#E5E1D8] bg-[#F5F2ED]/60 rounded-xl flex items-center justify-between hover:bg-white transition-all duration-300">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold tracking-widest bg-black text-white px-2.5 py-0.5 rounded">
                    {c.code}
                  </span>
                  <span className="text-[10px] text-[#F27D26] font-bold uppercase tracking-wider">
                    {c.discountPercent}% OFF
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 font-medium mt-1.5">{c.description}</p>
              </div>

              <button
                onClick={() => handleDeleteCoupon(c.code)}
                className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-neutral-400"
                title="Delete coupon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
