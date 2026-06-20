import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "../../styles/product.css"

const CartBtn = () => {
    const navigate = useNavigate();

    const { cartItems } = useCart();

    console.log("Cart Items", cartItems);

    const cartCount = cartItems.reduce(
        (total, item) => total + (item.qty || 0),
        0
    );

    const handleClick = () => {
        console.log("CartBtn clicked");
        navigate("/cart");
    };

    return (
        <div className="cart-btn">
            <button
                className="cart-badge-trigger-btn"
                onClick={handleClick}
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