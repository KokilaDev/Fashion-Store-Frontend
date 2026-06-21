import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/orders";

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

export const updateOrderStatusApi = async (orderId: string, status: string) => {
    const response = await axios.put(`${API_URL}/${orderId}/status`, { status });
    return response.data;
}