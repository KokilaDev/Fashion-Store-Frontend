import { useEffect, useState } from "react";
import AddProductForm from "../../components/admin/AddProductForm";
import ProductInventory from "../../components/admin/ProductInventory";
import type { AdminProduct } from "../../types/Product";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../api/productApi";
import DeleteProductModal from "../../components/admin/DeleteProductModal";

const AddProduct = () => {
  const [product, setProduct] = useState<AdminProduct>({
    _id: "",
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    image: null,
  });

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
        try {
            const res = await getAllProducts();
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
        stock: 0,
        description: "",
        image: null,
    })
  };

  return (
    <>
      <div className="box-container">
        <AddProductForm
          product={product}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
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