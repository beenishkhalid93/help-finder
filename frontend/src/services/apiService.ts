import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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
    const token = localStorage.getItem('token'); // Example: Add token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // You can handle errors globally here (like redirecting to login on 401, etc.)
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Create reusable methods for your API calls
const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
};

export default apiService;
