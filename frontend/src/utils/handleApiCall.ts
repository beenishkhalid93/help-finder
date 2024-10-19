import { AxiosResponse } from 'axios';
import { ApiResponse } from '../types/api-response';

// Generic function for API handling
export const handleApiCall = async <T>(apiCall: Promise<AxiosResponse<ApiResponse<T>>>): Promise<T> => {
  try {
    const axiosResponse = await apiCall;
    const response = axiosResponse.data;
    
    if (response.status) {
      return response.data as T;
    } else {
      throw { message: response.message || 'Something went wrong', statusCode: axiosResponse.status };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Caught Error: ', error.message);
      throw new Error(error.message);
    }
    throw { message: 'An unexpected error occurred', statusCode: 500 };
  }
};
