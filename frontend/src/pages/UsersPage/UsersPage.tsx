import React, { useState } from 'react';
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import {
  FullPageWrapper,
  IconButtonDashboard,
  SideListBarDashboard,
  SideListBarName,
  TableDashboard,
  TableRowDashboard,
  ToolbarDashboard,
} from '../../styles/common.styles';
import AppbarDashboard from '../../components/AppbarDashboard/AppbarDashboard';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleClickUsers = () => {
    navigate('/users');
  };

  const handleClickCases = () => {
    navigate('/cases');
  };

  const handleClickProfile = () => {
    navigate('/profile');
  };

  const handleRowClickUser = (user_id: number) => {
    navigate(`/profile/${user_id}`);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  function createData(user_id: number, user_name: string, user_email: string) {
    return { user_id, user_name, user_email };
  }

  const rows = [
    createData(1, 'Beenish Khalid', 'beenishkhalid93@gmail.com'),
    createData(2, 'Ikram ul Haq', 'ikramulhaq1992@gmail.com'),
  ];

  return (
    <>
      <AppBar position="static">
        <ToolbarDashboard>
          <IconButtonDashboard
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButtonDashboard>

          <AppbarDashboard selectedTab={'users'} />

          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <SideListBarDashboard
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <SideListBarName onClick={handleClickUsers}>
                  <ListItemText primary="Users" />
                </SideListBarName>
                <ListItem component="button" onClick={handleClickCases}>
                  <ListItemText primary="Cases" />
                </ListItem>
                <ListItem component="button" onClick={handleClickProfile}>
                  <ListItemText primary="Profile" />
                </ListItem>
              </List>
            </SideListBarDashboard>
          </Drawer>
        </ToolbarDashboard>
      </AppBar>

      <FullPageWrapper>
        <TableContainer component={Paper}>
          <TableDashboard aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRowDashboard
                  key={row.user_id}
                  hover
                  onClick={() => handleRowClickUser(row.user_id)}
                >
                  <TableCell component="th" scope="row">
                    {row.user_id}
                  </TableCell>
                  <TableCell align="right">{row.user_name}</TableCell>
                  <TableCell align="right">{row.user_email}</TableCell>
                </TableRowDashboard>
              ))}
            </TableBody>
          </TableDashboard>
        </TableContainer>
      </FullPageWrapper>
    </>
  );
};

export default UsersPage;
