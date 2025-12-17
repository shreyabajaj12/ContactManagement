import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:8080",
    withCredentials:true,
});

api.interceptors.request.use((config) => {
  // 🚫 NEVER attach token to auth endpoints
  if (
    config.url?.startsWith("/auth/") ||
    config.url?.startsWith("/oauth2") ||
    config.url === "/login"
  ) {
    return config;
  }

  const token = localStorage.getItem("token");

  // ✅ attach token ONLY if it exists
  if (token && token.trim() !== "") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



export default api;


