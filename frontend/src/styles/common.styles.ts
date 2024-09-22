import { Container, styled } from "@mui/material";

export const FullPageWrapper = styled(Container)(({ theme }) => ({
    textAlign: 'center', 
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', 
    color: 'black',
    padding: theme.spacing(3, 0),
  }));