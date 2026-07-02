import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Product } from '../../types/types';

interface ProductFormState {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  sizes: string[];
  isTrending: boolean;
  isNew: boolean;
  rating: number;
  description: string;
  stock: number;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
  productForm: ProductFormState;
  setProductForm: (form: ProductFormState) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  editingProduct,
  productForm,
  setProductForm,
  handleSubmit
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />

          {/* Modal Frame Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            className="relative w-full max-w-xl bg-white border border-[#E5E1D8] rounded-2xl shadow-2xl p-6 text-xs max-h-[90vh] overflow-y-auto z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black p-1 bg-neutral-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-serif text-lg font-bold text-neutral-900 mb-2">
              {editingProduct ? `Edit "${editingProduct.name}"` : 'Launch New Atelier Garment'}
            </h2>
            <p className="text-neutral-500 mb-5">
              Supply complete image references, category associations, pricing levels, and product briefs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aura Silk Evening Frock"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl font-semibold bg-[#F5F2ED] text-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="189"
                    value={productForm.price || ''}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl font-bold bg-[#F5F2ED] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Original Price ($ - optional)</label>
                  <input
                    type="number"
                    placeholder="e.g. 240 (for sales)"
                    value={productForm.originalPrice || ''}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl font-bold bg-[#F5F2ED] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Garment Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E1D8] bg-[#F5F2ED] rounded-xl font-bold uppercase text-neutral-700"
                  >
                    <option value="Frocks">Frocks</option>
                    <option value="Blouses">Blouses</option>
                    <option value="Tops">Tops</option>
                    <option value="Skirts">Skirts</option>
                    <option value="Party Wear">Party Wear</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Suits">Suits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl font-bold bg-[#F5F2ED] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Image URL (Unsplash portrait recommended)</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl bg-[#F5F2ED] text-neutral-800 text-[11px]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">Product Brief Description</label>
                <textarea
                  rows={2}
                  placeholder="Flowing silk silhouette with an elegant backless cut, designed for evening gatherings."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl bg-[#F5F2ED] text-neutral-800 text-[11px]"
                />
              </div>

              {/* Badges/Toggles */}
              <div className="flex gap-6 border-t border-neutral-100 pt-3 text-[11px] font-bold">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
                  <input
                    type="checkbox"
                    checked={productForm.isTrending}
                    onChange={(e) => setProductForm({ ...productForm, isTrending: e.target.checked })}
                    className="rounded border-neutral-300 text-[#F27D26] focus:ring-0"
                  />
                  <span>Flag as trending item</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
                  <input
                    type="checkbox"
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                    className="rounded border-neutral-300 text-[#F27D26] focus:ring-0"
                  />
                  <span>Flag as new arrival</span>
                </label>
              </div>

              {/* Action button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-black hover:bg-[#F27D26] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
              >
                {editingProduct ? 'Commit Garment Edits' : 'Authorize Garment Release'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
