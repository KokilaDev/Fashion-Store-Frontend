import BackButton from "../components/layouts/BackButton";
import EmptyList from "../components/wishlist/EmptyList";
import WishlistCard from "../components/wishlist/WishlistCard";
import { useWishlist } from "../context/WishlistContext";
import "../styles/wishlist.css"

const WishList = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="box-container">
      <div className="wishlist-container">

        <div className="wishlist-header">

            <BackButton />

            <h1 className="wishlist-title">
                My Wishlist
            </h1>

        </div>

        <div className={`wishlist-content ${
            wishlist.length === 0
              ? "empty-content"
              : "card-content"
          }`}
        >
          {wishlist.length === 0 ? (
            <EmptyList />
          ) : (
            <WishlistCard />
          )}
        </div>

      </div>

    </div>
  );
};

export default WishList;