import {Typography, Box, Container, styled, Button } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
   // color: '#333',                    // Dark text color
    fontFamily: 'Arial, sans-serif',   // Custom font family
    fontSize: '35px',                 // Custom font size
    fontWeight: 'bold',               // Bold text
    fontStyle: 'italic',   // Margin below the typography
    padding: theme.spacing(3,0),
  }));

  export const StyledTypographyMain = styled(Typography)(({ theme }) => ({
     fontFamily: 'Arial, sans-serif',   // Custom font family
     fontSize: '20px',                 // Custom font size
     fontWeight: 'bold',               // Bold text
     fontStyle: 'italic', 
     marginBottom: theme.spacing(2),   // Margin below the typography
   }));

export const StyledBox = styled(Box)(() => ({
    display: 'flex', 
    flexDirection: 'column', 
    gap: 10,

    alignItems: 'center',
    width: '100%', // Full width for mobile responsiveness
    
}));

// Function to return responsive styles dynamically
const getResponsiveStyles = (theme) => ({
    width: {
      xs: '80%', // Width for extra small screens
      sm: '80%', // Width for small screens
      md: '80%', // Width for medium screens
    },
    fontSize: {
      xs: '16px', // Font size for extra small screens
      sm: '18px', // Font size for small screens
      md: '20px', // Font size for medium screens
    },
    height: '50px', // Fixed height across all sizes
  });

export const StyledButton = styled(Button)(({ theme }) => {
    const responsiveStyles = getResponsiveStyles(theme);
  
    return {
      height: responsiveStyles.height, // Fixed height
      [theme.breakpoints.up('xs')]: {
        width: responsiveStyles.width.xs,
        fontSize: responsiveStyles.fontSize.xs,
      },
      [theme.breakpoints.up('sm')]: {
        width: responsiveStyles.width.sm,
        fontSize: responsiveStyles.fontSize.sm,
      },
      [theme.breakpoints.up('md')]: {
        width: responsiveStyles.width.md,
        fontSize: responsiveStyles.fontSize.md,
      },
    };
  });

export const FullPageWrapper = styled(Container)(() => ({
    textAlign: 'center',       // Center text within the container
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Full viewport height
    // minWidth: '100vw',  // Full viewport width
    color: 'black',
  //  backgroundColor: '#e24977', // Optional background color (white in this case)
   // flexDirection: 'row',   // Flex items in a row
    backgroundImage: `url(${"../src/assets/images/bg2.png"})`, // Use the imported image
    backgroundSize: 'cover',    // Set width to 80% of the container, height adjusts automatically
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
  }));