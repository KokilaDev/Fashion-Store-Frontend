import React from 'react';
import { Download } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface MonthlyRevenueItem {
  month: string;
  revenue: number;
  profit: number;
  orders: number;
}

interface CategorySalesItem {
  name: string;
  value: number;
}

interface AdminReportsProps {
  handleExport: (format: 'PDF' | 'EXCEL') => void;
  monthlyRevenueData: MonthlyRevenueItem[];
  categorySalesData: CategorySalesItem[];
  COLORS: string[];
}

export const AdminReports: React.FC<AdminReportsProps> = ({
  handleExport,
  monthlyRevenueData,
  categorySalesData,
  COLORS
}) => {
  return (
    <div className="space-y-6">
      {/* Reports Control Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E5E1D8] shadow-sm">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Operational Data Export</h3>
          <p className="text-[10px] text-neutral-400">Produce official certified bookkeeping worksheets</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('PDF')}
            className="px-3.5 py-1.5 border border-[#E5E1D8] hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer text-neutral-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Compile PDF</span>
          </button>
          <button
            onClick={() => handleExport('EXCEL')}
            className="px-3.5 py-1.5 bg-[#F27D26] hover:bg-[#d65f0e] text-white transition-all text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Excel</span>
          </button>
        </div>
      </div>

      {/* REPORT CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Bar Chart Comparison */}
        <div className="lg:col-span-7 bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Atelier Revenue vs Operating Profit</h3>
            <p className="text-[11px] text-neutral-400">Comparing gross intake limits with calculated profit margins</p>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#8C857B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#8C857B' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="revenue" fill="#F27D26" radius={[4, 4, 0, 0]} name="Gross Income ($)" />
                <Bar dataKey="profit" fill="#1A1A1A" radius={[4, 4, 0, 0]} name="Net Margin ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Category Share Pie Chart */}
        <div className="lg:col-span-5 bg-white border border-[#E5E1D8] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Garment Sales by Category</h3>
            <p className="text-[11px] text-neutral-400">Proportional breakdowns of style collections sold</p>
          </div>

          <div className="h-[280px] w-full flex flex-col justify-center items-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categorySalesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [`$${val}`, 'Sales']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-3 gap-2 w-full text-[9px] font-bold mt-2 border-t border-neutral-100 pt-3">
              {categorySalesData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-neutral-500 uppercase tracking-tight">{entry.name}:</span>
                  <span className="text-[#1A1A1A]">${entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
