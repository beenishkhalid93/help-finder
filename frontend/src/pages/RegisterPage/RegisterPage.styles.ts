import { Box, styled } from '@mui/material';

export const RowContainer = styled(Box)(() => ({
  marginTop: '3px',
  display: 'flex',
  flexDirection: 'row',
  gap: 15,

  alignItems: 'center',
  width: '20rem',
}));
