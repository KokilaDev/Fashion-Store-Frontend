import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  type Product,
  type CartItem,
  type Order,
  MOCK_PRODUCTS,
  type Coupon
} from '../types/types';

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  searchQuery: string;
  selectedCategory: string;
  allProducts: Product[];

  adminOrders: Order[];
  customers: {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalPurchases: number;
    orderCount: number;
  }[];

  coupons: Coupon[];

  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;

  toggleWishlist: (product: Product) => boolean;
  isInWishlist: (productId: string) => boolean;

  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const safeParse = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const [cart, setCart] = useState<CartItem[]>(() =>
    safeParse('aura_cart', [])
  );

  const [wishlist, setWishlist] = useState<Product[]>(() =>
    safeParse('aura_wishlist', [])
  );

  const [allProducts, setAllProducts] = useState<Product[]>(() =>
    safeParse('aura_products', MOCK_PRODUCTS)
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    safeParse('aura_coupons', [
      { code: "AURA15", discountPercent: 15, description: "15% OFF on Summer Collection" },
      { code: "ELEGANCE20", discountPercent: 20, description: "20% OFF on Party Wear and Frocks" },
      { code: "FIRSTBUY10", discountPercent: 10, description: "10% OFF on your very first order" },
      { code: "AURACLUB25", discountPercent: 25, description: "Exclusive 25% VIP Lounge Voucher" }
    ])
  );

  const [adminOrders, setAdminOrders] = useState<Order[]>(() =>
    safeParse('aura_admin_orders', [])
  );

  const [customers] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    totalPurchases: number;
    orderCount: number;
  }[]>(() => safeParse('aura_customers', []));

  // ================= LOCAL STORAGE SYNC =================

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_products', JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    localStorage.setItem('aura_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('aura_admin_orders', JSON.stringify(adminOrders));
  }, [adminOrders]);

  useEffect(() => {
    localStorage.setItem('aura_customers', JSON.stringify(customers));
  }, [customers]);

  // ================= PRODUCT OPS =================

  const addProduct = (product: Product) => {
    setAllProducts(prev => [product, ...prev]);
  };

  const editProduct = (product: Product) => {
    setAllProducts(prev =>
      prev.map(p => (p.id === product.id ? product : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setAllProducts(prev => prev.filter(p => p.id !== productId));
  };

  // ================= ORDERS =================

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setAdminOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // ================= COUPONS =================

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  // ================= CART =================

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart(prev => {
      const index = prev.findIndex(
        item => item.product.id === product.id && item.size === size
      );

      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        return updated;
      }

      return [...prev, { product, size, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const updateCartQuantity = (
    productId: string,
    size: string,
    quantity: number
  ) => {
    if (quantity <= 0) return removeFromCart(productId, size);

    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // ================= WISHLIST =================

  const toggleWishlist = (product: Product): boolean => {
    let added = false;

    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);

      if (exists) {
        added = false;
        return prev.filter(p => p.id !== product.id);
      }

      added = true;
      return [...prev, product];
    });

    return added;
  };

  const isInWishlist = (productId: string) =>
    wishlist.some(p => p.id === productId);

  // ================= PROVIDER =================

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        searchQuery,
        selectedCategory,
        allProducts,

        adminOrders,
        customers,
        coupons,

        addProduct,
        editProduct,
        deleteProduct,

        updateOrderStatus,

        addCoupon,
        deleteCoupon,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        toggleWishlist,
        isInWishlist,

        setSearchQuery,
        setSelectedCategory
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};