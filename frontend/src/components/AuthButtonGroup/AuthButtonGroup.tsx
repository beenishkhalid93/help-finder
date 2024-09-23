import { FC } from 'react';
import {
  ColumnButtonContainer,
  ContainedButton,
  OutlinedButton,
} from './AuthButtonGroup.styles';
import { AppRegistration, Login } from '@mui/icons-material';

interface AuthButtonGroupProps {
  showLogin?: boolean;
  showRegister?: boolean;
  clickLogin?: () => void;
  clickRegister?: () => void;
}

const AuthButtonGroup: FC<AuthButtonGroupProps> = ({
  showLogin,
  showRegister,
  clickLogin,
  clickRegister,
}) => {
  return (
    <ColumnButtonContainer mt={16}>
      {showLogin && (
        <ContainedButton
          variant="contained"
          color="success"
          startIcon={<Login />}
          onClick={clickLogin}
        >
          Login
        </ContainedButton>
      )}
      {showRegister && (
        <OutlinedButton
          variant="outlined"
          color="success"
          startIcon={<AppRegistration />}
          onClick={clickRegister}
        >
          Register
        </OutlinedButton>
      )}
    </ColumnButtonContainer>
  );
};

export default AuthButtonGroup;
