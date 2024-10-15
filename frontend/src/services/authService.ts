import axios from "axios";
import apiService from "./apiService";
import { User } from "./userService";

export const loginUser = async ({ userEmail, userPassword }: { userEmail: string; userPassword: string }) => {
    try {
        const response = await apiService.post('/auth/login/', {
          email: userEmail,
          password: userPassword,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error; 
        } else {
            throw new Error('An unexpected error occurred'); 
        }
    }
  };

  export const signupUser = async (data: User) => {
    try {
        const response = await apiService.post('/auth/signup/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error; 
        } else {
            throw new Error('An unexpected error occurred'); 
        }
    }
  };