import api from "./api";

export const placeOrder = async (orderData: any) => {
  const response = await api.post("/orders/", orderData);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/orders/");
    return response.data;
}

export const getMyOrders = async (userId: string) => {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data;
}

export const getOrderById = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data;
}