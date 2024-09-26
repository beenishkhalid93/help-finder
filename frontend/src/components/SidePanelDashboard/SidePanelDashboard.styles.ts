import { ListItem, styled } from "@mui/material";

export const SideListBarName = styled(ListItem)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
}));