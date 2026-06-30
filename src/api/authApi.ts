import axios from "axios";

export const getMyDetails = async () => {
    const token = localStorage.getItem("accessToken");

    return axios.get("http://localhost:5000/api/v1/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const logout = async () => {
  return await axios.post("http://localhost:5000/api/v1/auth/logout", 
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};