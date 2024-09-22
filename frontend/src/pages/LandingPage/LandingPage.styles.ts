import { Typography, styled } from '@mui/material';

export const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif', 
  fontSize: '35px', 
  fontWeight: 'bold', 
  fontStyle: 'italic', 
  padding: theme.spacing(3, 0),
}));

export const DesTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif',
  fontSize: '20px', 
  fontWeight: 'bold', 
  fontStyle: 'italic',
  marginBottom: theme.spacing(2),
}));

