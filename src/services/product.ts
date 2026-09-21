import type { AdminProduct } from "../types/types";
import api from "./api";

interface ProductsResponse {
  message: string;
  products: AdminProduct[];
}

interface ProductResponse {
  message: string;
  product: AdminProduct;
}

export const getAllProducts = async (): Promise<AdminProduct[]> => {
  const response = await api.get<ProductsResponse>("/products/all");
  return response.data.products;
};

export const addProduct = async (
  data: FormData
): Promise<ProductResponse> => {
  const response = await api.post<ProductResponse>(
    "/products/add", 
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
  const response = await api.put<ProductResponse>(
    `/products/update/${id}`, 
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/delete/${id}`);
  return response.data;
};

export const getLatestProducts = async () => {
  const res =  await api.get(`/products/latest`);
  return res.data.products;
}