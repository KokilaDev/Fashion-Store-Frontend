import WishlistItem from "./WishlistItem";
import { useWishlist } from "../../hooks/useWishlist";

const WishlistCard = () => {
  const { wishlist, removeFromWishlist, } = useWishlist();

  return (
    <div className="wishlist-card">
      {wishlist.map((item) => (
        <WishlistItem
          key={item._id}
          product={item}
          onRemove={() => 
            removeFromWishlist(item.productId._id)
          } 
          onAddToCart={() => {}}        
        />
      ))}
    </div>
  );
};

export default WishlistCard;