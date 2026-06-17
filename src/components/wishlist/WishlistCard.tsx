import WishlistItem from "./WishlistItem";
import { useWishlist } from "../../context/WishlistContext";
// import EmptyList from "./EmptyList";

const WishlistCard = () => {
  const { wishlist, removeFromWishlist, } = useWishlist();

  // if (wishlist.length === 0) {
  //   return <EmptyList />;
  // }

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