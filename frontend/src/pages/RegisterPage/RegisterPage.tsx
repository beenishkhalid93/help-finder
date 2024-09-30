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

  function handleClickRegister(): void {
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
      navigate('/dashboard');
    }
  }

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
