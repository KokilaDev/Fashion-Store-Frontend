import React from 'react';
import { Search, Filter, Plus, Edit, Trash2, X } from 'lucide-react';
import type { Product } from '../../types/types';

interface AdminProductsProps {
  filteredProducts: Product[];
  productSearch: string;
  setProductSearch: (s: string) => void;
  productCategoryFilter: string;
  setProductCategoryFilter: (s: string) => void;
  openAddProductModal: () => void;
  openEditProductModal: (product: Product) => void;
  handleDeleteProduct: (product: Product) => void;
  productStockMap: Record<string, number>;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  filteredProducts,
  productSearch,
  setProductSearch,
  productCategoryFilter,
  setProductCategoryFilter,
  openAddProductModal,
  openEditProductModal,
  handleDeleteProduct,
  productStockMap
}) => {
  return (
    <div className="space-y-6">
      {/* Product Filtering and Search Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-[#E5E1D8] shadow-sm">
        
        {/* Search input field */}
        <div className="relative flex-grow max-w-md w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search model name, SKU, or style details..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl text-xs font-medium focus:outline-none focus:ring-0 bg-[#F5F2ED] text-neutral-800 transition-all"
          />
          {productSearch && (
            <button 
              onClick={() => setProductSearch('')} 
              className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Category:</span>
          </div>
          
          <select
            value={productCategoryFilter}
            onChange={(e) => setProductCategoryFilter(e.target.value)}
            className="px-3 py-1.5 border border-[#E5E1D8] bg-[#F5F2ED] rounded-xl text-xs font-bold uppercase tracking-widest text-neutral-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Frocks">Frocks</option>
            <option value="Blouses">Blouses</option>
            <option value="Tops">Tops</option>
            <option value="Skirts">Skirts</option>
            <option value="Party Wear">Party Wear</option>
            <option value="Jeans">Jeans</option>
            <option value="Trousers">Trousers</option>
            <option value="Suits">Suits</option>
          </select>

          <button
            onClick={openAddProductModal}
            className="ml-auto md:ml-2 px-4 py-1.5 bg-[#F27D26] hover:bg-[#d65f0e] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Launch Product</span>
          </button>
        </div>
      </div>

      {/* PRODUCTS INVENTORY LIST TABLE */}
      <div className="bg-white border border-[#E5E1D8] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#F5F2ED]/60">
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Garment</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">ID/Category</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Sizes</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Price</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Stock Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-400 italic">
                    No matching garments found in AURA atelier inventory.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const stock = productStockMap[p.id] ?? 20;
                  return (
                    <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={
                            typeof p.image === "string"
                              ? p.image
                              : undefined
                          }
                          alt={p.name}
                          className="w-10 h-12 object-cover rounded-lg bg-neutral-100 shrink-0 border border-neutral-200"
                        />
                        <div>
                          <h4 className="font-bold text-[#1A1A1A]">{p.name}</h4>
                          <p className="text-[10px] text-neutral-400 truncate max-w-xs">{p.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-mono text-[10px] font-bold text-neutral-400">{p.id ? p.id.toUpperCase() : 'N/A'}</p>
                        <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap">
                          {p.sizes.map(s => (
                            <span key={s} className="border border-neutral-200 px-1 rounded text-[8px] font-bold text-neutral-500">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-[#1A1A1A]">
                        ${p.price.toFixed(2)}
                        {p.originalPrice && (
                          <span className="text-[9px] text-neutral-400 line-through block font-medium">
                            ${p.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${stock === 0 ? 'bg-red-500' : stock <= 5 ? 'bg-amber-500' : 'bg-green-500'}`} />
                          <span className="font-mono text-xs font-bold text-[#1A1A1A]">{stock} in stock</span>
                          {stock <= 5 && (
                            <span className="text-[9px] text-red-500 font-bold uppercase tracking-wider bg-red-50 px-1 py-0.5 rounded">
                              {stock === 0 ? "OUT" : "LOW"}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 hover:text-[#F27D26] hover:bg-[#F27D26]/5 rounded-lg transition-colors cursor-pointer text-neutral-500"
                            title="Edit garment properties"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p)}
                            className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-neutral-400"
                            title="Retire from inventory"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
