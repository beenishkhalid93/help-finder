import axios from "axios";

export const handleApiError = (error: unknown) => {

    let errorMessage = '';
    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Login failed';
      } 
    else {
        errorMessage = String(error);
        if (errorMessage.startsWith('Error: ')) {
          errorMessage = errorMessage.replace('Error: ', '');
          return errorMessage;
        }
      }

    return errorMessage;
}