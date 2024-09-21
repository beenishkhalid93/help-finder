import {Typography, Box, styled} from "@mui/material";

export const StyledBoxTypography = styled(Box)(({ theme }) => ({
    fontFamily: 'Arial, sans-serif',   // Custom font family
    fontSize: '35px',                 // Custom font size
    fontWeight: 'bold',               // Bold text
    fontStyle: 'italic',   // Margin below the typography
    padding: theme.spacing(3,0),
    display: 'flex',            // Use flexbox to center the Typography
    justifyContent: 'center',   // Horizontally center the Typography
    alignItems: 'center', 
    
   }));

export const StyledTypography = styled(Typography)(() => ({
     cursor: 'pointer'
}));