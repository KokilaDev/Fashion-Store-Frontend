import "../../styles/product.css";

type Props = {
  category: string;
  onCategoryChange: (value: string) => void;
};

const categories = ["All", "Frocks", "Blouses", "Tops", "Skirts", "Party Wear", "Jeans", "Trousers", "Suits"];

const ProductFilter = ({ category, onCategoryChange }: Props) => {
  return (
    <aside className="filter-section">
      <h3>Filter by Category</h3>

      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-item ${category === cat ? "active" : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ProductFilter;