import { useEffect, useState } from "react";

import ProductFilter from "../components/products/ProductFilter";
import ProductGrid from "../components/products/ProductGrid";

import CartBtn from "../components/layouts/CartBtn";

import { useCart } from "../hooks/useCart";
import BackButton from "../components/layouts/BackButton";
import type { Product } from "../types/Product";
import { getAllProducts } from "../api/productApi";
import { addToCart as addToCartApi } from "../api/cartApi";
import "../styles/product.css"
import { useAuth } from "../hooks/useAuth";

const Products = () => {

    const [gridView, setGridView] = useState(3);

    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState("All");

    const { refreshCart } = useCart();
    const { user } = useAuth();

    const handleAddToCart = async (product: Product) => {
        try {
            if (!user?._id) return;
            
            await addToCartApi({
                userId: user?._id,
                product: {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    qty: 1,
                }
            });
            await refreshCart();
        } catch (err) {
            console.error("Failed to add to cart", err);
        }
    }

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

                <div className="product-divider"></div>

                <div className="product-content">

                    <ProductFilter
                        category={category}
                        onCategoryChange={setCategory}
                    />

                    <ProductGrid
                        products={products}
                        addToCart={handleAddToCart}
                        gridView={gridView}
                    />

                </div>

                <CartBtn />

            </div>
        </div>
    );
};

export default Products;