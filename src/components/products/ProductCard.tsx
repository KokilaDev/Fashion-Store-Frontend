import type { Product } from "../../types/Product";
import { useWishlist } from "../../hooks/useWishlist";
import AddToWishlistButton from "../wishlist/AddToWishlistButton";
import AddToCartBtn from "../layouts/AddToCartBtn";
import "../../styles/product.css";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

type Props = {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { user } = useAuth();

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

  const userId = user?._id || user?.id;

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
          typeof product.image === "string" && product.image.startsWith("http")
            ? product.image
            : typeof product.image === "string"
            ? `http://localhost:5000/uploads/${product.image}`
            : product.image
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

        <div className="available-sizes">
          {Object.entries(product.sizes || {})
            .filter(([, qty]) => Number(qty) > 0)
            .map(([size]) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
        </div>

        <h4>Rs. {product.price}</h4>

        <div className="add-to-cart-btn">
          <AddToCartBtn 
            onClick={() => onAddToCart(product, selectedSize)}
            disabled={!userId || !selectedSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;