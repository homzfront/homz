import axios from 'axios';
import "dotenv/config"
// import Cookies from 'js-cookie';

// Create an instance of Axios with custom configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,  // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
    // You can set other headers as needed
  },
  withCredentials: true,
});


export default api;
