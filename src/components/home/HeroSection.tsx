import "../../styles/home.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-header">
            <h1 className="hero-title">Welcome to Aura Fashion Store</h1>
        </div>

        <div className="hero-subcontent">
            <p>
                Discover the latest trends and elevate your style.
            </p>

            <button>Shop Now</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;