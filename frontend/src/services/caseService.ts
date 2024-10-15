import { ApiResponse } from "../types/api-response";
import apiService from "./apiService";

export interface Case {
    id?: number;
    title: string;
    name: string;
    dateOpened: string;
    status: string;
  }

export const getCases = async () => {
    try {
      const response = await apiService.get<ApiResponse<Case[]>>(`/cases/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cases:', error);
      throw error;
    }
  };

export const createCase = async (data: Case) => {
    try {
      const response = await apiService.post<ApiResponse<Case>>('/cases/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating case:', error);
      throw error;
    }
  };

  export const updateCase = async (data: Case) => {
    try {
      const response = await apiService.put<ApiResponse<Case>>(`/cases/${data.id}/`, data);
      console.log('Case updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };

  export const deleteCase = async (caseId: number) => {
    try {
      await apiService.delete<ApiResponse<void>>(`/cases/${caseId}/`);
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };