export interface Product {
  productId: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
  qty?: number;
  sizes?: {
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
  };
}

export interface AdminProduct {
  productId: string;
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  active: boolean;

  sizes: {
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
  };
}