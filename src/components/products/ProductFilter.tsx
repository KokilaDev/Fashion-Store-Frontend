import "../../styles/product.css";

type Props = {
  category: string;
  onCategoryChange: (value: string) => void;
};

const ProductFilter = ({ category, onCategoryChange }: Props) => {
  return (
    <aside className="filter-section">

      <h3>Filter by:</h3>

      <div className="filter-options">

        <div className="filter-btn">
          Category

          <select
            className="filter-dropdown"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Frocks">Frocks</option>
            <option value="Blouses">Blouses</option>
            <option value="Tops">Tops</option>
            <option value="Skirts">Skirts</option>
          </select>
        </div>

        <div className="filter-btn">
          Price
          <select className="filter-dropdown">
            <option value="All">All</option>
            <option value="0-1000">0-1000</option>
            <option value="1000-3000">1000-3000</option>
            <option value="3000-5000">3000-5000</option>
          </select>
        </div>

        <div className="filter-btn">
          Type
          <select className="filter-dropdown">
            <option value="All">All</option>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
          </select>
        </div>

      </div>
    </aside>
  );
};

export default ProductFilter;