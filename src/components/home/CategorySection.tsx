import "../../styles/home.css";

const categories = [
  "Men",
  "Women",
  "Kids",
  "Shoes",
  "Accessories",
];

const CategorySection = () => {
  return (
    <section className="categories">
      <h2>Shop By Category</h2>

      <div className="category-grid">
        {categories.map((category) => (
          <div key={category} className="category-card">
            {category}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;