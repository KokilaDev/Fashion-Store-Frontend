import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";
import "../../styles/product.css"

type Props = {
    products: Product[];
    favorites: string[];
    toggleFavorite: (id: string) => void;
    addToCart: (product: Product) => void;
    gridView: number;
};

const ProductGrid = ({
    products,
    favorites,
    toggleFavorite,
    addToCart,
    gridView,
}: Props) => {
    return (
        <div
            className={`product-grid ${
                gridView === 1
                    ? "list-view"
                    : `grid-${gridView}`
            }`}
        >
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    isFavorite={favorites.includes(product._id)}
                    onFavorite={() =>
                        toggleFavorite(product._id)
                    }
                    onAddToCart={() =>
                        addToCart(product)
                    }
                />
            ))}
        </div>
    );
};

export default ProductGrid;