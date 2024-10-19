import { useState, useCallback } from 'react';
import { Case } from '../pages/CasesPage/CasesPage';
import { getCases, createCase, updateCase, deleteCase } from '../services/caseService';
import { handleApiError } from '../utils/handleApiError';

interface UseCaseReturn {
  cases: Case[];
  loading: boolean;
  error: string | null;
  fetchCases: () => Promise<void>;
  addCase: (data: Case) => Promise<void>;
  editCase: (data: Case) => Promise<void>;
  removeCase: (caseId: number) => Promise<void>;
}

export const useCase = (): UseCaseReturn => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cases
  const fetchCases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCases = await getCases();
      setCases(fetchedCases);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Add case
  const addCase = useCallback(async (data: Case) => {
    setLoading(true);
    setError(null);
    try {
      const newCase = await createCase(data);
      setCases((prevCases) => [...prevCases, newCase]);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Edit case
  const editCase = useCallback(async (data: Case) => {
    setLoading(true);
    setError(null);
    try {
      await updateCase(data);
      setCases((prevCases) =>
        prevCases.map((caseItem) => (caseItem.id === data.id ? data : caseItem))
      );
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove case
  const removeCase = useCallback(async (caseId: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCase(caseId);
      setCases((prevCases) => prevCases.filter((caseItem) => caseItem.id !== caseId));
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cases,
    loading,
    error,
    fetchCases,
    addCase,
    editCase,
    removeCase,
  };
};
