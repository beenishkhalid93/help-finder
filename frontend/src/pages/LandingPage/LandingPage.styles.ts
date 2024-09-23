import { Typography, styled } from '@mui/material';

export const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic', 
  padding: theme.spacing(3, 0),
}));

export const DesTypography = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  marginBottom: theme.spacing(2),
}));

