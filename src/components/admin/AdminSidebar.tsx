import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Percent, 
  Settings2 
} from 'lucide-react';
import type { Order } from '../../types/types';

interface AdminSidebarProps {
  activeTab: 'home' | 'products' | 'orders' | 'customers' | 'reports' | 'promotions' | 'settings';
  setActiveTab: (tab: 'home' | 'products' | 'orders' | 'customers' | 'reports' | 'promotions' | 'settings') => void;
  adminOrders: Order[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  adminOrders 
}) => {
  const processingCount = adminOrders.filter(o => o.status === 'Processing').length;

  return (
    <aside className="sticky md:flex top-27 left-0 w-64 h-[calc(100vh-108px)] bg-black text-white flex-col border-r border-[#E5E1D8]/20 overflow-hidden">
      {/* Sidebar Header Brand */}
      <div className="p-6 border-b border-[#E5E1D8]/10 flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl font-extrabold tracking-[0.15em] text-white">
            AURA
          </span>
          <span className="text-[9px] bg-[#F27D26] text-white px-2 py-0.5 rounded-full font-mono uppercase font-bold">
            MANAGEMENT
          </span>
        </div>
        <span className="text-[10px] text-white/40 tracking-wider font-mono uppercase mt-1">
          HAUTE-COUTURE ATELIER
        </span>
      </div>

      {/* Navigation Menu Links */}
      <nav className="p-4 flex-grow space-y-1">
        <button
          onClick={() => setActiveTab('home')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
            activeTab === 'home' 
              ? 'bg-[#F27D26] text-white shadow-sm' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Home</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
            activeTab === 'products' 
              ? 'bg-[#F27D26] text-white shadow-sm' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Products Inventory</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
            activeTab === 'orders' 
              ? 'bg-[#F27D26] text-white shadow-sm' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Orders Board</span>
          {processingCount > 0 && (
            <span className="ml-auto bg-white text-black text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold">
              {processingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
            activeTab === 'customers' 
              ? 'bg-[#F27D26] text-white shadow-sm' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Customers Base</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
            activeTab === 'reports' 
              ? 'bg-[#F27D26] text-white shadow-sm' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Sales & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
            activeTab === 'promotions' 
              ? 'bg-[#F27D26] text-white shadow-sm' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Percent className="w-4 h-4" />
          <span>Promos & Coupons</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
            activeTab === 'settings' 
              ? 'bg-[#F27D26] text-white shadow-sm' 
              : 'text-white/70 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          <span>Atelier Settings</span>
        </button>
      </nav>

      {/* Bottom user card */}
      <div className="p-4 border-t border-[#E5E1D8]/10 bg-neutral-950 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#F27D26]/20 border border-[#F27D26]/40 flex items-center justify-center text-white text-[10px] font-bold">
          AD
        </div>
        <div className="overflow-hidden">
          <h4 className="text-[11px] font-bold tracking-wider uppercase text-white truncate">Administrator</h4>
          <p className="text-[9px] text-white/50 truncate">admin@aurafashion.com</p>
        </div>
      </div>
    </aside>
  );
};
