import axios from "axios";
import type { AdminOrder } from "../types/Order";

const API_URL = "http://localhost:5000/api/v1/orders";

interface OrdersResponse {
  success: boolean;
  orders: AdminOrder[];
}

interface OrderResponse {
  success: boolean;
  order: AdminOrder;
}

export const placeOrderApi = async (orderData: any) => {
    const response = await axios.post(`${API_URL}`, orderData);
    return response.data;
}

export const calculateCheckoutApi = async (items: any) => {
    const response = await axios.post(`${API_URL}/calculate`, { items });
    return response.data;
}

export const getOrderByUserApi = async (userId: string) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
}

export const getOrderByIdApi = async (orderId: string) => {
    const response = await axios.get(`${API_URL}/${orderId}`);
    return response.data;
}

export const updateOrderStatusApi = async (
    orderId: string, 
    status: string
): Promise<AdminOrder> => {
    const response = await axios.put<OrderResponse>(
        `${API_URL}/${orderId}/status`, { status }
    );
    return response.data.order;
}

export const getAllOrdersApi = async (): Promise<AdminOrder[]> => {
    const response = await axios.get<OrdersResponse>(API_URL);
    return response.data.orders;
}