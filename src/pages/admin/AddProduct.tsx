import { useState } from "react";
import axios from "axios";
import AddProductForm from "../../components/admin/AddProductForm";
import ProductInventory from "../../components/admin/ProductInventory";
import type { AdminProduct } from "../../types/Product";

const AddProduct = () => {
  const [product, setProduct] = useState<AdminProduct>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    image: null,
  });

  const [products, setProducts] = useState<AdminProduct[]>([]);

  const handleChange = (e: any) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: any) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    formData.append("description", product.description);

    if (product.image) {
        formData.append("image", product.image);
    }

    const res = await axios.post(
        "http://localhost:5000/api/v1/products/add",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    setProducts((prev) => [...prev, res.data.product]);
  };

  return (
    <div className="box-container">
      <AddProductForm
        product={product}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />

      <ProductInventory products={products} />
    </div>
  );
};

export default AddProduct;