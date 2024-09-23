import { Box, Button, styled } from "@mui/material";
import theme from "../../theme/theme";

export const AuthButtonsContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  
    alignItems: 'center',
    width: '100%', 
  }));

  export const LoginButton = styled(Button)(({theme}) => ({
    borderRadius: '20px', 
    width: '20rem',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark, 
    },
  }));
  
  export const RegisterButton = styled(Button)(() => ({
    width: '20rem',
    borderRadius: '20px',
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }));