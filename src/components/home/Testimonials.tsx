import "../../styles/home.css";

const testimonials = [
  {
    name: "Nimal",
    review:
      "Excellent quality and fast delivery.",
  },
  {
    name: "Kasuni",
    review:
      "The best fashion store I've used.",
  },
  {
    name: "Amila",
    review:
      "Amazing customer service and products.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>

      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="testimonial-card"
          >
            <p>"{item.review}"</p>
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;