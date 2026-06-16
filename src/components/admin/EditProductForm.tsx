import { useState } from "react";
import axios from "axios";

const EditProductForm = ({ product, onClose, refresh }: any) => {
  const [form, setForm] = useState(product);
  const [image, setImage] = useState<File | null>(null);

//   useEffect(() => {
//     setForm(product);
//   }, [product]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price.toString());
    formData.append("stock", form.stock.toString());
    formData.append("description", form.description);

    if (image) {
      formData.append("image", image);
    }

    await axios.put(
      `http://localhost:5000/api/v1/products/update/${product._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    refresh();
    onClose();
  };

  return (
    <div className="edit-form">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <input type="file" onChange={handleImage} />

        {product.image && !image && (
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            width="100"
          />
        )}

        {image && (
          <img
            src={URL.createObjectURL(image)}
            width="100"
          />
        )}

        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;