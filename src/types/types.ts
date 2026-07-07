export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  isTrending: boolean;
  isNewProduct: boolean;
  rating: number;
  description: string;
}

export interface ProductForm {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;

  image: File | null;
  imagePreview: string;

  category: string;
  sizes: string[];
  isTrending: boolean;
  isNewProduct: boolean;
  rating: number;
  description: string;
  stock: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  qty: number;
  image: string | File | null;
}

export interface Order {
  id: string;
  orderId: string;
  createdAt: string;
  subtotal: number;
  items: OrderItem[];
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned';
  shipping: ShippingAddress;
  shippingFee: number;
  total: number;
  paymentMethod: 'PayPal' | 'COD' | 'Bank Transfer';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
} 

export interface ShippingAddress {
  name: string;
  phone: string;
  city: string;
  street: string;
  zip: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: ("USER" | "ADMIN")[];
  approved: boolean;

  isLoggedIn?: boolean;
  orders?: Order[];
  phone?: string;
  address?: string
  city?: string;
  zip?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  orderCount: number;
}

// Premium Mock Products matching categories perfectly:
// Categories: Frocks, Blouses, Tops, Skirts, Party Wear, Jeans, Trousers, Suits
// export const MOCK_PRODUCTS: Product[] = [
//   {
//     id: "p1",
//     name: "Aura Silk Evening Frock",
//     price: 189.00,
//     originalPrice: 240.00,
//     image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
//     category: "Frocks",
//     sizes: ["XS", "S", "M", "L"],
//     isTrending: true,
//     isNewProduct: false,
//     rating: 4.9,
//     description: "Flowing silk silhouette with an elegant backless cut, designed for evening gatherings."
//   },
//   {
//     id: "p2",
//     name: "Classic Linen Wrap Frock",
//     price: 125.00,
//     image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80",
//     category: "Frocks",
//     sizes: ["S", "M", "L", "XL"],
//     isTrending: false,
//     isNewProduct: true,
//     rating: 4.7,
//     description: "Crafted from breathable organic linen, this wrap frock offers effortless daytime charm."
//   },
//   {
//     id: "p3",
//     name: "Chiffon Gathered Blouse",
//     price: 79.00,
//     image: "https://images.unsplash.com/photo-1548624149-f7b3e5a3333a?w=800&auto=format&fit=crop&q=80",
//     category: "Blouses",
//     sizes: ["XS", "S", "M", "L"],
//     isTrending: true,
//     isNewProduct: false,
//     rating: 4.5,
//     description: "Sheer chiffon panels with delicate pleating and elasticated wrist bands."
//   },
//   {
//     id: "p4",
//     name: "Satin Mock Neck Top",
//     price: 68.00,
//     originalPrice: 85.00,
//     image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
//     category: "Tops",
//     sizes: ["S", "M", "L"],
//     isTrending: false,
//     isNewProduct: true,
//     rating: 4.6,
//     description: "Glossy satin sheen with high mock collar and fluid side-drape silhouette."
//   },
//   {
//     id: "p5",
//     name: "Structured Pleated Skirt",
//     price: 110.00,
//     image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=80",
//     category: "Skirts",
//     sizes: ["XS", "S", "M", "L"],
//     isTrending: true,
//     isNewProduct: false,
//     rating: 4.8,
//     description: "A-line midi skirt featuring a structured pleat design and neat hidden zip closure."
//   },
//   {
//     id: "p6",
//     name: "Velvet Midnight Slip Skirt",
//     price: 95.00,
//     image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
//     category: "Skirts",
//     sizes: ["S", "M", "L"],
//     isTrending: false,
//     isNewProduct: true,
//     rating: 4.4,
//     description: "Ultra-soft velvet slip skirt with a subtle gloss effect, perfect for transitional styling."
//   },
//   {
//     id: "p7",
//     name: "Gala Sequin Party Dress",
//     price: 245.00,
//     originalPrice: 320.00,
//     image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80",
//     category: "Party Wear",
//     sizes: ["XS", "S", "M", "L"],
//     isTrending: true,
//     isNewProduct: true,
//     rating: 5.0,
//     description: "All-over hand-stitched micro sequins capturing light brilliantly with every turn."
//   },
//   {
//     id: "p8",
//     name: "Aura Premium High-Rise Jeans",
//     price: 115.00,
//     image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80",
//     category: "Jeans",
//     sizes: ["25", "26", "27", "28", "29", "30"],
//     isTrending: true,
//     isNewProduct: false,
//     rating: 4.7,
//     description: "Tailored rigid denim crafted to break in perfectly, detailed with classic silver-toned rivets."
//   },
//   {
//     id: "p9",
//     name: "Wide Leg Pleated Trousers",
//     price: 140.00,
//     image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80",
//     category: "Trousers",
//     sizes: ["XS", "S", "M", "L", "XL"],
//     isTrending: false,
//     isNewProduct: true,
//     rating: 4.8,
//     description: "High-waisted wide trousers featuring neat double front pleats and side slip pockets."
//   },
//   {
//     id: "p10",
//     name: "Double-Breasted Silk Suit Blazer",
//     price: 295.00,
//     originalPrice: 380.00,
//     image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
//     category: "Suits",
//     sizes: ["S", "M", "L"],
//     isTrending: true,
//     isNewProduct: false,
//     rating: 4.9,
//     description: "Impeccably tailored double-breasted blazer featuring full inner silk lining and sharp peak lapels."
//   },
//   {
//     id: "p11",
//     name: "Tailored Slim Suit Trousers",
//     price: 155.00,
//     image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
//     category: "Suits",
//     sizes: ["S", "M", "L", "XL"],
//     isTrending: false,
//     isNewProduct: true,
//     rating: 4.7,
//     description: "Pressed crease trousers designed with a slim silhouette and modern adjustable waist buckles."
//   },
//   {
//     id: "p12",
//     name: "Elegant Ribbed Knit Top",
//     price: 55.00,
//     image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80",
//     category: "Tops",
//     sizes: ["XS", "S", "M", "L"],
//     isTrending: true,
//     isNewProduct: true,
//     rating: 4.5,
//     description: "Soft rib-knit fabric that molds comfortably to your form, detailed with a subtle square neckline."
//   }
// ];

export const MOCK_COUPONS: Coupon[] = [
  { code: "AURA15", discountPercent: 15, description: "15% OFF on Summer Collection" },
  { code: "ELEGANCE20", discountPercent: 20, description: "20% OFF on Party Wear and Frocks" },
  { code: "FIRSTBUY10", discountPercent: 10, description: "10% OFF on your very first order" },
  { code: "AURACLUB25", discountPercent: 25, description: "Exclusive 25% VIP Lounge Voucher" }
];