import "../../styles/home.css";

const CategorySection = () => {
  const categories = ["All", "Frocks", "Blouses", "Tops", "Skirts", "Party Wear", "Jeans", "Trousers", "Suits"];

  return (
    <header className="categories">
      <div className="category-container">
        <div className="category-logo">
          <h2>Shop By Category</h2>
        </div>

        <div className="category-divider"></div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              {category}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default CategorySection;