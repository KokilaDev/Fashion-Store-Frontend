import { useEffect, useState } from "react";

import ProductFilter from "../components/products/ProductFilter";
import ProductGrid from "../components/products/ProductGrid";

import CartBtn from "../components/layouts/CartBtn";

import { useCart } from "../context/CartContext";
import BackButton from "../components/layouts/BackButton";
import type { Product } from "../types/Product";
import { getAllProducts } from "../api/productApi";
import "../styles/product.css"

const Products = () => {

    const [gridView, setGridView] = useState(3);

    const [favorites, setFavorites] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState("All");

    const { addToCart } = useCart();

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await getAllProducts();

                setProducts(res.data.products as Product[]);
            } catch (err) {
                console.error("Failed to load products", err);
            }
        };

        loadProducts();
    }, []);

    return (
        <div className="box-container">
            <div className="product-container">

                <div className="product-header">

                    <BackButton />

                    <h1 className="product-title">
                        Products
                    </h1>

                </div>

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

                    <ProductFilter
                        category={category}
                        onCategoryChange={setCategory}
                    />

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