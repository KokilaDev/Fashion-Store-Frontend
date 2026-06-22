export interface Product {
  productId: any;
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
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: File | string | null;

  sizes: {
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
  };
}