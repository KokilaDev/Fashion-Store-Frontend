export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
  qty?: number;
}

export interface AdminProduct {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: File | null;
}