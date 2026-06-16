import FavoriteButton from "./FavoriteButton";
import type { Product } from "../../types/Product";
import "../../styles/product.css"

type Props = {
    product: Product;
    isFavorite: boolean;
    onFavorite: () => void;
    onAddToCart: () => void;
};

const ProductCard = ({
    product,
    isFavorite,
    onFavorite,
    onAddToCart,
}: Props) => {
    return (
        <div className="product-card">

            <div className="more-options-container">
                <FavoriteButton
                    isFavorite={isFavorite}
                    onClick={onFavorite}
                />
            </div>

            <img src={product.image} alt={product.name} />

            <div className="product-info">
                <h3>{product.name}</h3>

                <p className="product-description">
                    {product.description.split(" ").length > 15
                        ? product.description
                              .split(" ")
                              .slice(0, 15)
                              .join(" ") + "..."
                        : product.description}
                </p>

                <h4>Rs. {product.price}</h4>

                <button onClick={onAddToCart}>
                    <i className="fa-solid fa-cart-plus"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;