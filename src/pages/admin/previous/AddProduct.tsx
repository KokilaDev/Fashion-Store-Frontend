import { useEffect, useState } from "react";
import AddProductForm from "../../../components/admin/products/AddProductForm";
import ProductInventory from "../../../components/admin/products/ProductInventory";
import type { AdminProduct } from "../../../types/Product";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../../api/productApi";
import DeleteProductModal from "../../../components/admin/products/DeleteProductModal";

const AddProduct = () => {
  const [product, setProduct] = useState<AdminProduct>({
    _id: "",
    name: "",
    category: "",
    price: 0,
    description: "",
    image: null,

    sizes: {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    }
  });

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
        try {
            const res = await getAllProducts();
            console.log("Loaded Products:", res.data.products);
            setProducts(res.data.products)
        } catch (err) {
            console.error("Failed to load products:", err);
        }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    console.log("Current Product:", product);
  }, [product]);

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

  const handleStockChange = (size: string, value: number) => {
    setProduct((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price.toString());
    formData.append("description", product.description);
    formData.append("sizes", JSON.stringify(product.sizes));

    if (product.image) {
        formData.append("image", product.image);
    }

    if (isEdit) {
        await updateProduct(product._id, formData);
        setIsEdit(false)
    } else {
        const res = await addProduct(formData);
        setProducts((prev) => [...prev, res.data.product]);
    }

    const res = await getAllProducts();
    setProducts(res.data.products)

    setProduct({
        _id: "",
        name: "",
        category: "",
        price: 0,
        description: "",
        image: null,
        sizes: {
          XS: 0,
          S: 0,
          M: 0,
          L: 0,
          XL: 0
        }
    })
  };

  return (
    <>
      <div className="box-container">
        <AddProductForm
          product={product}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleStockChange={handleStockChange}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
        />

        <ProductInventory 
          products={products}
          setProduct={setProduct}
          setIsEdit={setIsEdit}
          setDeleteId={setDeleteId}
          setShowDeleteModal={setShowDeleteModal}
        />
      </div>
      {showDeleteModal && (
        <DeleteProductModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={async () => {
            await deleteProduct(deleteId);
            setShowDeleteModal(false);

            const res = await getAllProducts();
            setProducts(res.data.products);
          }}
        />
      )}
    </>
  );
};

export default AddProduct;