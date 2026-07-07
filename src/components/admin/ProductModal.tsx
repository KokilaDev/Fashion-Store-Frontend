import React, { useRef, useState } from 'react';
import { X, UploadCloud, Trash2, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Product, ProductForm } from '../../types/types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
  productForm: ProductForm;
  setProductForm: (form: ProductForm) => void;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Please select a valid image file (PNG, JPEG, WEBP).");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;

      if (typeof result === 'string') {
        setProductForm({ 
          ...productForm, 
          image: file,
          imagePreview: result 
        });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setProductForm({ 
      ...productForm, 
      imagePreview: '',
      image: null 
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

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
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl font-semibold bg-[#F5F2ED] text-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productForm.price || ''}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl font-bold bg-[#F5F2ED] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Original Price (Rs. - optional)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice ?? ""}
                    onChange={(e) => 
                      setProductForm({ 
                        ...productForm, 
                        originalPrice: e.target.value 
                          ? Number(e.target.value) 
                          : undefined,
                      })
                    }
                    className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl font-bold bg-[#F5F2ED] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Sizes
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <label key={size} className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        <input
                          type="checkbox"
                          className="accent-[#F27D26]"
                          checked={productForm.sizes.includes(size)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProductForm({
                                ...productForm,
                                sizes: [...productForm.sizes, size],
                              });
                            } else {
                              setProductForm({
                                ...productForm,
                                sizes: productForm.sizes.filter((s) => s !== size),
                              });
                            }
                          }}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Garment Portrait Image
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {productForm.imagePreview ? (
                  // Image Preview Card
                  <div className="relative border border-[#E5E1D8] bg-[#F5F2ED] rounded-xl p-3 flex items-center gap-4">
                    <img
                      src={productForm.imagePreview}
                      alt="Garment preview"
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover rounded-lg border border-neutral-200 shadow-sm"
                    />
                    <div className="grow min-w-0">
                      <p className="font-bold text-neutral-800 text-xs truncate">Image Loaded Successfully</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        {productForm.image 
                          ? "Local uploaded image" 
                          : "External image URL"}
                      </p>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="mt-2 text-red-500 hover:text-red-700 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete Image</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Elegant Upload Drag and Drop zone
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                      isDragging
                        ? 'border-[#F27D26] bg-[#F27D26]/5'
                        : 'border-[#E5E1D8] hover:border-[#F27D26] hover:bg-[#F5F2ED]/50'
                    }`}
                  >
                    <UploadCloud className="w-8 h-8 text-[#8C857B]" />
                    <div>
                      <p className="font-bold text-[#1A1A1A]">Click to choose file or drag & drop</p>
                      <p className="text-[10px] text-[#8C857B] mt-1">Supports PNG, JPEG, WEBP portrait photos</p>
                    </div>
                  </div>
                )}

                {/* Optional URL Toggle / Form Field */}
                <div className="pt-1">
                  {!showUrlInput && !productForm.image && (
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(true)}
                      className="text-neutral-500 hover:text-black font-bold uppercase tracking-widest text-[9px] flex items-center gap-1"
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>Or paste an image web URL instead</span>
                    </button>
                  )}

                  {(showUrlInput || productForm.image && !productForm.imagePreview.startsWith('data:image')) && (
                    <div className="mt-2 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                          Or Paste Web Image Link directly
                        </label>
                        {showUrlInput && (
                          <button
                            type="button"
                            onClick={() => setShowUrlInput(false)}
                            className="text-neutral-400 hover:text-black text-[9px] font-bold"
                          >
                            Hide URL Input
                          </button>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={
                          productForm.imagePreview.startsWith('data:image') 
                          ? '' : 
                          productForm.imagePreview
                        }
                        onChange={(e) => setProductForm({ 
                          ...productForm, 
                          imagePreview: e.target.value,
                          image: null
                        })}
                        className="w-full px-3.5 py-2 border border-[#E5E1D8] focus:border-[#F27D26] rounded-xl bg-[#F5F2ED] text-neutral-800 text-[11px]"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 font-mono">Product Brief Description</label>
                <textarea
                  rows={2}
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
                    checked={productForm.isNewProduct}
                    onChange={(e) => setProductForm({ ...productForm, isNewProduct: e.target.checked })}
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
