import axios from 'axios';
import { apiConfig } from '@/constants/api';

const axiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 10000, // 10 seconds
});


axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';

    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle response data 
    return response;
  },
  (error) => {
    // Handle errors here, like redirecting to login if unauthorized
    if (error.response && error.response.status === 401) {
      // Redirect to login or any other logic
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;