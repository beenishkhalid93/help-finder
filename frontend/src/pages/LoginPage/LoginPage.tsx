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
import { useAuth } from '../../hooks/useAuth';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { login, error, loading, setError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickLogin = async (): Promise<void> => {
    setEmailError(!isValidEmail(emailText));
    setPasswordError(!isValidPassword(passwordText));

    if (isValidEmail(emailText) && isValidPassword(passwordText)) {
      await login(emailText, passwordText);
      navigate('/dashboard');
    }
  };

  const handleClickRegister = (): void => {
    navigate('/register');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value);
    setError(null);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordText(event.target.value);
    setError(null);
  };

  return (
    <FullPageWrapper maxWidth="md">
      <AppHeader />

      <TextFieldContainer>
        <CustomTextField
          placeholder="Email"
          value={emailText}
          onChange={handleEmailChange}
          error={emailError}
          startIcon={<Mail />}
          helperText={emailError ? 'Error: Invalid email' : ''}
        />

        <CustomTextField
          placeholder="Password"
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

      {loading && <Typography variant="h6">Loading...</Typography>}

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
