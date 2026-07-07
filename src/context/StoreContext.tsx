import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  type Product,
  type CartItem,
  type Order,
  type Coupon
} from '../types/types';
import { getAllProducts } from '../api/productApi';
import { getAllOrders } from '../api/orderApi';

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

  loadProducts: () => Promise<void>;
  loadOrders: () => Promise<void>;
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;

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

  const [cart, setCart] = useState<CartItem[]>([]);

  const [wishlist, setWishlist] = useState<Product[]>([]);

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [adminOrders, setAdminOrders] = useState<Order[]>([]);

  const [customers] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    totalPurchases: number;
    orderCount: number;
  }[]>(() => safeParse('aura_customers', []));

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      console.log('Products loaded successfully:', data);
      setAllProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  }

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();

      const formattedOrders = data.orders.map((order:any)=>({
        ...order,
        id: order.orderId,
        status: order.orderStatus
      }));

      console.log('Orders loaded successfully:', formattedOrders);

      setAdminOrders(formattedOrders);

    } catch(error){
      console.error(error);
    }
  }

  // ================= LOCAL STORAGE SYNC =================

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('aura_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    localStorage.setItem('aura_customers', JSON.stringify(customers));
  }, [customers]);

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
        setAllProducts,
        loadProducts,

        adminOrders,
        loadOrders,
        
        customers,
        coupons,

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