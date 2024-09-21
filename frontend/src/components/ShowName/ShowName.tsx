/* import { Typography, Button, Box} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { FC } from "react";
import { StyledBox1, StyledBox2, StyledBox3, StyledContainer, FullPageWrapper, StyledMainBox } from "./ShowNameStyle";

interface ShowNameProps {
    name: string;
    dob: string;
    age: number;
}

const ShowName: FC<ShowNameProps> = (props) => {
    return (
    <FullPageWrapper>
            <StyledBox1>
            <Typography variant="h3">My Profile </Typography>
            </StyledBox1>
            
            <StyledBox2>
            <Typography variant="h6">Hello {props.name} <br/> Date of birth {props.dob}<br/> Age {props.age} </Typography>
            </StyledBox2>

            <StyledBox3>
            <Button variant="contained" color="success" startIcon={<OpenInNewIcon />} onClick={() => {
                        alert(`Hello ${props.name}\n Date of birth ${props.dob}\n Age ${props.age}`);
                    }} >Show Detail</Button>
            </StyledBox3>
    </FullPageWrapper>
    );

    
};
   
export default ShowName */
