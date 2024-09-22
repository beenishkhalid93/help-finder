import { FC, useState } from 'react';
import {
  FullPageWrapper,
  StyledBox,
  StyledBoxMain,
  StyledTextField,
  StyledButtonOutlined,
} from './RegisterPage.styles';
import { useNavigate } from 'react-router-dom';
import { InputAdornment, IconButton } from '@mui/material';
import {
  AccountCircle,
  Mail,
  LockOpen,
  AppRegistration,
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

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((prev: unknown) => !prev);
  };

  function handleClickLogin(): void {
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
      navigate('/profile');
    }
  }

  // Handle input change
  const handleFirstnameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstnameText(event.target.value); // Update state with the input value
  };

  // Handle input change
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameText(event.target.value); // Update state with the input value
  };

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
        <StyledBox>
          <StyledTextField
            required
            id="firstname-required"
            placeholder="Firstname"
            variant="outlined"
            value={firstnameText} // Bind state to TextField value
            onChange={handleFirstnameChange}
            error={firstnameError} // Shows error style if emailError is true
            helperText={firstnameError ? 'Error: Invalid firstname' : ''} // Conditional helper text
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
          />

          <StyledTextField
            required
            id="surname-required"
            placeholder="Surname"
            variant="outlined"
            value={surnameText} // Bind state to TextField value
            onChange={handleSurnameChange}
            error={surnameError} // Shows error style if emailError is true
            helperText={surnameError ? 'Error: Invalid surname' : ''} // Conditional helper text
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
          />
        </StyledBox>

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

        <StyledButtonOutlined
          variant="contained"
          color="success"
          startIcon={<AppRegistration />}
          onClick={handleClickLogin}
        >
          Register
        </StyledButtonOutlined>
      </StyledBoxMain>
    </FullPageWrapper>
  );
};

export default RegisterPage;
