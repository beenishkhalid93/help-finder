import apiService from "./apiService";
import { ApiResponse } from "../types/api-response";

// Define the interface for a new user
export interface User {
    id?: number;
    firstname: string;
    surname: string;
    email: string;
    password?: string;
  }

export const getUsers = async () => {
    try {
      const response = await apiService.get<ApiResponse<User[]>>(`/users/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

export const getUserById = async (userId: number) => {
    try {
      const response = await apiService.get<ApiResponse<User>>(`/users/${userId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };
  
  // Function to create a new user via POST request
export const createUser = async (data: User) => {
    try {
      const response = await apiService.post<ApiResponse<User>>('/users/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

export const updateUser = async (data: User) => {
    try {
        const response = await apiService.put<ApiResponse<User>>(`/users/${data?.id}/`, data);
        console.log('User updated:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }

  };

export const deleteUser = async (userId: number) => {
      try {
        const response = await apiService.delete<ApiResponse<void>>(`/users/${userId}/`);
        return response.data;
      } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
      }
  };