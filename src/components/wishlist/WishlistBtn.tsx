import { Link } from "react-router-dom";
import WishlistBadge from "./WishlistBadge";

const WishlistBtn = () => {
  return (
    <Link to="/wishlist" className="wishlist-btn">
      <i className="bi bi-heart"></i>

      <WishlistBadge />
    </Link>
  );
};

export default WishlistBtn;