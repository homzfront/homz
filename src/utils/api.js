import axios from 'axios';
import "dotenv/config"
// import Cookies from 'js-cookie';

// Create an instance of Axios with custom configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: false,
  // credentials: 'include'
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
