import { User } from "../pages/UsersPage/UsersPage";
import apiClient from "./apiClient";
import { handleApiCall } from "../utils/handleApiCall";
import { ApiResponse } from "../types/api-response";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  email: string;
  firstname: string;
}

export const loginUser = async ({ userEmail, userPassword }: { userEmail: string; userPassword: string }) : Promise<AuthResponse>  => {
    // return handleApiCall(apiClient.post<ApiResponse<AuthResponse>>('/auth/login/', { email: userEmail, password: userPassword }));
    // Call your API using handleApiCall to log in
    const response = await handleApiCall(
      apiClient.post<ApiResponse<AuthResponse>>('/auth/login/', { email: userEmail, password: userPassword })
    );

    // Assuming the response contains the access_token and refresh_token
    const { access_token, refresh_token } = response;

    console.log("Token", access_token);
    // Store tokens in local storage
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    // Return the response data for further use if needed
    return response;
  };
  
export const signupUser = async (data: User): Promise<AuthResponse> => {
    // return handleApiCall(apiClient.post<ApiResponse<AuthResponse>>("/auth/signup/", data));

    // Perform the API call using handleApiCall
    const response = await handleApiCall(
      apiClient.post<ApiResponse<AuthResponse>>('/auth/signup/', data)
    );

    // Assuming the response contains the access_token and refresh_token
    const { access_token, refresh_token } = response;

    // Store tokens in local storage
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    // Return the response data for further use if needed
    return response;

  };

// Refresh Token
export const refreshToken = async (): Promise<string> => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) {
    throw new Error('Refresh token not available');
  }

  try {
    // Use handleApiCall to make the API call
    const response = await handleApiCall<{ access_token: string }>(
      apiClient.post('/auth/token/refresh/', { refresh })
    );

    const { access_token } = response;

    // Store the new access token in localStorage
    localStorage.setItem('accessToken', access_token);

    return access_token;
  } catch (error) {
    // Check if the error is an instance of Error and handle it appropriately
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to refresh token');
    } else {
      throw new Error('Failed to refresh token');
    }
  }
};