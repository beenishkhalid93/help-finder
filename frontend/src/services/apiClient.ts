import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {jwtDecode} from 'jwt-decode';
import { refreshToken } from './authService';

const publicRoutes = ['/auth/login/', '/auth/signup/'];

// Create an Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Base URL for your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to modify request headers (e.g., add an authorization token)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const isPublicRoute = publicRoutes.includes(config.url || '');
    console.log("is public",isPublicRoute)
    if(!isPublicRoute) {
      const token = localStorage.getItem('accessToken'); // Example: Add token from localStorage
      console.log('token: ', token);
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log('Decoded JWT:', decodedToken);
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Request headers:', config.headers);
      }
    }

    console.log('Request headers:', config.headers);
    
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              const newToken = await refreshToken();
              axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
              return apiClient(originalRequest);
          } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
          }
      }
      return Promise.reject(error);
  }
);


// Interceptor to handle responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // You can handle errors globally here (like redirecting to login on 401, etc.)
    const errorMessage = error.response.data?.error || error.response.data?.message || 'Server error occurred';
    console.error('API Error:', error);
    return Promise.reject(new Error(errorMessage));
  }
);

// // Create reusable methods for your API calls
// const apiClient = {
//   get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
//     apiClient.get(url, config),

//   post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
//     apiClient.post(url, data, config),

//   put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
//     apiClient.put(url, data, config),

//   delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
//     apiClient.delete(url, config),
// };

export default apiClient;
