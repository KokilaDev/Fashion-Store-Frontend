import "../../styles/home.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h3>AURA FASHION</h3>
          <p>
            Bringing you premium fashion at affordable prices.
            Style that defines you.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Categories</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p><i className="fas fa-envelope"></i> fashionstore@gmail.com</p>
          <p><i className="fas fa-phone"></i> +94 77 123 4567</p>

          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

      </div>

      <div className="copyright">
        © 2026 AURA Fashion Store. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;