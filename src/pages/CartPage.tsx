import { useEffect, useState } from "react";
import BackButton from "../components/layouts/BackButton";
import EmptyList from "../components/wishlist/EmptyList";

import CartItemCard from "../components/cart/CartItemCard";
import CartSummary from "../components/cart/CartSummary";

import { getCart } from "../api/cartApi";
import "../styles/cart.css";

const Cart = () => {

    const userId = "USER_001";
    const [cart, setCart] = useState<any>({ items: [] });

    const fetchCart = async () => {
        const res = await getCart(userId);
        setCart(res.data);
    };

    useEffect(() => {

        const loadCart = async () => {
            const res = await getCart(userId);
            setCart(res.data);
        }
        
        loadCart();

    }, []);

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

                            <CartSummary items={cart.items} />

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Cart;