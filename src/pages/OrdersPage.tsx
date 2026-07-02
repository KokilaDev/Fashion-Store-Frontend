import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, ChevronRight, Package, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getOrderByUserApi } from '../api/orderApi';
import type { Order } from '../types/types';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate('/login?mode=login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);

        // IMPORTANT: ensure user has id or _id
        const userId = (user as any).id || (user as any)._id;

        const res = await getOrderByUserApi(userId);

        setOrders(res || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  // ✅ LOADING UI FIX
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
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-neutral-400 font-bold">TOTAL PAID</p>
                    <p className="font-mono font-bold">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase text-neutral-400 font-bold">ORDER ID</p>
                    <p className="font-mono">{order.id}</p>
                  </div>

                </div>

                <span className="text-[10px] px-3 py-1 rounded-full font-bold uppercase bg-neutral-100">
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="p-4 sm:p-6 divide-y divide-neutral-100">

                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 py-4 items-center"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded"
                    />

                    <div className="flex-grow">
                      <h4 className="font-semibold text-sm">
                        {item.name}
                      </h4>

                      <div className="text-[10px] text-neutral-400 mt-1">
                        SIZE: {item.size} | QTY: {item.quantity}
                      </div>
                    </div>

                    <div className="font-bold font-mono">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};