import type { Product } from "../../types/Product";
import { useWishlist } from "../../hooks/useWishlist";
import AddToWishlistButton from "../wishlist/AddToWishlistButton";
import AddToCartBtn from "../layouts/AddToCartBtn";
import "../../styles/product.css";
import { addToCart } from "../../api/cartApi";
import { useCart } from "../../hooks/useCart";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const { refreshCart } = useCart();

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

  const userId = "USER_001";

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart({
        userId,
        product: {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        }
      })
      await refreshCart();
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  }

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

        <AddToCartBtn onClick={() => handleAddToCart(product)} />
      </div>
    </div>
  );
};

export default ProductCard;