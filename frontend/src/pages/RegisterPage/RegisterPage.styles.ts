import { Box, styled } from '@mui/material';

export const StyledBoxMain = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  marginTop: 25,

  alignItems: 'center',
  width: '100%',
}));

export const StyledBox = styled(Box)(() => ({
  marginTop: '3px',
  display: 'flex',
  flexDirection: 'row',
  gap: 15,

  alignItems: 'center',
  width: '20rem',
}));
