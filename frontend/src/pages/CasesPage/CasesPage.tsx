import React, { FC, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBarContainer,
  AppBarText,
} from '../DashboardPage/DashboardPage.styles';
import { useNavigate } from 'react-router-dom';
import theme from '../../theme/theme';
import { FullPageWrapper } from '../../styles/common.styles';

const CasesPage: FC = () => {
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

  const handleClickHome = () => {
    navigate('/landing');
  };

  // const handleRowClickUser = (user_id: number) => {
  //   navigate(`/profile/${user_id}`);
  // };

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

  function createData(
    case_id: number,
    case_title: string,
    user_name: string,
    date_opened: string,
    status: string,
  ) {
    return { case_id, case_title, user_name, date_opened, status };
  }

  const rows = [
    createData(1, 'Orphan center', 'Ikram ul haq', '24-sep-2024', 'Open'),
    createData(
      2,
      'Blood Donation center',
      'Beenish Khalid',
      '15-feb-2024',
      'In progress',
    ),
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'flex', md: 'none' } }} // Show only on mobile screens
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            onClick={handleClickHome}
            sx={{
              cursor: 'pointer',
              flexGrow: 1,
              marginRight: { xs: 0, md: 48 },
            }} // Adjust margin based on screen size
          >
            Help Finder
          </Typography>

          <AppBarContainer sx={{ display: { xs: 'none', md: 'flex' } }}>
            <AppBarText variant="h6" onClick={handleClickUsers}>
              Users
            </AppBarText>
            <AppBarText
              variant="h6"
              onClick={handleClickCases}
              sx={{
                color: theme.palette.secondary.contrastText,
              }}
            >
              Cases
            </AppBarText>
            <IconButton
              size="large"
              color="inherit"
              aria-label="notifications"
              onClick={() => console.log('Account button clicked')}
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              aria-label="account"
              onClick={handleClickProfile}
            >
              <AccountCircle />
            </IconButton>
          </AppBarContainer>

          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem component="button" onClick={handleClickUsers}>
                  <ListItemText primary="Users" />
                </ListItem>
                <ListItem
                  component="button"
                  onClick={handleClickCases}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <ListItemText primary="Cases" />
                </ListItem>
                <ListItem component="button" onClick={handleClickProfile}>
                  <ListItemText primary="Profile" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>

      <FullPageWrapper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Case ID</TableCell>
                <TableCell align="right">Case Title</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Date Opened</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.case_id}
                  hover
                  // onClick={() => handleRowClickUser(row.case_id)}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.case_id}
                  </TableCell>
                  <TableCell align="right">{row.case_title}</TableCell>
                  <TableCell align="right">{row.user_name}</TableCell>
                  <TableCell align="right">{row.date_opened}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FullPageWrapper>
    </>
  );
};

export default CasesPage;
