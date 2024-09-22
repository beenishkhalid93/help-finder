// Function to validate firstname
export const isValidFirstname = (firstname: string): boolean => {
  const isValid =
    !!firstname && /^[a-zA-Z]{3,50}([ '-][a-zA-Z]{3,50})*$/.test(firstname);
  return isValid;
};

// Function to validate surname
export const isValidSurname = (surname: string): boolean => {
  const isValid =
    !!surname && /^[a-zA-Z]{3,50}([ '-][a-zA-Z]{3,50})*$/.test(surname);
  return isValid;
};

// Function to validate email
export const isValidEmail = (email: string): boolean => {
  // Simple email validation regex
  const isValid = !!email && /\S+@\S+\.\S+/.test(email);
  return isValid;
};

// Function to validate password
export const isValidPassword = (password: string): boolean => {
  const isValid =
    !!password &&
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(
      password,
    );
  return isValid;
};
