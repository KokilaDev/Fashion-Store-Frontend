import ProductCard from "../products/ProductCard";
import type { Product } from "../../types/Product";
import "../../styles/home.css";

const NewArrivals = () => {
  const products: Product[] = [
    {
      productId: "1",
      _id: "1",
      name: "Slim Fit Shirt",
      description: "Premium slim fit shirt for casual wear",
      price: 4200,
      image: "/images/p3.jpg",
      category: "Men",
      sizes: {
        XS: 5,
        S: 10,
        M: 15,
        L: 12,
        XL: 8,
      },
    },
    {
      productId: "2",
      _id: "2",
      name: "Casual Hoodie",
      description: "Comfortable hoodie for everyday style",
      price: 5800,
      image: "/images/p4.jpg",
      category: "Men",
      sizes: {
        XS: 3,
        S: 8,
        M: 12,
        L: 10,
        XL: 6,
      },
    },
    {
      productId: "3",
      _id: "3",
      name: "Denim Jacket",
      description: "Classic denim jacket",
      price: 7500,
      image: "/images/p5.jpg",
      category: "Men",
      sizes: {
        XS: 2,
        S: 6,
        M: 10,
        L: 8,
        XL: 5,
      },
    },
  ];

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>New Arrivals</h2>
        <p>Fresh styles just landed.</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={(product, size) => {
              console.log("Added:", product, size);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;