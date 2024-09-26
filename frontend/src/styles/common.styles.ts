import { Box, Container, styled, IconButton, ListItem, Table, TableRow, Toolbar, Typography } from "@mui/material";
import { AppBarContainer, AppBarText } from "../pages/DashboardPage/DashboardPage.styles";

export const FullPageWrapper = styled(Container)(({ theme }) => ({
    textAlign: 'center', 
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    color: 'black',
    padding: theme.spacing(3, 0),
  }));

export const TextFieldContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 25,
    alignItems: 'center',
    width: '100%',
  }));

export const AppHeaderDashboard = styled(Typography)(({theme}) => ({
        cursor: 'pointer',
        flexGrow: 1,
        marginRight: 0, 
        [theme.breakpoints.up('md')]: {
        marginRight: 48, 
    },
}));

export const IconButtonDashboard = styled(IconButton)(({theme}) => ({
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
}));

export const AppBarContainerDashboard = styled(AppBarContainer)(({theme}) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
}));

export const ToolbarDashboard = styled(Toolbar)(() => ( {
    justifyContent: 'flex-end',
}));

export const AppBarTextDashboard = styled(AppBarText)(({theme}) => ({
        color: theme.palette.secondary.contrastText,
}));

export const SideListBarDashboard = styled(Box)(() => ( {
    width: 250 ,
}));

export const SideListBarName = styled(ListItem)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
}));

export const TableDashboard = styled(Table)(() => ( {
    minWidth: 650,
}));

export const TableRowDashboard = styled(TableRow)(() => ({
    cursor: 'pointer',
    '&:last-child td, &:last-child th': {
      border: 0, 
    },
}));
