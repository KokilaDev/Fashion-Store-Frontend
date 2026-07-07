import axios from "axios";

// const API = "http://localhost:5000/api/v1/coupons";

const API = "https://fashion-store-backend-red.vercel.app/api/v1/coupons";


export const getCoupons = async () => {
  const res = await axios.get(`${API}/all`);
  return res.data;
};

export const createCoupon = async (data: any) => {
  const res = await axios.post(`${API}/create`, data);
  return res.data;
};

export const validateCoupon = async (code: string, total: number) => {
  const res = await axios.post(`${API}/validate`, {
    code,
    total,
  });

  return res.data;
};

export const deleteCoupon = async (id: string) => {
  const res = await axios.delete(`${API}/delete/${id}`);
  return res.data;
};

export const updateCoupon = async (id: string, data: any) => {
  const res = await axios.put(`${API}/update/${id}`, data);
  return res.data;
};

export const getActiveCouponsApi = async () => {
  const res = await axios.get(`${API}/active`);
  console.log("API Response:", res.data);
  return res.data;
}