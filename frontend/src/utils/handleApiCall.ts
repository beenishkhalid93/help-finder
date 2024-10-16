import { AxiosResponse } from 'axios';
import { ApiResponse } from '../types/api-response';

// Generic function for API handling
export const handleApiCall = async <T>(apiCall: Promise<AxiosResponse<ApiResponse<T>>>): Promise<T> => {
  try {
    const axiosResponse =  await apiCall;
    const response = axiosResponse.data;
    if (response.status === "success") {
      return response.data as T;
    } else {
      throw new Error(response.message || 'Something went wrong');
    }
  } catch (error: unknown) {
    if(error instanceof Error){
      console.log('Error 1: ',error);
      throw new Error(error?.message);
    }
    throw new Error('An unexpected error occured');
    
  }
};
