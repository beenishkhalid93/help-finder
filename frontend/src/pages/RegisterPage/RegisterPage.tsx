import { FC, useCallback, useState } from 'react';
import { RowContainer } from './RegisterPage.styles';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import {
  AccountCircle,
  Mail,
  LockOpen,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import AppHeader from '../../components/AppHeader/AppHeader';
import {
  isValidFirstname,
  isValidSurname,
  isValidEmail,
  isValidPassword,
} from '../../utils/validation';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import AuthButtonGroup from '../../components/AuthButtonGroup/AuthButtonGroup';
import {
  FullPageWrapper,
  TextFieldContainer,
} from '../../styles/common.styles';
import { signupUser } from '../../services/authService';

// Define the interface for a new user
interface User {
  firstname: string;
  surname: string;
  email: string;
  password: string;
}

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<User>({
    firstname: '',
    surname: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    firstname: false,
    surname: false,
    email: false,
    password: false,
  });

  const [apiError, setApiError] = useState<string>('');
  // Toggles password visibility
  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Consolidate validation logic
  const validateForm = () => {
    const newErrors = {
      firstname: !isValidFirstname(formData.firstname),
      surname: !isValidSurname(formData.surname),
      email: !isValidEmail(formData.email),
      password: !isValidPassword(formData.password),
    };
    setErrors(newErrors);

    return !Object.values(newErrors).includes(true); // Returns false if there are any errors
  };

  // Handles text field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles registration submission
  const handleClickRegister = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const createdUser = await signupUser(formData);
        console.log('User created:', createdUser);
        navigate('/dashboard');
      } catch (error: unknown) {
        console.error(error);
        let errorMessage = String(error);
        if (errorMessage.startsWith('Error: ')) {
          errorMessage = errorMessage.replace('Error: ', '');
        }
        setApiError(errorMessage);
      }
    }
  };

  return (
    <FullPageWrapper maxWidth="md">
      <AppHeader />

      <TextFieldContainer>
        <RowContainer>
          <CustomTextField
            placeholder={'Firstname'}
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            error={errors.firstname}
            startIcon={<AccountCircle />}
            helperText={errors.firstname ? 'Error: Invalid firstname' : ''}
          />

          <CustomTextField
            placeholder={'Surname'}
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            error={errors.surname}
            startIcon={<AccountCircle />}
            helperText={errors.surname ? 'Error: Invalid surname' : ''}
          />
        </RowContainer>

        <CustomTextField
          placeholder={'Email'}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          startIcon={<Mail />}
          helperText={errors.email ? 'Error: Invalid email' : ''}
        />

        <CustomTextField
          placeholder={'Password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          startIcon={<LockOpen />}
          type={showPassword ? 'text' : 'password'}
          helperText={errors.password ? 'Error: Invalid password' : ''}
          endIcon={
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </TextFieldContainer>

      <AuthButtonGroup
        showRegister={true}
        clickRegister={handleClickRegister}
      />
      {apiError && (
        <Typography variant="body1" color="error">
          {apiError}
        </Typography>
      )}
    </FullPageWrapper>
  );
};

export default RegisterPage;
