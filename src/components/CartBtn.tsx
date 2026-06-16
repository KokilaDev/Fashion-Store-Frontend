import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/product.css"

const CartBtn = () => {
    const navigate = useNavigate();

    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) => total + (item.qty || 0),
        0
    );

    return (
        <div className="cart-btn">
            <button
                className="cart-badge-trigger-btn"
                onClick={() => navigate("/cart")}
            >
                <i className="fa-solid fa-cart-shopping"></i>

                <span className="cart-count-badge">
                    {cartCount}
                </span>
            </button>
        </div>
    );
};

export default CartBtn;