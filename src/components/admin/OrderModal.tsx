import React from 'react';
import { X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Order } from '../../types/types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder: Order | null;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  setSelectedOrder: (order: Order | null) => void;
  triggerNotification: (text: string, type?: 'success' | 'error') => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedOrder,
  updateOrderStatus,
  setSelectedOrder,
  triggerNotification
}) => {
  return (
    <AnimatePresence>
      {isOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />

          {/* Modal Body */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            className="relative w-full max-w-lg bg-white border border-[#E5E1D8] rounded-2xl shadow-2xl p-6 text-xs z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black p-1 bg-neutral-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-[#E5E1D8] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base font-bold text-neutral-900">
                  Manage Order {selectedOrder.id}
                </h2>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {selectedOrder.status}
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium">Placed on: {selectedOrder.date}</p>
            </div>

            {/* Items list */}
            <div className="space-y-3 mb-5 max-h-[200px] overflow-y-auto pr-1">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Order Items</h4>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-neutral-50 p-2.5 rounded-xl border border-[#E5E1D8]/40">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-10 h-12 object-cover rounded bg-neutral-200"
                  />
                  <div className="flex-grow">
                    <h5 className="font-bold text-neutral-800">{item.name}</h5>
                    <p className="text-[10px] text-neutral-400">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-neutral-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center py-3 border-t border-neutral-100 font-bold text-[#1A1A1A] text-sm mb-4">
              <span>Grand Total:</span>
              <span>${selectedOrder.total.toFixed(2)}</span>
            </div>

            {/* Shipping Address */}
            <div className="bg-[#F5F2ED] border border-[#E5E1D8] p-3 rounded-xl mb-5 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>Shipping Address</span>
              </div>
              <p className="text-[11px] text-neutral-800 leading-relaxed font-medium pl-5">
                {selectedOrder.shippingAddress || `${selectedOrder.id} - Premium Courier Delivery`}
              </p>
            </div>

            {/* Status Actions */}
            <div className="space-y-2.5 border-t border-neutral-100 pt-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Transitions & Dispatch Controls</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'Processing');
                    setSelectedOrder({ ...selectedOrder, status: 'Processing' });
                    triggerNotification(`Order ${selectedOrder.id} state set to Processing.`);
                  }}
                  className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all ${
                    selectedOrder.status === 'Processing' 
                      ? 'bg-amber-500 border-amber-600 text-white shadow-sm'
                      : 'border-[#E5E1D8] bg-[#F5F2ED] hover:bg-[#EBE7DF] text-neutral-700'
                  }`}
                >
                  Set Processing
                </button>
                <button
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'Shipped');
                    setSelectedOrder({ ...selectedOrder, status: 'Shipped' });
                    triggerNotification(`Order ${selectedOrder.id} dispatched via courier!`);
                  }}
                  className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all ${
                    selectedOrder.status === 'Shipped' 
                      ? 'bg-blue-600 border-blue-700 text-white shadow-sm'
                      : 'border-[#E5E1D8] bg-[#F5F2ED] hover:bg-[#EBE7DF] text-neutral-700'
                  }`}
                >
                  Ship Order
                </button>
                <button
                  onClick={() => {
                    updateOrderStatus(selectedOrder.id, 'Delivered');
                    setSelectedOrder({ ...selectedOrder, status: 'Delivered' });
                    triggerNotification(`Order ${selectedOrder.id} confirmed delivered to client.`);
                  }}
                  className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all ${
                    selectedOrder.status === 'Delivered' 
                      ? 'bg-green-600 border-green-700 text-white shadow-sm'
                      : 'border-[#E5E1D8] bg-[#F5F2ED] hover:bg-[#EBE7DF] text-neutral-700'
                  }`}
                >
                  Confirm Delivery
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
