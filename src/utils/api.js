import axios from 'axios';
import "dotenv/config";

// Create an instance of Axios with custom configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: false, // Set to true if cookies are needed for cross-origin requests
});

// Add an interceptor to include the JWT token in headers for every request
api.interceptors.request.use(config => {
  const jwtToken = localStorage.getItem('jwt');
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
});

// Export your Axios instance
export default api;
