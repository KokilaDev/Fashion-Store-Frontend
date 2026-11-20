const API_URL = "http://localhost:5000";

export const imgSrc = (p?: string) =>
  !p ? "" : p.startsWith("/uploads") ? `${API_URL}${p}` : p;
