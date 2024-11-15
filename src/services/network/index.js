/* eslint-disable no-undef */
import axios from "axios";

console.log("Base URL:", process.env.REACT_APP_API_URL);

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // CRA environment variable
  // withCredentials: true, // Include credentials (if required)
});

// Add interceptors if needed (e.g., for handling tokens or errors)
// axiosInstance.interceptors.request.use((config) => {
//   // Example: Add auth token to headers
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Export the Axios instance
export default axiosInstance;
