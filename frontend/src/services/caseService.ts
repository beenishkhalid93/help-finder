import { Case } from "../pages/CasesPage/CasesPage";
import { ApiResponse } from "../types/api-response";
import { handleApiCall } from "../utils/handleApiCall";
import apiClient from "./apiClient";

export const getCases = async () : Promise<Case[]> => {
  return (handleApiCall(apiClient.get<ApiResponse<Case[]>>(`/cases/`)));
};

export const createCase = async (data: Case) : Promise<Case> => {
  return (handleApiCall(apiClient.post<ApiResponse<Case>>('/cases/', data)));
};

export const updateCase = async (data: Case) : Promise<Case> => {
  return (handleApiCall(apiClient.put<ApiResponse<Case>>(`/cases/${data.id}/`, data)));
};

export const deleteCase = async (caseId: number) : Promise<void> => {
  return (handleApiCall(apiClient.delete<ApiResponse<void>>(`/cases/${caseId}/`)));
};