import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/orders",
});

export const placeOrder = async (orderData: any) => {
  const response = await API.post("/", orderData);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await API.get("/");
    return response.data;
}

export const getMyOrders = async (userId: string) => {
  const response = await API.get(`/user/${userId}`);
  return response.data;
}

export const getOrderById = async (orderId: string) => {
  const response = await API.get(`/${orderId}`);
  return response.data;
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await API.put(`/${orderId}/status`, { status });
  return response.data;
}