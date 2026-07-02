import React from 'react';
import { Search } from 'lucide-react';
import type { Customer } from '../../types/types';

interface AdminCustomersProps {
  filteredCustomers: Customer[];
  customerSearch: string;
  setCustomerSearch: (s: string) => void;
}

export const AdminCustomers: React.FC<AdminCustomersProps> = ({
  filteredCustomers,
  customerSearch,
  setCustomerSearch
}) => {
  return (
    <div className="space-y-6">
      {/* Customer Search header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-[#E5E1D8] shadow-sm">
        <div className="relative flex-grow max-w-md w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search customer base by name, email, or telephone contact..."
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl text-xs font-medium focus:outline-none bg-[#F5F2ED] text-neutral-800 transition-all"
          />
        </div>
        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
          {filteredCustomers.length} registered customers
        </div>
      </div>

      {/* CUSTOMER DATABASE TABLE */}
      <div className="bg-white border border-[#E5E1D8] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#F5F2ED]/60">
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">ID</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Customer Name</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Email Address</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Phone</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Total Purchase Count</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-right">Lifetime Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-neutral-400">{c.id}</td>
                  <td className="p-4 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-[10px]">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-bold text-[#1A1A1A]">{c.name}</span>
                  </td>
                  <td className="p-4 text-neutral-500 font-medium">{c.email}</td>
                  <td className="p-4 text-neutral-500 font-mono text-[11px]">{c.phone}</td>
                  <td className="p-4 font-mono font-bold text-neutral-600 pl-8">{c.orderCount} orders</td>
                  <td className="p-4 font-bold text-[#1A1A1A] text-right">
                    ${c.totalPurchases.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
