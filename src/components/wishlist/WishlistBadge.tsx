import { useWishlist } from "../../context/WishlistContext";

const WishlistBadge = () => {
  const { wishlist } = useWishlist();

  return (
    <span className="wishlist-badge">
      {wishlist.length}
    </span>
  );
};

export default WishlistBadge;