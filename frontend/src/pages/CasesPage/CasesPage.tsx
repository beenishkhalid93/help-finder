import React, { FC, useState } from 'react';
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
  ToolbarDashboard,
  SideListBarDashboard,
  SideListBarName,
  TableDashboard,
  TableRowDashboard,
} from '../../styles/common.styles';
import AppbarDashboard from '../../components/AppbarDashboard/AppbarDashboard';

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

          <AppbarDashboard selectedTab={'cases'} />

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
                <ListItem component="button" onClick={handleClickUsers}>
                  <ListItemText primary="Users" />
                </ListItem>
                <SideListBarName onClick={handleClickCases}>
                  <ListItemText primary="Cases" />
                </SideListBarName>
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
                <TableCell>Case ID</TableCell>
                <TableCell align="right">Case Title</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Date Opened</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRowDashboard key={row.case_id} hover>
                  <TableCell component="th" scope="row">
                    {row.case_id}
                  </TableCell>
                  <TableCell align="right">{row.case_title}</TableCell>
                  <TableCell align="right">{row.user_name}</TableCell>
                  <TableCell align="right">{row.date_opened}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRowDashboard>
              ))}
            </TableBody>
          </TableDashboard>
        </TableContainer>
      </FullPageWrapper>
    </>
  );
};

export default CasesPage;
