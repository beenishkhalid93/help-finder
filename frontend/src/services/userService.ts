
import { User } from "../pages/UsersPage/UsersPage";
import { ApiResponse } from "../types/api-response";
import { handleApiCall } from "../utils/handleApiCall";
import apiClient from "./apiClient";

export const getUsers = async () : Promise<User[]>  => {
  return (handleApiCall(apiClient.get<ApiResponse<User[]>>(`/users/`)));
};

export const getUserById = async (userId: number) : Promise<User> => {
  return (handleApiCall(apiClient.get<ApiResponse<User>>(`/users/${userId}/`)));
};

export const createUser = async (data: User) : Promise<User>  => {
  return (handleApiCall(apiClient.post<ApiResponse<User>>('/users/create/', data)));
};

export const updateUser = async (data: User) : Promise<User>  => {
  return (handleApiCall(apiClient.put<ApiResponse<User>>(`/users/update/${data.id}/`, data)));
};

export const deleteUser = async (userId: number) : Promise<void> => {
  return (handleApiCall(apiClient.delete<ApiResponse<void>>(`/users/delete/${userId}/`)));
};