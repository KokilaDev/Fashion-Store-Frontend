import axios from "axios";
import type { AdminProduct } from "../types/Product";

const BASE_URL = "http://localhost:5000/api/v1/products";

interface ProductsResponse {
  message: string;
  products: AdminProduct[];
}

interface ProductResponse {
  message: string;
  product: AdminProduct;
}

export const getAllProducts = async (): Promise<AdminProduct[]> => {
  const response = await axios.get<ProductsResponse>(`${BASE_URL}/all`);
  return response.data.products;
};

export const addProduct = async (
  data: FormData
): Promise<ProductResponse> => {
  const response = await axios.post<ProductResponse>(
    `${BASE_URL}/add`, 
    data, 
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const updateProduct = async (
  id: string, 
  data: FormData
): Promise<ProductResponse> => {
  const response = await axios.put<ProductResponse>(
    `${BASE_URL}/update/${id}`, 
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const deleteProduct = async (id: string) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};