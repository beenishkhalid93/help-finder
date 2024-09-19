import { FC } from "react";
import { FullPageWrapper, StyledBox, StyledButton, StyledTypography, StyledTypographyMain } from "./LandingPageStyles";
import { AppRegistration } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

const LandingPage: FC = () => {

    const navigate = useNavigate();

    function handleClickLogin(event: unknown): void {
        navigate("/profile");         
    }

    function handleClickRegister(event: unknown): void {
        navigate("/register");         
    }

    return(
    <FullPageWrapper maxWidth="lg">

            <StyledTypography variant="h4" gutterBottom>Welcome to Help Finder </StyledTypography>

            <StyledTypographyMain variant="body1">Help Finder is a platform designed to support you in overcoming 
                    challenges by offering financial aid and opening cases related to your situation. 
                    Whether it's financial help or case management, we're here to assist you through tough times.  
            </StyledTypographyMain>

            <StyledBox mt={16}>

                <StyledButton variant="contained" color="success" startIcon={<LoginIcon />} onClick={handleClickLogin} >Login</StyledButton>

                <StyledButton variant="contained" color="success" startIcon={<AppRegistration />} onClick={handleClickRegister} >Register</StyledButton>

            </StyledBox>

    </FullPageWrapper>
);
};
   
export default LandingPage;