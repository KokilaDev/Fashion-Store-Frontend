import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../types/Product";

type CartContextType = {
    cartItems: Product[];
    addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const exists = prev.find(
                (item) => item.id === product.id
            );

            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              qty: (item.qty || 1) + 1,
                          }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    qty: 1,
                },
            ];
        });
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
};