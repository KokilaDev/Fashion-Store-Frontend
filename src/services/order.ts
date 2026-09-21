import api from "./api";

export const placeOrder = async (orderData: any) => {
  const response = await api.post("/", orderData);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/");
    return response.data;
}

export const getMyOrders = async (userId: string) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
}

export const getOrderById = async (orderId: string) => {
  const response = await api.get(`/${orderId}`);
  return response.data;
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await api.put(`/${orderId}/status`, { status });
  return response.data;
}