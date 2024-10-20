import { useState, useCallback } from 'react';
import { loginUser, signupUser } from '../services/authService';
import { handleApiError } from '../utils/handleApiError';

interface UseAuthHook {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstname: string, surname: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useAuth = (): UseAuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await loginUser({ userEmail: email, userPassword: password });
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setIsAuthenticated(false);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

    // Handle signup
  const signup = useCallback(
        async (firstname: string, surname: string, email: string, password: string) => {
          setLoading(true);
          setError(null);
          try {
            await signupUser({
              firstname,
              surname,
              email,
              password,
            });
          } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            throw new Error(errorMessage); 
          } finally {
            setLoading(false);
          }
        },
        []
      );

  // Logout function
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setError(null);
    // Additional logout logic, like clearing tokens or local storage, can be added here
  }, []);

  return {
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    setError,
  };
};
