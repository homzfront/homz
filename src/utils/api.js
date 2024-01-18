import axios from 'axios';
// import Cookies from 'js-cookie';

// Create an instance of Axios with custom configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',  // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
    // You can set other headers as needed
  },
  withCredentials: true,
});



export default api;
