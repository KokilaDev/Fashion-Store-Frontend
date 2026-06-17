import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  addToWishlistApi,
  getWishlistApi,
  removeFromWishlistApi,
} from "../api/wishlistApi";

import { useAuth } from "../hooks/useAuth";

type WishlistContextType = {
  wishlist: any[];
  addToWishlist: (product: any) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;

      const res = await getWishlistApi(user.id);
      setWishlist(res.data);
    };

    load();
  }, [user]);

  const addToWishlist = async (product: any) => {
    if (!user?.id) return;

    await addToWishlistApi(user.id, product._id);

    const res = await getWishlistApi(user.id);
    console.log("Added to Wishlist:", res.data);
    setWishlist(res.data);
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user?.id) return;

    await removeFromWishlistApi(user.id, productId);

    const res = await getWishlistApi(user.id);
    console.log("Removed from Wishlist:", res.data);
    setWishlist(res.data);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside provider");
  return context;
};