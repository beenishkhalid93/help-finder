import { FC, useState } from 'react';
import { RowContainer } from './RegisterPage.styles';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
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
import axios from 'axios';

// Define the interface for a new user
interface NewUser {
  firstname: string;
  surname: string;
  email: string;
  password: string;
}

// Define the API URL
const API_URL = 'http://localhost:8000/api/users/';

// Function to create a new user via POST request
const createUser = async (userData: NewUser) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [firstnameText, setFirstnameText] = useState('');
  const [surnameText, setSurnameText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const [firstnameError, setFirstnameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev: unknown) => !prev);
  };

  const handleClickRegister = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setFirstnameError(!isValidFirstname(firstnameText));
    setSurnameError(!isValidSurname(surnameText));
    setEmailError(!isValidEmail(emailText));
    setPasswordError(!isValidPassword(passwordText));
    if (
      isValidFirstname(firstnameText) &&
      isValidSurname(surnameText) &&
      isValidEmail(emailText) &&
      isValidPassword(passwordText)
    ) {
      // Create a new user object
      const newUser: NewUser = {
        firstname: firstnameText,
        surname: surnameText,
        email: emailText,
        password: passwordText,
      };
      try {
        const createdUser = await createUser(newUser);
        console.log('User created:', createdUser);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  const handleFirstnameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstnameText(event.target.value); // Update state with the input value
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameText(event.target.value); // Update state with the input value
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value); // Update state with the input value
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordText(event.target.value); // Update state with the input value
  };

  return (
    <FullPageWrapper maxWidth="md">
      <AppHeader />

      <TextFieldContainer>
        <RowContainer>
          <CustomTextField
            placeholder={'Firstname'}
            value={firstnameText}
            onChange={handleFirstnameChange}
            error={firstnameError}
            startIcon={<AccountCircle />}
            helperText={firstnameError ? 'Error: Invalid firstname' : ''}
          />

          <CustomTextField
            placeholder={'Surname'}
            value={surnameText}
            onChange={handleSurnameChange}
            error={surnameError}
            startIcon={<AccountCircle />}
            helperText={surnameError ? 'Error: Invalid surname' : ''}
          />
        </RowContainer>

        <CustomTextField
          placeholder={'Email'}
          value={emailText}
          onChange={handleEmailChange}
          error={emailError}
          startIcon={<Mail />}
          helperText={emailError ? 'Error: Invalid email' : ''}
        />

        <CustomTextField
          placeholder={'Password'}
          value={passwordText}
          onChange={handlePasswordChange}
          error={passwordError}
          startIcon={<LockOpen />}
          type={showPassword ? 'text' : 'password'}
          helperText={passwordError ? 'Error: Invalid password' : ''}
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
    </FullPageWrapper>
  );
};

export default RegisterPage;
