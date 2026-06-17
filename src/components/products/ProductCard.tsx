import type { Product } from "../../types/Product";
import { useWishlist } from "../../hooks/useWishlist";
import AddToWishlistButton from "../wishlist/AddToWishlistButton";
import AddToCartBtn from "../layouts/AddToCartBtn";
import "../../styles/product.css";

type Props = {
  product: Product;
  onAddToCart: () => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isFavorite = wishlist.some(
    (item: any) => item.productId?._id === product._id
  );

  const toggleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

//   console.log("Wishlist:", wishlist);
//   console.log("Product:", product._id);

  return (
    <div className="product-card">
      <div className="more-options-container">
        <AddToWishlistButton
          isFavorite={isFavorite}
          onClick={toggleWishlist}
        />
      </div>

      <img
        src={
          product.image
            ? `http://localhost:5000/uploads/${product.image}`
            : "/placeholder.png"
        }
        alt={product.name}
      />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p>
          {product.description
            .split(" ")
            .slice(0, 15)
            .join(" ")}...
        </p>

        <h4>Rs. {product.price}</h4>

        <AddToCartBtn onClick={onAddToCart} />
      </div>
    </div>
  );
};

export default ProductCard;