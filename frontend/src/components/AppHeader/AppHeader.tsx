import { FC } from 'react';
import { CenterlizedHeaderContainer } from './AppHeader.styles';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const AppHeader: FC = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/landing');
  };

  return (
    <CenterlizedHeaderContainer>
      <Typography
        variant="h4"
        sx={{ cursor: 'pointer' }}
        onClick={handleClickHome}
      >
        Help Finder
      </Typography>
    </CenterlizedHeaderContainer>
  );
};

export default AppHeader;
