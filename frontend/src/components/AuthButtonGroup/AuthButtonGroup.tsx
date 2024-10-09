import { FC } from 'react';
import {
  AuthButtonsContainer,
  LoginButton,
  RegisterButton,
} from './AuthButtonGroup.styles';
import { AppRegistration, Login } from '@mui/icons-material';

interface AuthButtonGroupProps {
  showLogin?: boolean;
  showRegister?: boolean;
  clickLogin?: () => void;
  clickRegister?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AuthButtonGroup: FC<AuthButtonGroupProps> = ({
  showLogin,
  showRegister,
  clickLogin,
  clickRegister,
}) => {
  return (
    <AuthButtonsContainer mt={16}>
      {showLogin && (
        <LoginButton
          variant="contained"
          color="primary"
          startIcon={<Login />}
          onClick={clickLogin}
        >
          Login
        </LoginButton>
      )}
      {showRegister && (
        <RegisterButton
          variant="outlined"
          color="secondary"
          startIcon={<AppRegistration />}
          onClick={clickRegister}
        >
          Register
        </RegisterButton>
      )}
    </AuthButtonsContainer>
  );
};

export default AuthButtonGroup;
