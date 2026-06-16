import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";
import "../../styles/product.css"

type Props = {
    products: Product[];
    favorites: number[];
    toggleFavorite: (id: number) => void;
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
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onFavorite={() =>
                        toggleFavorite(product.id)
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