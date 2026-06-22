import "../../styles/home.css";

const images = [
  "/images/insta1.jpg",
  "/images/insta2.jpg",
  "/images/insta3.jpg",
  "/images/insta4.jpg",
  "/images/insta5.jpg",
  "/images/insta6.jpg",
];

const InstagramGallery = () => {
  return (
    <section className="instagram-gallery">
      <h2>Follow Us On Instagram</h2>

      <div className="instagram-grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Instagram ${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default InstagramGallery;