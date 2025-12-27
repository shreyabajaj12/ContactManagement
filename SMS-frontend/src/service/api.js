import axios from "axios";
const api=axios.create({
    baseURL:"https://contact-management-latest.onrender.com",
    withCredentials:true,
});


export default api;


