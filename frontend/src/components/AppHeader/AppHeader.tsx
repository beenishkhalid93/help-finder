import { FC } from 'react';
import { StyledBoxTypography } from './AppHeader.styles';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const AppHeader: FC = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/landing');
  };

  return (
    <StyledBoxTypography>
      <Typography
        variant="h4"
        sx={{ cursor: 'pointer' }}
        onClick={handleClickHome}
      >
        Help Finder
      </Typography>
    </StyledBoxTypography>
  );
};

export default AppHeader;
