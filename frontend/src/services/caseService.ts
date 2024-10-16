import { Case } from "../pages/CasesPage/CasesPage";
import { ApiResponse } from "../types/api-response";
import { handleApiCall } from "../utils/handleApiCall";
import apiClient from "./apiClient";

export const getCases = async () => {
  return (handleApiCall(apiClient.get<ApiResponse<Case[]>>(`/cases/`)));
};

export const createCase = async (data: Case) => {
  return (handleApiCall(apiClient.post<ApiResponse<Case>>('/cases/', data)));
};

export const updateCase = async (data: Case) => {
  return (handleApiCall(apiClient.put<ApiResponse<Case>>(`/cases/${data.id}/`, data)));
};

export const deleteCase = async (caseId: number) => {
  return (handleApiCall(apiClient.delete<ApiResponse<void>>(`/cases/${caseId}/`)));
};