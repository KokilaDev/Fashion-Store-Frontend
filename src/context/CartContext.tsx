import { createContext, useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getCart } from "../api/cartApi";

type CartContextType = {
    cartItems: Product[];
    refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const userId = "USER_001";

    const refreshCart = async () => {
        try {
            const res = await getCart(userId);
            console.log("Cart data", res.data);
            setCartItems(res.data.items || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await getCart(userId);
                setCartItems(res.data.items || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }

        loadCart();
    }, [userId]);

    useEffect(() => {
        console.log("Cart items updated", cartItems);
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;