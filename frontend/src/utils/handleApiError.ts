import axios from "axios";

export const handleApiError = (error: unknown): string => {
  let errorMessage = 'An unexpected error occurred';

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || 'An error occurred while processing the request';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  if (errorMessage.startsWith('Error: ')) {
    errorMessage = errorMessage.replace('Error: ', '');
  }

  console.error('Caught Error:', errorMessage);
  return errorMessage;
};
