import "../../styles/home.css";
import { getActiveCouponsApi } from "../../api/couponApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Offer = {
  _id?: string;
  title: string;
  description: string;
  discount: number;
  type?: string;
  expiryDate?: string;
};

const OfferBanner = () => {
  const [offer, setOffer] = useState<Offer[]>([]);
  const [current, setCurrent] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        console.log("Fetching active coupons...");

        const coupons = await getActiveCouponsApi();

        console.log("Coupon Response:", coupons);

        setOffer(coupons);

      } catch (err) {
        console.log("Failed to load offer:", err);
      }
    };

    fetchOffer();
  }, []);

  useEffect(() => {
    if (offer.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offer.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [offer]);

  if (offer.length === 0) {
    return (
      <section className="offer-banner">
        <h2>No Active Offers</h2>
        <p>Currently there are no active promotions.</p>
      </section>
    );
  }

  const offers = offer[current];

  return (
    <section className="offer-banner-container">
      <div className="offer-banner">
        <h2>{offers?.title || "No Active Offers"}</h2>

        <p>
          {offers?.description ||
            "Currently there are no active promotions."}
        </p>

        {offers && (
          <button onClick={() => navigate("/products")}>
            Shop Deals - {offers.discount}% OFF
          </button>
        )}
      </div>
      
      <div className="offer-dots">
        {offer.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default OfferBanner;