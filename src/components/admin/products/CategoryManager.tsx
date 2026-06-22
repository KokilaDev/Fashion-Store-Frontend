import "../../../styles/product.css";

type Props = {
  category: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CategoryManager = ({ category, onChange }: Props) => {
  return (
    <select
      name="category"
      value={category}
      onChange={onChange}
      className="category-select"
    >
      <option value="" disabled hidden>Select Category</option>

      <option value="Shirts">Shirts</option>
      <option value="T-Shirts">T-Shirts</option>
      <option value="Dresses">Dresses</option>
      <option value="Blouses">Blouses</option>
      <option value="Skirts">Skirts</option>

      <option value="Jeans">Jeans</option>
      <option value="Trousers">Trousers</option>

      <option value="Shoes">Shoes</option>
      <option value="Accessories">Accessories</option>

      <option value="Bags">Bags</option>
    </select>
  );
};

export default CategoryManager;