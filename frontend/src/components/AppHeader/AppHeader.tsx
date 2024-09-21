import { FC }  from "react";
import {StyledTypography, StyledBoxTypography} from "./AppHeader.styles";
import { useNavigate } from "react-router-dom";

const AppHeader: FC = () => {

    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate("/landing");
      };

    return (
        <StyledBoxTypography>
            <StyledTypography variant="h4" onClick={handleClickHome}>Help Finder</StyledTypography>
        </StyledBoxTypography>
    );
};

export default AppHeader