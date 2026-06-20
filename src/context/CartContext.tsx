import { createContext, useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getCart } from "../api/cartApi";
import { useAuth } from "../hooks/useAuth";

type CartContextType = {
    cartItems: Product[];
    setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
    refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const { user } = useAuth();
    const userId = user?._id || user?.id;

    const refreshCart = async () => {
        try {
            console.log("Refreshing cart...");

            if (!userId) {
                console.log("No user id");
                return;
            }

            const res = await getCart(userId);

            console.log("Cart response:", res.data);

            setCartItems(res.data.items || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }

    useEffect(() => {
        console.log("USER CHANGED:", user);
        console.log("USER ID:", userId);
    }, [user]);

    useEffect(() => {
        if (!user?._id && !user?.id) return;

        console.log("FETCH CART EFFECT");
        console.log("USER ID:", userId);

        const fetchCart = async () => {
            try {
                const res = await getCart(userId);
                setCartItems(res.data.items || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCart();
    }, [user?._id, user?.id]);

    useEffect(() => {
        console.log("Cart items updated", cartItems);
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;