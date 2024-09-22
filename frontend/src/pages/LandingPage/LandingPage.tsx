import { FC } from 'react';
import { HeaderTypography, DesTypography } from './LandingPage.styles';
import { useNavigate } from 'react-router-dom';
import AuthButtonGroup from '../../components/AuthButtonGroup/AuthButtonGroup';
import { FullPageWrapper } from '../../styles/common.styles';

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
      <HeaderTypography variant="h4" gutterBottom>
        Welcome to Help Finder{' '}
      </HeaderTypography>

      <DesTypography variant="body1">
        Help Finder is a platform designed to support you in overcoming
        challenges by offering financial aid and opening cases related to your
        situation. Whether it's financial help or case management, we're here to
        assist you through tough times.
      </DesTypography>

      <AuthButtonGroup
        showLogin={true}
        showRegister={true}
        clickLogin={handleClickLogin}
        clickRegister={handleClickRegister}
      />
    </FullPageWrapper>
  );
};

export default LandingPage;
