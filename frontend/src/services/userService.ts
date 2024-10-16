
import { User } from "../pages/UsersPage/UsersPage";
import { ApiResponse } from "../types/api-response";
import { handleApiCall } from "../utils/handleApiCall";
import apiClient from "./apiClient";

export const getUsers = async () => {
  return (handleApiCall(apiClient.get<ApiResponse<User[]>>(`/users/`)));
};

export const getUserById = async (userId: number) => {
  return (handleApiCall(apiClient.get<ApiResponse<User>>(`/users/${userId}/`)));
};

export const createUser = async (data: User) => {
  return (handleApiCall(apiClient.post<ApiResponse<User>>('/users/', data)));
};

export const updateUser = async (data: User) => {
  return (handleApiCall(apiClient.put<ApiResponse<User>>(`/users/${data.id}/`, data)));
};

export const deleteUser = async (userId: number) => {
  return (handleApiCall(apiClient.delete<ApiResponse<void>>(`/users/${userId}/`)));
};