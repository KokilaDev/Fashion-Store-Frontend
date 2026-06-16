import "../../styles/product.css"

type Props = {
  category: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CategoryManager = ({ category, onChange }: Props) => {
  return (
    <input
      type="text"
      name="category"
      value={category}
      onChange={onChange}
      placeholder="Category"
    />
  );
};

export default CategoryManager;