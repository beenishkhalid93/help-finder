import { FC } from 'react';
import {
  StyledBox,
  StyledButtonContained,
  StyledButtonOutlined,
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
    <StyledBox mt={16}>
      {showLogin && (
        <StyledButtonContained
          variant="contained"
          color="success"
          startIcon={<Login />}
          onClick={clickLogin}
        >
          Login
        </StyledButtonContained>
      )}
      {showRegister && (
        <StyledButtonOutlined
          variant="outlined"
          color="success"
          startIcon={<AppRegistration />}
          onClick={clickRegister}
        >
          Register
        </StyledButtonOutlined>
      )}
    </StyledBox>
  );
};

export default AuthButtonGroup;
