import { FC, useState } from 'react';
import {
  FullPageWrapper,
  StyledButtonContained,
  StyledBoxMain,
  StyledTextField,
} from './LoginPage.styles';
import { useNavigate } from 'react-router-dom';
import { InputAdornment, IconButton } from '@mui/material';
import AppHeader from '../../components/AppHeader/AppHeader';
import {
  LockOpen,
  Login,
  Mail,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { isValidEmail, isValidPassword } from '../../utils/validation';

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Toggle password visibility
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

  // Handle input change
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value); // Update state with the input value
  };

  // Handle input change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordText(event.target.value); // Update state with the input value
  };

  return (
    <FullPageWrapper maxWidth="md">
      <AppHeader />

      <StyledBoxMain>
        <StyledTextField
          required
          id="email-required"
          placeholder="Email"
          variant="outlined"
          value={emailText} // Bind state to TextField value
          onChange={handleEmailChange}
          error={emailError} // Shows error style if emailError is true
          helperText={emailError ? 'Error: Invalid email' : ''} // Conditional helper text
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              ),
            },
          }}
        />

        <StyledTextField
          required
          id="password-required"
          placeholder="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'} // Toggle input type
          value={passwordText} // Bind state to TextField value
          onChange={handlePasswordChange}
          error={passwordError} // Shows error style if passwordError is true
          helperText={passwordError ? 'Error: Invalid password' : ''} // Conditional helper text
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpen />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <StyledButtonContained
          variant="contained"
          color="success"
          startIcon={<Login />}
          onClick={handleClickLogin}
        >
          Login
        </StyledButtonContained>
      </StyledBoxMain>
    </FullPageWrapper>
  );
};

export default LoginPage;
