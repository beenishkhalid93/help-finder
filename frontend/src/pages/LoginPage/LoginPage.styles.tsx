import { Box, Container, styled, Button, TextField } from '@mui/material';

export const StyledBoxMain = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  marginTop: 25,
  alignItems: 'center',
  width: '100%', // Full width for mobile responsiveness
}));

export const StyledButtonContained = styled(Button)(() => ({
  borderRadius: '20px', // Custom border-radius for rounded corners
  width: '20rem',
  marginTop: '30px',
}));

// Function to return responsive styles dynamically
const getResponsiveStyles = () => ({
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

export const StyledTextField = styled(TextField)(({ theme }) => {
  const responsiveStyles = getResponsiveStyles();

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

export const FullPageWrapper = styled(Container)(({ theme }) => ({
  // display: 'flex',
  // flexDirection: 'row',
  textAlign: 'center', // Center text within the container
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh', // Full viewport height
  color: 'black',
  padding: theme.spacing(3, 0),
}));
