import { FC } from "react";
import { FullPageWrapper, StyledTypography, StyledBox, StyledButton, StyledBoxText, StyledTextField} from "./RegisterPageStyle";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MailIcon from '@mui/icons-material/Mail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const RegisterPage: FC = () => {

    const navigate = useNavigate();

    function handleClickLogin(event: unknown): void {
        navigate("/profile");         
    }

    return (

    <FullPageWrapper maxWidth="md">
        
        <StyledTypography variant="h4" gutterBottom >Create New Account</StyledTypography>

        <StyledBox>

            <StyledTextField
                required
                id="outlined-required"
                label="Firstname"
                variant="standard" 
                placeholder="John"
                slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    },
                  }}
            />

            <StyledTextField
                required
                id="outlined-required"
                label="Surname"
                variant="standard" 
                placeholder="Doe"
                slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    },
                  }}
            />

            <StyledTextField
                required
                id="outlined-required"
                label="Email ID"
                variant="standard" 
                placeholder="example@domain.com"
                slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
            />

            <StyledTextField
                required
                id="outlined-required"
                label="Password"
                variant="standard" 
                slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
            />

            <StyledButton variant="contained" color="success" startIcon={<AppRegistrationIcon />} onClick={handleClickLogin} >Register</StyledButton>

        </StyledBox>

    </FullPageWrapper>
    );
};
   
export default RegisterPage;