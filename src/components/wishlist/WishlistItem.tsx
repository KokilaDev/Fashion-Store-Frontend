import type { Product } from "../../types/Product";
import AddToCartBtn from "../layouts/AddToCartBtn";

type Props = {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void;
};

const WishlistItem = ({
  product,
  onRemove,
  onAddToCart,
}: Props) => {

  const imgUrl = product.productId?.image
    ? `http://localhost:5000/uploads/${product.productId.image}`
    : "/placeholder.png";

  console.log("PRODUCT:", product);
  console.log("IMAGE:", product.productId?.image);

  const handleClick = () => {
    console.log("AddToCartBtn clicked from WishlistItem");
    onAddToCart();
  };

  const handleRemove = () => {
    console.log("RemoveButton clicked from WishlistItem");
    onRemove();
  };

  return (
    <div className="wishlist-item">

      <div className="remove-btn-container">
        <button
          className="remove-btn"
          onClick={handleRemove}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <img
        src={imgUrl}
        alt={product.productId?.name || "Product Image"}
      />

      <div className="wishlist-item-info">
        <h3>{product.productId?.name}</h3>

        <p className="wishlist-desc">
            {(product.productId?.description ?? "")
              .split(" ")
              .slice(0, 15)
              .join(" ")}...
        </p>

        <h4>Rs. {product.productId?.price}</h4>

        <AddToCartBtn onClick={handleClick} />
      </div>
    </div>
  );
};

export default WishlistItem;