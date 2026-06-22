import "../../styles/home.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>Join Our Newsletter</h2>

      <p>
        Get exclusive offers and updates.
      </p>

      <div>
        <input
          type="email"
          placeholder="Enter your email"
        />

        <button>Subscribe</button>
      </div>
    </section>
  );
};

export default Newsletter;