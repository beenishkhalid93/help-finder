import { Box, styled, Typography } from "@mui/material";

interface TopbarTextProps {
    isselected: boolean;
}

export const TopbarText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isselected'
})<TopbarTextProps>(({ theme, isselected }) => ({
    flexGrow: 1,
    cursor: 'pointer',
    marginRight: theme.spacing(2), // Use theme.spacing for consistent margin
    fontWeight: isselected ? 'bold' : 'normal', // Bold text for selected tab
    color: isselected ? theme.palette.secondary.contrastText : 'inherit', // Conditional text color
  }));

export const TopbarHeader = styled(Typography)(({theme}) => ({
    cursor: 'pointer',
    flexGrow: 1,
    marginRight: 0, 
    [theme.breakpoints.up('md')]: {
    marginRight: 48, 
},
}));

export const TopbarContainer= styled(Box)(({theme}) => ({
    alignItems: 'center',
    gap: 10,
    display: 'none',
    [theme.breakpoints.up('md')]: {
    display: 'flex',
},
}));