import axios from "axios";

const API = "https://fashion-store-backend-red.vercel.app/api/v1/cart";

export const getCart = (userId: string) =>
    axios.get(`${API}/${userId}`);

export const addToCart = (data: any) =>
    axios.post(`${API}/add`, data);

export const updateQty = (data: any) =>
    axios.put(`${API}/update`, data);

export const removeItem = (data: any) =>
    axios.delete(`${API}/remove`, { data });

export const clearCart = (userId: string) => {
    return axios.delete(`/api/cart/clear/${userId}`);
};