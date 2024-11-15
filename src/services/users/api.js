import { API_ENDPOINTS } from "../../constants";
import axiosInstance from "../network";

// const headersUser = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Credentials": false,
//   isAuthRequired: false, // This allows the addUser endpoint to bypass authentication
//   withCredentials: false,
// };

export const usersApi = {
  addUser: (body) => {
    return axiosInstance.post(`${API_ENDPOINTS.ADD_USER}`, body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": false,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getAllUsers: () => {
    return axiosInstance.get(`${API_ENDPOINTS.GET_USERS}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": false,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
