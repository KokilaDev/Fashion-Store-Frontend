import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { useAuth } from "../../hooks/useAuth";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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

            <button
              onClick={() => {
                navigate(user ? "/products" : "/login")
                window.location.reload();
              }}
            >
              Shop Now
            </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;