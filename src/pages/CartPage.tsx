import { useEffect, useState } from "react";
import BackButton from "../components/layouts/BackButton";
import EmptyList from "../components/layouts/EmptyList";

import CartItemCard from "../components/cart/CartItemCard";
import CartSummary from "../components/cart/CartSummary";

import { getCart } from "../api/cartApi";
import "../styles/cart.css";
import { useAuth } from "../hooks/useAuth";

const Cart = () => {

    const { user } = useAuth();
    const userId = user?._id;
    
    const [cart, setCart] = useState<any>({ items: [] });

    const fetchCart = async () => {
        const res = await getCart(userId);
        setCart(res.data);
    };

    console.log("Cart User:", user);
    console.log("Cart User ID:", user?._id);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const loadCart = async () => {
            const res = await getCart(userId);
            setCart(res.data);
        }
        
        loadCart();

    }, [userId]);

    const isEmpty = !cart.items || cart.items.length === 0;

    return (
        <div className="box-container">
            <div className="cart-container">

                <div className="cart-header">
                    <BackButton />
                    <h1>My Cart</h1>
                </div>

                <div className={`cart-content ${
                    isEmpty
                        ? "empty-content"
                        : "card-content"
                }`}>
                    {isEmpty ? (
                        <EmptyList isCart={true} />
                    ) : (
                        <div className="cart-layout">

                            <div className="cart-items">
                                {cart.items.map((item: any) => (
                                    <CartItemCard
                                        key={item.productId}
                                        item={item}
                                        refresh={fetchCart}
                                        userId={userId}
                                    />
                                ))}
                            </div>

                            <div className="cart-divider"></div>

                            <CartSummary 
                                items={cart.items} 
                                userId={userId}
                            />

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Cart;