import axios from "axios";
import apiService from "./apiService";

export const loginUser = async ({ userEmail, userPassword }: { userEmail: string; userPassword: string }) => {
    try {
        const response = await apiService.post('/login/', {
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