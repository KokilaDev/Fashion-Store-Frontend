import axios from "axios";
import type { Customer } from "../types/Customer";

const API_URL = "http://localhost:5000/api/v1/customers";

export const getAllCustomers = async (): Promise<Customer[]> => {
    const response = await axios.get(API_URL);
    return response.data.data;
};