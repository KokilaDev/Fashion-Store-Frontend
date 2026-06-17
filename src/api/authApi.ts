import axios from "axios";

export const getMyDetails = async () => {
  return await axios.get("/api/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};