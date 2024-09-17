import { FC } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { } from "./LandingPageStyles";
import { StyledBox, FullPageWrapper, StyledTypography, StyledTypographyMain, StyledButton} from "./LandingPageStyles";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


const LandingPage: FC = () => {
    return(

    <FullPageWrapper maxWidth="lg">
            <StyledTypography variant="h4" gutterBottom>Welcome to Help Finder </StyledTypography>
            <StyledTypographyMain variant="body1">Help Finder is a platform designed to support you in overcoming 
                    challenges by offering financial aid and opening cases related to your situation. 
                    Whether it's financial help or case management, we're here to assist you through tough times.  
            </StyledTypographyMain>

            <StyledBox mt={16}>
            <StyledButton variant="contained" color="success" startIcon={<LoginIcon />} onClick={() => {
                        alert(`Login user`);
                    }} >Login</StyledButton>

            <StyledButton variant="contained" color="success" startIcon={<AppRegistrationIcon />} onClick={() => {
                        alert(`Register user`);
                    }} >Register</StyledButton>
            </StyledBox>
    </FullPageWrapper>
)};
   
   export default LandingPage