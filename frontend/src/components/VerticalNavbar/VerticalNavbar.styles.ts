import { Box, IconButton, ListItem, styled } from "@mui/material";

export const SideListBarName = styled(ListItem)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    color: isSelected ? theme.palette.primary.contrastText : '#000',
    backgroundColor: isSelected ? theme.palette.primary.main : 'inherit', // Conditional text color
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
}));

export const SideListBarDashboard = styled(Box)(() => ( {
    width: 250 ,
}));

export const IconButtonDashboard = styled(IconButton)(({theme}) => ({
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
}));