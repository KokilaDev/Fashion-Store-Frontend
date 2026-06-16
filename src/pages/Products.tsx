import { useState } from "react";

import ProductHeader from "../components/products/ProductHeader";
import ProductFilter from "../components/products/ProductFilter";
import ProductGrid from "../components/products/ProductGrid";

import CartBtn from "../components/CartBtn";

import { useCart } from "../context/CartContext";
import { products } from "../data/products";

const Products = () => {

    const [gridView, setGridView] = useState(4);

    const [favorites, setFavorites] = useState<number[]>([]);

    const { addToCart } = useCart();

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="box-container">
            <div className="product-container">

                <ProductHeader />

                <div className="product-buttons">

                    <button onClick={() => setGridView(2)}>
                        <i className="bi bi-app"></i>
                    </button>

                    <button onClick={() => setGridView(3)}>
                        <i className="bi bi-grid"></i>
                    </button>

                    <button onClick={() => setGridView(4)}>
                        <i className="bi bi-grid-3x3"></i>
                    </button>

                </div>

                <div className="product-content">

                    <ProductFilter />

                    <ProductGrid
                        products={products}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                        addToCart={addToCart}
                        gridView={gridView}
                    />

                </div>

                <CartBtn />

            </div>
        </div>
    );
};

export default Products;