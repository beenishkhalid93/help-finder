import { Box, Container, styled } from "@mui/material";

export const StyledContainer = styled(Container) (() => ({
    backgroundColor: "#e24977",
    display: 'flex',                  // Flexbox for centering
    flexDirection: 'column',           // Ensures content stacks vertically
    justifyContent: 'center',          // Centers content vertically
    alignItems: 'center',              // Centers content horizontally
    minHeight: '100vh',                // Full viewport height
    minWidth: '100vw',  // Full viewport width
    textAlign: 'center',
}));

export const StyledBox1 = styled(Box)(() => ({
    fontSize: '10rem',
    // mb: 12, 
    fontWeight: 'bold',
    // p: 10, 
   // border: '2px solid black',
}));

export const StyledBox2 = styled(Box)(() => ({
    fontSize: '5rem',
    // mb: 12, 
    // p: 10, 
   // border: '2px solid black',
}));

export const StyledBox3 = styled(Box)(() => ({
    fontSize: '5rem', 
    // mb: 12, 
    fontWeight: 'bold',
    //p: 10, 
   // border: '2px solid black',
}));

export const FullPageWrapper = styled(Box)(() => ({
    textAlign: 'center',       // Center text within the container
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Full viewport height
    minWidth: '100vw',  // Full viewport width
    color: 'black',
  //  backgroundColor: '#e24977', // Optional background color (white in this case)
    flexDirection: 'row',   // Flex items in a row
    backgroundImage: `url(${"../src/assets/images/bg1.jpg"})`, // Use the imported image
    backgroundSize: 'cover',    // Set width to 80% of the container, height adjusts automatically
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
  }));
