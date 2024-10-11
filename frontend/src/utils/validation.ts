export const isValidFirstname = (firstname: string): boolean => {
  const isValid = !!firstname.trim() && /^[a-zA-Z]{3,50}(?:[ '-][a-zA-Z]{3,50})*$/.test(firstname.trim());
  return isValid;
};


export const isValidSurname = (surname: string): boolean => {

  const isValid = !!surname.trim() && /^[a-zA-Z]{3,50}(?:[ '-][a-zA-Z]{3,50})*$/.test(surname.trim());
  return isValid;
};


export const isValidEmail = (email: string): boolean => {
  const isValid = !!email && /\S+@\S+\.\S+/.test(email);
  return isValid;
};

export const isValidPassword = (password: string): boolean => {
  const isValid =
    !!password &&
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(
      password,
    );
  return isValid;
};
