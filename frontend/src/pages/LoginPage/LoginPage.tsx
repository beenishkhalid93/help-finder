import { FC, useState } from 'react';
import { StyledBoxMain } from './LoginPage.styles';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AppHeader from '../../components/AppHeader/AppHeader';
import { LockOpen, Mail, Visibility, VisibilityOff } from '@mui/icons-material';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import AuthButtonGroup from '../../components/AuthButtonGroup/AuthButtonGroup';
import { FullPageWrapper } from '../../styles/common.styles';

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev: unknown) => !prev);
  };

  function handleClickLogin(): void {
    setEmailError(!isValidEmail(emailText));
    setPasswordError(!isValidPassword(passwordText));
    if (isValidEmail(emailText) && isValidPassword(passwordText)) {
      navigate('/profile');
    }
  }

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

      <StyledBoxMain>
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

        <AuthButtonGroup
          showLogin={true}
          showRegister={true}
          clickLogin={handleClickLogin}
          clickRegister={handleClickRegister}
        />
      </StyledBoxMain>
    </FullPageWrapper>
  );
};

export default LoginPage;
