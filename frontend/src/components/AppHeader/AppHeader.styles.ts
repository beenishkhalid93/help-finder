import { Box, styled } from '@mui/material';

export const CenterlizedHeaderContainer = styled(Box)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif', 
  fontSize: '35px', 
  fontWeight: 'bold', 
  fontStyle: 'italic', 
  padding: theme.spacing(3, 0),
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
}));
