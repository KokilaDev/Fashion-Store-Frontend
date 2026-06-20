import type { Product } from "../../types/Product";
import { useWishlist } from "../../hooks/useWishlist";
import AddToWishlistButton from "../wishlist/AddToWishlistButton";
import AddToCartBtn from "../layouts/AddToCartBtn";
import "../../styles/product.css";
// import { addToCart } from "../../api/cartApi";
// import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // const { refreshCart } = useCart();

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

  // console.log("USER", user);
  // console.log("USERID", userId);

  // const handleAddToCart = async (product: any) => {
  //   if (!user?._id) {
  //     console.log("User not logged in or still loading");
  //     return;
  //   }

  //   console.log("USER", user);
  //   console.log("USERID", userId);

  //   try {
  //     console.log("ADDING TO CART");

  //     const response = await addToCart({
  //       userId: user._id,
  //       product: {
  //         productId: product._id,
  //         name: product.name,
  //         price: product.price,
  //         image: product.image,
  //         qty: 1,
  //       }
  //     })

  //     console.log("ADD RESPONSE", response.data);

  //     await refreshCart();

  //     console.log("REFRESH DONE");

  //   } catch (err) {
  //     console.error("ADD ERROR", err);
  //   }
  // }

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

        <AddToCartBtn 
          onClick={() => onAddToCart(product)}
          disabled={!userId}
        />
      </div>
    </div>
  );
};

export default ProductCard;