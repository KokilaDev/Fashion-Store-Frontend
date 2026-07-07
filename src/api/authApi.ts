import axios from "axios";

// const API = "http://localhost:5000/api/v1/auth";
const API = "https://fashion-store-backend-red.vercel.app/api/v1/auth";


export const getMyDetails = async () => {
    const token = localStorage.getItem("accessToken");

    return axios.get(`${API}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const logout = async () => {
  return await axios.post(`${API}/logout`, 
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};