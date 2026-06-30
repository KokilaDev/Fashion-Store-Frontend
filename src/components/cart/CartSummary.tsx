import { useNavigate } from "react-router-dom";
import { clearCart } from "../../api/cartApi";

const CartSummary = ({ items, userId }: any) => {

    const navigate = useNavigate();

    const total = items.reduce(
        (acc: number, item: any) => acc + item.price * item.qty,
        0
    );

    console.log("CartSummary userId:", userId);

    const handleCheckout = async () => {
        try {    
            navigate("/checkout", {
                state: {
                    userId,
                    items,
                    total,
                    orderDate: new Date()
                }
            });
            await clearCart(userId);
        } catch (error) {
            console.error("Error navigating to checkout:", error);
        }
    }

    return (
        <div className="cart-summary">
            <h2>Summary</h2>
            <p>Total: Rs. {total}</p>

            <button 
                className="checkout-btn"
                onClick={handleCheckout}>
                Checkout
            </button>
        </div>
    );
};

export default CartSummary;