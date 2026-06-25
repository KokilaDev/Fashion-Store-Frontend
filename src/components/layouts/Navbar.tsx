import { Link } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiPhone,
} from "react-icons/fi";
import "../../styles/home.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="logo">
          <Link to="/">
            <h2>AURA</h2>
          </Link>
        </div>

        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        <div className="nav-icons">

          <div className="user-menu">
            <Link to="/profile">
              <FiUser />
            </Link>

            <div className="user-dropdown">
              <div className="user-auth">
                <Link to="/login">Login</Link>
                <span className="auth-separator"> / </span>
                <Link to="/register">Register</Link>
              </div>
              <Link to="/profile">My Profile</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/login">Logout</Link>
            </div>
          </div>

          <Link to="/wishlist">
            <FiHeart />
            <span className="wishlist-count">0</span>
          </Link>

          <Link to="/cart">
            <FiShoppingCart />
            <span className="cart-count">0</span>
          </Link>

          <Link to="">
            <FiPhone />
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;