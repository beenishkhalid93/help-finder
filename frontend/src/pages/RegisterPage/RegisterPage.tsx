import { FC, useState }  from "react";
import { FullPageWrapper, StyledTypography, StyledBox, StyledButton, StyledBoxMain, StyledTextField} from "./RegisterPageStyle";
import { useNavigate } from "react-router-dom";
import {InputAdornment, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MailIcon from '@mui/icons-material/Mail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const RegisterPage: FC = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword((prev: unknown) => !prev);
    };

    function handleClickLogin(event: unknown): void {
        navigate("/profile");         
    }

    return (

    <FullPageWrapper maxWidth="md">
        
        <StyledTypography variant="h4" gutterBottom >Create New Account</StyledTypography>

        <StyledBoxMain>

        <StyledBox>
            <StyledTextField
                required
                id="firstname-required"
                placeholder="Firstname"
                variant="outlined" 
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
                id="surname-required"
                placeholder="Surname"
                variant="outlined" 
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
            </StyledBox>

            <StyledTextField
                required
                id="email-required"
                placeholder="Email ID"
                variant="outlined" 
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
                id="password-required"
                placeholder="Password"
                variant="outlined" 
                type={showPassword ? 'text' : 'password'} // Toggle input type fullWidth
                slotProps={{
                    input: {
                      startAdornment: (
                            <InputAdornment position="start">
                              <LockOpenIcon />
                            </InputAdornment>
                          ),
                      endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
            />

            <StyledButton variant="contained" color="success" startIcon={<AppRegistrationIcon />} onClick={handleClickLogin} >Register</StyledButton>

        </StyledBoxMain>

    </FullPageWrapper>
    );
};
   
export default RegisterPage;