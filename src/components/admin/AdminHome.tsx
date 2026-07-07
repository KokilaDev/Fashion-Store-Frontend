import React from 'react';
import { 
  DollarSign, 
  ClipboardList, 
  AlertTriangle, 
  ArrowUpRight, 
  TrendingUp 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import type { Product } from '../../types/types';

interface TopSellingProductItem {
  product: Product;
  unitsSold: number;
  totalRev: number;
}

interface AdminHomeProps {
  totalSalesFromOrders: number;
  salesCount: number;
  estimatedProfit: number;
  lowStockCount: number;
  monthlyRevenueData: Array<{ month: string; revenue: number; profit: number; orders: number }>;
  topSellingProducts: TopSellingProductItem[];
}

export const AdminHome: React.FC<AdminHomeProps> = ({
  totalSalesFromOrders,
  salesCount,
  estimatedProfit,
  lowStockCount,
  monthlyRevenueData,
  topSellingProducts
}) => {
  return (
    <div className="space-y-6">
      {/* TOP METRICS GRID (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metrics Card 1: Total Sales */}
        <div className="bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Revenue</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
              Rs. {totalSalesFromOrders.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-2">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+14.2% FROM LAST MONTH</span>
            </div>
          </div>
        </div>

        {/* Metrics Card 2: Total Orders */}
        <div className="bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Orders</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">{salesCount} Active</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>HEALTHY ORDER DISPATCH rate</span>
            </div>
          </div>
        </div>

        {/* Metrics Card 3: Total Profit */}
        <div className="bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Luxury Net Profit</span>
            <div className="p-2 bg-amber-50 text-[#F27D26] rounded-full">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">
              Rs. {estimatedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#F27D26] mt-2">
              <span className="font-mono bg-[#F27D26]/10 px-1.5 py-0.5 rounded">65% AVG MARGIN</span>
            </div>
          </div>
        </div>

        {/* Metrics Card 4: Low Stock Alert */}
        <div className="bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Stock Alerts</span>
            <div className={`p-2 rounded-full ${lowStockCount > 0 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-light text-[#1A1A1A]">{lowStockCount} Low Items</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-red-500 mt-2">
              {lowStockCount > 0 ? (
                <span>Needs restocking attention</span>
              ) : (
                <span className="text-green-600">All inventory fully stocked</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* REVENUE CHARTS & TOP SELLING PRODUCTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 6-Month Revenue chart block (col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Monthly Revenue & Growth</h3>
              <p className="text-[11px] text-neutral-400">Aggregated revenue timeline against luxury profit bounds</p>
            </div>
            <div className="flex gap-4 text-[10px] font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F27D26]" />
                <span>REVENUE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
                <span>PROFIT</span>
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F27D26" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#8C857B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#8C857B' }} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#F27D26" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (Rs.)" />
                <Area type="monotone" dataKey="profit" stroke="#1A1A1A" strokeWidth={1.5} fillOpacity={1} fill="url(#colorProfit)" name="Net Profit (Rs.)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products List block (col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">Top Performing Items</h3>
            <p className="text-[11px] text-neutral-400">By sales volume and total revenue</p>
          </div>

          <div className="space-y-4 flex-grow overflow-y-auto max-h-[280px] pr-1">
            {topSellingProducts.slice(0, 4).map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                <img 
                  src={`http://localhost:5000/uploads/${item.product.image}`} 
                  alt={item.product.name} 
                  referrerPolicy="no-referrer"
                  className="w-10 h-12 object-cover rounded-lg bg-neutral-100 shrink-0 border border-[#E5E1D8]/40"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-[#1A1A1A] truncate">{item.product.name}</h4>
                  <span className="text-[9px] font-mono tracking-wider uppercase text-[#F27D26] bg-[#F27D26]/10 px-1.5 py-0.5 rounded font-bold">
                    {item.product.category}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-[#1A1A1A]">Rs. {item.totalRev}</p>
                  <p className="text-[9px] text-neutral-400 font-medium">{item.unitsSold} units</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
