import { Typography, Box, Container, styled, Button } from '@mui/material';

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif', // Custom font family
  fontSize: '35px', // Custom font size
  fontWeight: 'bold', // Bold text
  fontStyle: 'italic', // Margin below the typography
  padding: theme.spacing(3, 0),
}));

export const StyledTypographyMain = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif', // Custom font family
  fontSize: '20px', // Custom font size
  fontWeight: 'bold', // Bold text
  fontStyle: 'italic',
  marginBottom: theme.spacing(2), // Margin below the typography
}));

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,

  alignItems: 'center',
  width: '100%', // Full width for mobile responsiveness
}));

export const StyledButtonContained = styled(Button)(() => ({
  borderRadius: '20px', // Custom border-radius for rounded corners
  width: '20rem',
}));

export const StyledButtonOutlined = styled(Button)(() => ({
  border: '2px solid #1a761e', // Custom border color and width
  borderRadius: '20px', // Custom border-radius for rounded corners
  '&:hover': {
    border: '2px solid #388E3C', // Border color change on hover
  },
  width: '20rem',
}));

export const FullPageWrapper = styled(Container)(() => ({
  textAlign: 'center', // Center text within the container
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh', // Full viewport height
  // minWidth: '100vw',  // Full viewport width
  color: 'black',
  backgroundColor: '#ffffff', // Optional background color (white in this case)
  // flexDirection: 'row',   // Flex items in a row
  // backgroundImage: `url(${"../src/assets/images/bg2.png"})`, // Use the imported image
  // backgroundSize: 'cover',    // Set width to 80% of the container, height adjusts automatically
  // backgroundPositionX: 'center',
  // backgroundRepeat: 'no-repeat',
}));
