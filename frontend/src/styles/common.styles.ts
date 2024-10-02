import { Box, Container, styled, Table, TableRow } from "@mui/material";

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

export const TableDashboard = styled(Table)(() => ( {
    minWidth: 650,
}));

export const TableRowDashboard = styled(TableRow)(() => ({
    cursor: 'pointer',
    '&:last-child td, &:last-child th': {
      border: 0, 
    },
}));