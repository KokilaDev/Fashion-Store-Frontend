import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";
import "../../styles/product.css"

type Props = {
    products: Product[];
    addToCart: (product: Product) => void;
    gridView: number;
};

const ProductGrid = ({
    products,
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
                    onAddToCart={() =>
                        addToCart(product)
                    }
                />
            ))}
        </div>
    );
};

export default ProductGrid;