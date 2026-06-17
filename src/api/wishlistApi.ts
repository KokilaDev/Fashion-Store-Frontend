import axios from "axios";

const API = "http://localhost:5000/api/v1/wishlist";

export const getWishlistApi = (userId: string) =>
  axios.get(`${API}/${userId}`);

export const addToWishlistApi = (userId: string, productId: string) =>
  axios.post(API, { userId, productId });

export const removeFromWishlistApi = (userId: string, productId: string) =>
  axios.delete(`${API}/${userId}/${productId}`);