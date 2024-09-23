import { Box, styled } from '@mui/material';

export const RowContainer = styled(Box)(() => ({
  marginTop: '3px',
  display: 'flex',
  flexDirection: 'row',
  gap: 10,

  alignItems: 'center',
  width: '20rem',
}));
