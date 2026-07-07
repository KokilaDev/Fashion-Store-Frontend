import React from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import type { Order } from '../../types/types';

interface AdminOrdersProps {
  filteredOrders: Order[];
  orderSearch: string;
  setOrderSearch: (s: string) => void;
  orderStatusFilter: string;
  setOrderStatusFilter: (s: string) => void;
  handleViewOrder: (order: Order) => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({
  filteredOrders,
  orderSearch,
  setOrderSearch,
  orderStatusFilter,
  setOrderStatusFilter,
  handleViewOrder
}) => {
  return (
    <div className="space-y-6">
      {/* Search and Filters for Orders */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-[#E5E1D8] shadow-sm">
        
        <div className="relative flex-grow max-w-md w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search Order ID, customer details, or garments bought..."
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl text-xs font-medium focus:outline-none bg-[#F5F2ED] text-neutral-800 transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>

          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="px-3 py-1.5 border border-[#E5E1D8] bg-[#F5F2ED] rounded-xl text-xs font-bold uppercase tracking-widest text-neutral-700 focus:outline-none"
          >
            <option value="All">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
      </div>

      {/* ORDERS LIST BOARD */}
      <div className="bg-white border border-[#E5E1D8] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#F5F2ED]/60">
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Order ID</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Order Date</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Purchased Items</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Bill Total</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Dispatch Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-400 italic">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#1A1A1A]">
                      {o.id}
                    </td>
                    <td className="p-4 text-neutral-500 font-medium">
                      {o.createdAt}
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-neutral-700">
                            <span className="font-bold text-[#1A1A1A]">{item.qty}x</span>
                            <span className="truncate max-w-[150px]">{item.name}</span>
                            <span className="text-[9px] text-neutral-400">({item.size})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#1A1A1A]">
                      Rs. {o.total.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        o.status === 'Delivered' 
                          ? 'bg-green-50 text-green-700 border border-green-100'
                          : o.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : o.status === 'Processing'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewOrder(o)}
                          className="px-2 py-1 text-[10px] font-bold bg-[#F5F2ED] border border-[#E5E1D8] hover:bg-black hover:text-white transition-all rounded-lg flex items-center gap-1 cursor-pointer text-neutral-700"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View & Manage</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
