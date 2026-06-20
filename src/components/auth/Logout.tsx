import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { setUser } = useAuth();
    const { refreshCart, setCartItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");

        setUser(null);

        refreshCart();

        setCartItems([]);

        navigate("/");
    };

    return (
        <button className="logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
        </button>
    );
};

export default Logout;