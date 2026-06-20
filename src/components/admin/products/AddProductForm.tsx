import ProductImageUploader from "../products/ProductImageUploader";
import CategoryManager from "../products/CategoryManager";
import BackButton from "../../layouts/BackButton";
import "../../../styles/product.css";

const AddProductForm = ({
  product,
  handleChange,
  handleImageChange,
  handleSubmit,
  isEdit
}: any) => {
  return (
    <div className="add-product-container">
        <div className="add-product-header">
            <BackButton />
            <h1>
                {isEdit ? "Edit Product" : "Add Product"}
            </h1>
        </div>
        <form onSubmit={handleSubmit} className="add-product-form">

            <div className="section-column">
                <div className="form-group">
                    Product Name
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                    />
                </div>
                
                <div className="section-row">
                    <div className="form-group">
                        Category
                        <CategoryManager
                            category={product.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        Price
                        <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Price"
                        />
                    </div>

                    <div className="form-group">
                        Stock
                        <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        />
                    </div>
                </div>

                <div className="form-group">
                    Description
                    <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Description"
                    />
                </div>
            </div>

            <div className="section-column">
                <ProductImageUploader
                    image={product.image}
                    onImageChange={handleImageChange}
                />

                <button type="submit">
                    {isEdit ? "Update Product" : "Add Product"}
                </button>
            </div>

        </form>
    </div>
  );
};

export default AddProductForm;