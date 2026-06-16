import type { Product } from "../types/Product";

import dress1 from "../assets/images/dress1.jpg";
import dress2 from "../assets/images/dress2.jpg";
import dress3 from "../assets/images/dress3.jpg";
import dress4 from "../assets/images/dress4.jpg";
import dress5 from "../assets/images/dress5.jpg";
import dress6 from "../assets/images/dress6.jpg";

export const products: Product[] = [
  {
    id: 1,
    name: "Floral Dress",
    description: "Floral cotton dress",
    price: 4500,
    image: dress1,
  },
  {
    id: 2,
    name: "Evening Gown",
    description: "Elegant evening gown",
    price: 6500,
    image: dress2,
  },
  {
    id: 3,
    name: "Casual Dress",
    description: "Comfortable casual dress",
    price: 3500,
    image: dress3,
  },
  {
    id: 4,
    name: "Casual Blouse",
    description: "Soft rayon blouse",
    price: 2500,
    image: dress4,
  },
  {
    id: 5,
    name: "Floral Blouse",
    description: "Premium floral blouse",
    price: 2500,
    image: dress5,
  },
  {
    id: 6,
    name: "Elegant Frock",
    description: "Luxury silk frock",
    price: 4000,
    image: dress6,
  },
];