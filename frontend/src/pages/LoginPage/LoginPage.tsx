import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import AppHeader from '../../components/AppHeader/AppHeader';
import { LockOpen, Mail, Visibility, VisibilityOff } from '@mui/icons-material';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import AuthButtonGroup from '../../components/AuthButtonGroup/AuthButtonGroup';
import {
  FullPageWrapper,
  TextFieldContainer,
} from '../../styles/common.styles';
import axios from 'axios';
import { loginUser } from '../../services/authService';

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword((prev: unknown) => !prev);
  };
  const handleClickLogin = async (): Promise<void> => {
    setEmailError(!isValidEmail(emailText));
    setPasswordError(!isValidPassword(passwordText));

    if (isValidEmail(emailText) && isValidPassword(passwordText)) {
      try {
        await loginUser({
          userEmail: emailText,
          userPassword: passwordText,
        });
        navigate('/dashboard');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'Login failed');
        } else {
          setError('An unexpected error occurred');
        }
      }
    }
  };

  function handleClickRegister(): void {
    navigate('/register');
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordText(event.target.value);
  };

  return (
    <FullPageWrapper maxWidth="md">
      <AppHeader />

      <TextFieldContainer>
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

      {error && (
        <Typography variant="h6" color="error" sx={{ marginTop: '8px' }}>
          {error}
        </Typography>
      )}
      <AuthButtonGroup
        showLogin={true}
        showRegister={true}
        clickLogin={handleClickLogin}
        clickRegister={handleClickRegister}
      />
    </FullPageWrapper>
  );
};

export default LoginPage;
