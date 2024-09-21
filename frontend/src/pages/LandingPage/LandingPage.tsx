import { FC } from 'react';
import {
  FullPageWrapper,
  StyledBox,
  StyledButtonContained,
  StyledButtonOutlined,
  StyledTypography,
  StyledTypographyMain,
} from './LandingPage.styles';
import { AppRegistration, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage: FC = () => {
  const navigate = useNavigate();

  function handleClickLogin(): void {
    navigate('/login');
  }

  function handleClickRegister(): void {
    navigate('/register');
  }

  return (
    <FullPageWrapper maxWidth="lg">
      <StyledTypography variant="h4" gutterBottom>
        Welcome to Help Finder{' '}
      </StyledTypography>

      <StyledTypographyMain variant="body1">
        Help Finder is a platform designed to support you in overcoming
        challenges by offering financial aid and opening cases related to your
        situation. Whether it's financial help or case management, we're here to
        assist you through tough times.
      </StyledTypographyMain>

      <StyledBox mt={16}>
        <StyledButtonContained
          variant="contained"
          color="success"
          startIcon={<Login />}
          onClick={handleClickLogin}
        >
          Login
        </StyledButtonContained>

        <StyledButtonOutlined
          variant="outlined"
          color="success"
          startIcon={<AppRegistration />}
          onClick={handleClickRegister}
        >
          Register
        </StyledButtonOutlined>
      </StyledBox>
    </FullPageWrapper>
  );
};

export default LandingPage;
