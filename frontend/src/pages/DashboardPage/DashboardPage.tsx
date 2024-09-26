import { FC, useState } from 'react';
import { AppBar, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  IconButtonDashboard,
  SideListBarDashboard,
  ToolbarDashboard,
} from '../../styles/common.styles';
import AppbarDashboard from '../../components/AppbarDashboard/AppbarDashboard';

const DashboardPage: FC = () => {
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

  return (
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

        <AppbarDashboard />

        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <SideListBarDashboard
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem component="button" onClick={handleClickUsers}>
                <ListItemText primary="Users" />
              </ListItem>
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
  );
};

export default DashboardPage;
