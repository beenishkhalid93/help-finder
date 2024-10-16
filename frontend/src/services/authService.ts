import { User } from "../pages/UsersPage/UsersPage";
import apiClient from "./apiClient";
import { handleApiCall } from "../utils/handleApiCall";

export const loginUser = async ({ userEmail, userPassword }: { userEmail: string; userPassword: string }) => {
    return (handleApiCall(apiClient.post('/auth/login/', { email: userEmail, password: userPassword })));
  };
  
export const signupUser = async (data: User) => {
    return (handleApiCall(apiClient.post('/auth/signup/', data)));
  };