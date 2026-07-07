import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, ChevronRight, Package, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getMyOrders } from '../api/orderApi';
import type { Order } from '../types/types';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  console.log("CURRENT USER:", user);
  console.log("isLoggedIn:", user?.isLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate('/login?mode=login');
      console.log("User not logged in.");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const userId = user.id;

        const res = await getMyOrders(userId);

        console.log("ORDERS RESPONSE:", res);

        setOrders(res.orders || []);

      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="text-center py-20 text-neutral-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div id="orders-history-page" className="max-w-4xl mx-auto px-4 py-12 min-h-[75vh]">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-6">
        <Link to="/" className="hover:text-charcoal-900 transition-colors">AURA</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/profile" className="hover:text-charcoal-900 transition-colors">MY PROFILE</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal-900 font-bold">MY ORDERS</span>
      </div>

      {/* Header */}
      <div className="border-b border-neutral-200 pb-5 mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-charcoal-900 flex items-center gap-2.5">
          <FileText className="w-8 h-8 text-neutral-800" />
          <span>My Order History</span>
        </h1>
        <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider mt-1">
          Track bespoke atelier delivery
        </p>
      </div>

      {/* Empty state */}
      {orders.length === 0 ? (
        <div className="text-center py-24 bg-white border border-neutral-100 rounded-2xl max-w-lg mx-auto shadow-sm">
          <Package className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
          <h2 className="font-serif text-lg font-bold text-neutral-800">
            No Orders Placed Yet
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto leading-relaxed">
            You have not placed any custom couture orders.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal-900 text-white font-bold text-[10px] uppercase rounded"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden"
            >

              {/* Order Header */}
              <div className="bg-neutral-50/70 border-b border-neutral-100 p-4 sm:p-6 flex justify-between">

                <div className="flex gap-6 flex-wrap">

                  <div>
                    <p className="text-[9px] uppercase text-neutral-400 font-bold">ORDER PLACED</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span>{order.createdAt}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-neutral-400 font-bold">TOTAL PAID</p>
                    <p className="font-mono font-bold">
                      Rs. {(order.total).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-neutral-400 font-bold">ORDER ID</p>
                    <p className="font-mono">{order.orderId}</p>
                  </div>

                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'Processing'
                      ? 'bg-amber-50 text-amber-800 border border-amber-150 animate-pulse'
                      : order.status === 'Delivered'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-150'
                      : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items list */}
              <div className="divide-y divide-neutral-100 p-4 sm:p-6">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center">
                    {/* Item Image */}
                    <div className="w-16 aspect-[3/4] rounded bg-neutral-50 overflow-hidden flex-shrink-0">
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Description Details */}
                    <div className="flex-grow">
                      <h4 className="text-xs sm:text-sm font-semibold text-charcoal-900 line-clamp-1">{item.name}</h4>
                      <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-bold tracking-wider mt-1.5">
                        <span className="bg-neutral-100 px-1.5 py-0.5 rounded uppercase">SIZE: {item.size}</span>
                        <span>QUANTITY: {item.qty}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xs sm:text-sm font-bold text-charcoal-900 font-mono">${(item.price * item.qty).toFixed(2)}</p>
                      <p className="text-[9px] text-neutral-400 italic">Atelier tailored</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address Row */}
              {order.shipping && (
                <div className="px-4 sm:px-6 py-3 bg-neutral-50/30 border-t border-neutral-100 flex items-start gap-2 text-[11px] text-neutral-600">
                  <MapPin className="w-3.5 h-3.5 text-[#F27D26] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-500 mr-1.5 uppercase text-[9px] tracking-wider">Shipping to:</span>
                    <span className="font-medium text-neutral-700">{order.shipping.street}</span>
                  </div>
                </div>
              )}

              {/* Order Footer Progress bar description */}
              <div className="bg-neutral-50/20 border-t border-neutral-100 p-4 text-[10px] text-neutral-500 font-medium flex justify-between items-center">
                <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider text-neutral-400">
                  <Package className="w-4 h-4 text-neutral-400" />
                  <span>Tracking: IN TRANSIT via DHL EXPRESS</span>
                </span>
                <span className="text-neutral-400 font-mono font-bold">Standard Courier Deliv.</span>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};