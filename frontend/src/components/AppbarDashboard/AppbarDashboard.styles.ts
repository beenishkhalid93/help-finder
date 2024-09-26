import { Box, styled, Typography } from "@mui/material";

export const AppBarText = styled(Typography)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    flexGrow: 1,
    cursor: 'pointer',
    marginRight: theme.spacing(2), // Use theme.spacing for consistent margin
    fontWeight: isSelected ? 'bold' : 'normal', // Bold text for selected tab
    color: isSelected ? theme.palette.secondary.contrastText : 'inherit', // Conditional text color
  }));

export const AppHeaderDashboard = styled(Typography)(({theme}) => ({
    cursor: 'pointer',
    flexGrow: 1,
    marginRight: 0, 
    [theme.breakpoints.up('md')]: {
    marginRight: 48, 
},
}));

export const AppBarContainerDashboard = styled(Box)(({theme}) => ({
    alignItems: 'center',
    gap: 10,
    display: 'none',
    [theme.breakpoints.up('md')]: {
    display: 'flex',
},
}));