import ProductCard from "../products/ProductCard";
import type { Product } from "../../types/Product";
import "../../styles/home.css";

const TrendingProducts = () => {
  const products: Product[] = [
    {
      productId: "1",
      _id: "1",
      name: "Oversized T-Shirt",
      description: "Premium oversized cotton t-shirt",
      price: 3500,
      image: "/images/p1.jpg",
      category: "Men",
      sizes: {
        XS: 20,
        S: 10,
        M: 15,
        L: 8,
        XL: 5,
      },
    },
    {
      productId: "2",
      _id: "2",
      name: "Cargo Pants",
      description: "Comfortable cargo pants",
      price: 5500,
      image: "/images/p2.jpg",
      category: "Men",
      sizes: {
        XS: 15,
        S: 5,
        M: 10,
        L: 12,
        XL: 7,
      },
    },
  ];

  const handleAddToCart = (
    product: Product,
    size: string
  ) => {
    console.log(product, size);
  };

  return (
    <section className="trending-products">
      <h2>🔥 Trending Now</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;