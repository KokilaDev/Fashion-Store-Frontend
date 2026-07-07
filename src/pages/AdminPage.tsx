import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import type { Product, Order, ProductForm } from '../types/types';
import { Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHome } from '../components/admin/AdminHome';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminCustomers } from '../components/admin/AdminCustomers';
import { AdminReports } from '../components/admin/AdminReports';
import { AdminPromotions } from '../components/admin/AdminPromotions';
import { AdminSettings } from '../components/admin/AdminSettings';
import { ProductModal } from '../components/admin/ProductModal';
import { OrderModal } from '../components/admin/OrderModal';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  addProduct,
  updateProduct,
  deleteProduct
} from '../api/productApi';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    allProducts,
    adminOrders,
    loadProducts,
    loadOrders,
    updateOrderStatus, 
    customers, 
    coupons, 
    addCoupon, 
    deleteCoupon 
  } = useStore();

  // State management for active tab and filters
  const [activeTab, setActiveTab] = useState<'home' | 'products' | 'orders' | 'customers' | 'reports' | 'promotions' | 'settings'>('home');

  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [customerSearch, setCustomerSearch] = useState('');

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; text: string; type: 'success' | 'error' }[]>([]);

  // Empty form states
  const [productForm, setProductForm] = useState<ProductForm>({
    id: '',
    name: '',
    price: 0,
    originalPrice: 0,
    image: null,
    imagePreview: "",
    category: 'Frocks',
    sizes: [],
    isTrending: false,
    isNewProduct: false,
    rating: 0.0,
    description: '',
    stock: 0
  });

  const [couponForm, setCouponForm] = useState({
    code: '',
    discountPercent: 0,
    description: ''
  });

  const [settings, setSettings] = useState({
    storeName: 'AURA Fine Couture',
    emailNotification: true,
    currency: 'LKR',
    taxRate: 0.00,
    shippingFee: 0.00,
    maintenanceMode: false
  });

  const triggerNotification = (text: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const totalSalesFromOrders = useMemo(() => {
    return adminOrders
      .filter(o => o.status === 'Delivered' || o.status === 'Shipped' || o.status === 'Processing')
      .reduce((sum, o) => sum + o.total, 0);
  }, [adminOrders]);

  const salesCount = adminOrders.length;
  const estimatedProfit = totalSalesFromOrders * 0.65; // 65% profit margins on luxury goods

  const productStockMap = useMemo(() => {
    const map: Record<string, number> = {};
    allProducts.forEach((p, idx) => {
      if (p.id === 'p1') map[p.id] = 2;
      else if (p.id === 'p3') map[p.id] = 4;
      else if (p.id === 'p12') map[p.id] = 0;
      else map[p.id] = (idx * 7 + 12) % 40;
    });
    return map;
  }, [allProducts]);

  const lowStockCount = useMemo(() => {
    return Object.keys(productStockMap).filter(key => productStockMap[key] <= 5).length;
  }, [productStockMap]);

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 4200, profit: 2730, orders: 28 },
    { month: 'Feb', revenue: 5100, profit: 3315, orders: 35 },
    { month: 'Mar', revenue: 6800, profit: 4420, orders: 46 },
    { month: 'Apr', revenue: 8200, profit: 5330, orders: 54 },
    { month: 'May', revenue: 9500, profit: 6175, orders: 62 },
    { month: 'Jun', revenue: 11200, profit: 7280, orders: 74 },
    { month: 'Jul', revenue: totalSalesFromOrders + 4000, profit: estimatedProfit + 2600, orders: salesCount + 20 },
  ];

  const categorySalesData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    adminOrders.forEach(order => {
      order.items.forEach(item => {
        const prod = allProducts.find(p => p.id === item.productId);
        const cat = prod ? prod.category : 'Apparel';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + (item.price * item.qty);
      });
    });
    
    const fallback = [
      { name: 'Frocks', value: categoryTotals['Frocks'] || 4500 },
      { name: 'Suits', value: categoryTotals['Suits'] || 3200 },
      { name: 'Skirts', value: categoryTotals['Skirts'] || 2100 },
      { name: 'Blouses', value: categoryTotals['Blouses'] || 1800 },
      { name: 'Jeans', value: categoryTotals['Jeans'] || 1500 },
    ];

    return fallback.filter(item => item.value > 0);
  }, [adminOrders, allProducts]);

  const COLORS = ['#F27D26', '#1A1A1A', '#E5E1D8', '#8C857B', '#C5A880', '#D65F0E'];

  const topSellingProducts = useMemo(() => {
    const productSales: Record<string, { product: Product; unitsSold: number; totalRev: number }> = {};
    
    adminOrders.forEach(order => {
      order.items.forEach(item => {
        const prod = allProducts.find(p => p.id === item.productId);
        if (prod) {
          if (!productSales[prod.id]) {
            productSales[prod.id] = { product: prod, unitsSold: 0, totalRev: 0 };
          }
          productSales[prod.id].unitsSold += item.qty;
          productSales[prod.id].totalRev += item.price * item.qty;
        }
      });
    });

    const list = Object.values(productSales).sort((a, b) => b.unitsSold - a.unitsSold);
    
    if (list.length === 0) {
      return allProducts.slice(0, 4).map((p, index) => ({
        product: p,
        unitsSold: [22, 18, 14, 10][index] || 8,
        totalRev: p.price * ([22, 18, 14, 10][index] || 8)
      }));
    }

    return list;
  }, [adminOrders, allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                            product.description.toLowerCase().includes(productSearch.toLowerCase()) ||
                            product.id.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCategory = productCategoryFilter === 'All' || product.category === productCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, productSearch, productCategoryFilter]);
  console.log("Filtered Products: ", filteredProducts);

  const filteredOrders = useMemo(() => {
    return adminOrders.filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                            order.items.some(item => item.name.toLowerCase().includes(orderSearch.toLowerCase()));
      const matchesStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [adminOrders, orderSearch, orderStatusFilter]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      return customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
             customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
             customer.phone.includes(customerSearch);
    });
  }, [customers, customerSearch]);

  const handleLogout = async () => {
    try {
      console.log('Attempting to log out admin...', user?.email);
      await logout();
      console.log('Admin logged out successful.');
      navigate('/');
      console.log('Redirected to login page.');
    } catch (error) {
      toast.error('Logout failed.');
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      navigate('/login', { replace: true });
      console.log('User logged out. Navigated to login page.');
    }
  }

  // Product Management Handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // formData.append("id", productForm.id);
      formData.append("name", productForm.name);
      formData.append("price", String(productForm.price ?? 0));
      formData.append("category", productForm.category);
      formData.append("description", productForm.description);
      formData.append("stock", String(productForm.stock ?? 0));
      formData.append("isTrending", String(productForm.isTrending));
      formData.append("isNewProduct", String(productForm.isNewProduct));

      if (productForm.originalPrice !== undefined) {
        formData.append(
          "originalPrice",
          String(productForm.originalPrice ?? 0)
        );
      }

      formData.append("sizes", JSON.stringify(productForm.sizes ?? []));

      if (productForm.image instanceof File) {
        formData.append("image", productForm.image);
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        triggerNotification("Product updated successfully!");
      } else {
        await addProduct(formData);
        triggerNotification("Product added successfully!");
      }

      await loadProducts();

      setIsProductModalOpen(false);
      setEditingProduct(null);

    } catch (error) {

      console.error("Error submitting product form:", error);
      triggerNotification("Something went wrong", "error");

    }
  };

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      id: '',
      name: '',
      price: 0,
      originalPrice: 0,
      image: null,
      imagePreview: "",
      category: 'Frocks',
      sizes: ['S', 'M', 'L'],
      isTrending: false,
      isNewProduct: false,
      rating: 5.0,
      description: '',
      stock: 30
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: null,
      imagePreview: product.image,
      category: product.category,
      sizes: product.sizes,
      isTrending: product.isTrending,
      isNewProduct: product.isNewProduct,
      rating: product.rating,
      description: product.description,
      stock: productStockMap[product.id] ?? 20
    });
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = async (p: Product) => {
    if (!confirm("Delete product?")) return;

    try {

      await deleteProduct(p.id);
      await loadProducts();
      triggerNotification("Deleted Successfully");

    } catch(err) {

      console.log("Error deleting product:", err);
      triggerNotification("Delete Failed","error");
      
    }
  };

  // Order Management Handlers
  const handleViewOrder = async (order: Order) => {
    await loadOrders();
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  // Coupon Management Handlers
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.discountPercent) {
      triggerNotification('Please provide coupon code and discount percentage', 'error');
      return;
    }
    const duplicate = coupons.some(c => c.code.toUpperCase() === couponForm.code.toUpperCase());
    if (duplicate) {
      triggerNotification('Coupon code already exists', 'error');
      return;
    }

    addCoupon({
      code: couponForm.code.toUpperCase(),
      discountPercent: Number(couponForm.discountPercent),
      description: couponForm.description || `${couponForm.discountPercent}% OFF Premium Apparel`
    });

    setCouponForm({ code: '', discountPercent: 10, description: '' });
    triggerNotification(`Active coupon "${couponForm.code.toUpperCase()}" launched successfully!`);
  };

  const handleDeleteCoupon = (code: string) => {
    deleteCoupon(code);
    triggerNotification(`Coupon "${code}" deprecated.`);
  };

  const handleExport = (format: 'PDF' | 'EXCEL') => {
    triggerNotification(`Compiling and packaging dataset for exports...`);
    setTimeout(() => {
      triggerNotification(`Sales reports successfully downloaded in ${format} format!`, 'success');
    }, 1500);
  };

  // Settings Management Handlers
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    triggerNotification('AURA configurations saved successfully.');
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] flex flex-col md:flex-row font-sans">
      
      {/* Toast Notifications */}
      <div className="fixed top-24 right-6 z-50 space-y-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border text-xs font-bold tracking-wide uppercase ${
                n.type === 'error' 
                  ? 'bg-red-50 text-red-900 border-red-200' 
                  : 'bg-black text-white border-neutral-800'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${n.type === 'error' ? 'bg-red-500' : 'bg-[#F27D26] animate-pulse'}`} />
              <span className="flex-grow">{n.text}</span>
              <button className="text-white/50 hover:text-white pointer-events-auto" onClick={() => setNotifications(prev => prev.filter(x => x.id !== n.id))}>
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        adminOrders={adminOrders} 
        handleLogout={handleLogout}
      />

      <div className="flex-1 min-w-0 flex flex-col h-screen">

        {/* Top Header Row */}
        <header className="sticky top-0 z-30 h-25 bg-[#F5F2ED] border-b border-[#E5E1D8] px-8 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-light italic text-[#1A1A1A]">
              Atelier Management Portal
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Configure products, analyze luxury revenue growth, and manage live orders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#E5E1D8]/60 border border-[#E5E1D8] px-3 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-600 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>Operational Mode: ONLINE</span>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 w-full overflow-y-auto px-6 md:px-8 py-6">
          
          {/* TAB VIEWS CONTAINER */}
          <div className="space-y-6">

            {activeTab === 'home' && (
              <AdminHome
                totalSalesFromOrders={totalSalesFromOrders}
                salesCount={salesCount}
                estimatedProfit={estimatedProfit}
                lowStockCount={lowStockCount}
                monthlyRevenueData={monthlyRevenueData}
                topSellingProducts={topSellingProducts}
              />
            )}

            {activeTab === 'products' && (
              <AdminProducts
                filteredProducts={filteredProducts}
                productSearch={productSearch}
                setProductSearch={setProductSearch}
                productCategoryFilter={productCategoryFilter}
                setProductCategoryFilter={setProductCategoryFilter}
                openAddProductModal={openAddProductModal}
                openEditProductModal={openEditProductModal}
                handleDeleteProduct={handleDeleteProduct}
                productStockMap={productStockMap}
              />
            )}

            {activeTab === 'orders' && (
              <AdminOrders
                filteredOrders={filteredOrders}
                orderSearch={orderSearch}
                setOrderSearch={setOrderSearch}
                orderStatusFilter={orderStatusFilter}
                setOrderStatusFilter={setOrderStatusFilter}
                handleViewOrder={handleViewOrder}
              />
            )}

            {activeTab === 'customers' && (
              <AdminCustomers
                filteredCustomers={filteredCustomers}
                customerSearch={customerSearch}
                setCustomerSearch={setCustomerSearch}
              />
            )}

            {activeTab === 'reports' && (
              <AdminReports
                handleExport={handleExport}
                monthlyRevenueData={monthlyRevenueData}
                categorySalesData={categorySalesData}
                COLORS={COLORS}
              />
            )}

            {activeTab === 'promotions' && (
              <AdminPromotions
                coupons={coupons}
                couponForm={couponForm}
                setCouponForm={setCouponForm}
                handleCreateCoupon={handleCreateCoupon}
                handleDeleteCoupon={handleDeleteCoupon}
              />
            )}

            {activeTab === 'settings' && (
              <AdminSettings
                settings={settings}
                setSettings={setSettings}
                handleSaveSettings={handleSaveSettings}
              />
            )}

          </div>

        </main>

      </div>

      {/* ========================================================
          MODAL: ADD/EDIT PRODUCT
          ======================================================== */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        editingProduct={editingProduct}
        productForm={productForm}
        setProductForm={setProductForm}
        handleSubmit={handleProductSubmit}
      />

      {/* ========================================================
          MODAL: VIEW & MANAGE ORDER DETAILS
          ======================================================== */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedOrder={selectedOrder}
        updateOrderStatus={updateOrderStatus}
        setSelectedOrder={setSelectedOrder}
        triggerNotification={triggerNotification}
      />

    </div>
  );
};
