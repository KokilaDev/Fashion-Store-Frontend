import { Link } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
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

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/new-arrivals">New Arrivals</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="nav-icons">

          <Link to="/wishlist">
            <FiHeart />
          </Link>

          <Link to="/products">
            <FiShoppingBag />
          </Link>

          <Link to="/profile">
            <FiUser />
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;