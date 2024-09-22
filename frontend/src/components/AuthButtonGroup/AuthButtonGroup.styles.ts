import { Box, Button, styled } from "@mui/material";

export const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  
    alignItems: 'center',
    width: '100%', 
  }));

  export const StyledButtonContained = styled(Button)(() => ({
    borderRadius: '20px', 
    width: '20rem',
  }));
  
  export const StyledButtonOutlined = styled(Button)(() => ({
    border: '2px solid #1a761e', 
    borderRadius: '20px',
    '&:hover': {
      border: '2px solid #388E3C', 
    },
    width: '20rem',
  }));