import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/products";

export const getAllProducts = async () => {
  return await axios.get(`${BASE_URL}/all`);
};

export const addProduct = async (data: FormData) => {
  return await axios.post(`${BASE_URL}/add`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateProduct = async (id: string, data: FormData) => {
  return await axios.put(`${BASE_URL}/update/${id}`, data);
};

export const deleteProduct = async (id: string) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};