import "../../styles/home.css";

const FeaturedCollection = () => {
  return (
    <section className="featured-collection">
      <div className="featured-content">
        <div className="featured-text">
          <h2>Summer Collection 2026</h2>

          <p>
            Discover premium fashion designed
            for comfort and style.
          </p>

          <button>Explore Collection</button>
        </div>

        <div className="featured-image">
          <img
            src="/images/collection.jpg"
            alt="Collection"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;