import api from "./api"

export const register = async (
    name: string,
    email: string,
    password: string
) => {

  const res = await api.post("/auth/register", {
    name,
    email,
    password
  })

  return res.data
    
}

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", {
    email,
    password
  });
  return res.data;
}

export const getMyDetails = async () => {
  const res = await api.get("/auth/me")
  return res.data
}

export const updateMyDetails = async (
  data: { 
    name?: string; 
    email?: string; 
    phone?: string; 
    address?: string;
    city?: string;
    zip?: string;
  }
) => {
  const res = await api.put("/auth/profile", data)
  return res.data
}

export const refreshTokenCall = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh-token", {
    refreshToken
  });
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const verifyOTP = async (
  email: string,
  otp: string
) => {
  const res = await api.post("/auth/verify-otp", {
    email,
    otp,
  });

  return res.data;
};

export const resetPassword = async (
  email: string,
  password: string
) => {
  const res = await api.post("/auth/reset-password", {
    email,
    password,
  });

  return res.data;
};