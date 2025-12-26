import axios from "axios";
const api=axios.create({
    baseURL:"https://contact-management-latest.onrender.com",
    withCredentials:true,
});

api.interceptors.request.use((config) => {
  // NEVER attach token to auth endpoints
  if (
    config.url?.startsWith("/auth/login") ||
    config.url?.startsWith("/auth/signup") ||
    config.url?.startsWith("/oauth2") ||
    config.url === "/login"
  ) {
    return config;
  }

  const token = localStorage.getItem("token");

  //  attach token ONLY if it exists
  if (token && token.trim() !== "") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



export default api;


