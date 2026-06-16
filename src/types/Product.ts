export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
  qty?: number;
}

export interface AdminProduct {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string | File | null;
}