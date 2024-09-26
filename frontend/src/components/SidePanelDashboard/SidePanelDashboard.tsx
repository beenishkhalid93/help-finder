import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { FC, useState } from 'react';
import {
  IconButtonDashboard,
  SideListBarDashboard,
  SideListBarName,
} from '../../styles/common.styles';
import { useNavigate } from 'react-router-dom';

const SidePanelDashboard: FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleTabSelection = (tabName: string) => {
    // setSelectedTab(tabName);
    switch (tabName) {
      case 'cases':
        navigate('/dashboard/cases');
        break;
      case 'users':
        navigate('/dashboard/users');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'home':
        navigate('/landing');
        break;
      default:
        navigate('/dashboard');
        break;
    }
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
    <>
      <IconButtonDashboard
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <Menu />
      </IconButtonDashboard>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <SideListBarDashboard
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem
              component="button"
              onClick={() => handleTabSelection('users')}
            >
              <ListItemText primary="Users" />
            </ListItem>
            <SideListBarName onClick={() => handleTabSelection('cases')}>
              <ListItemText primary="Cases" />
            </SideListBarName>
            <ListItem
              component="button"
              onClick={() => handleTabSelection('profile')}
            >
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </SideListBarDashboard>
      </Drawer>
    </>
  );
};
export default SidePanelDashboard;
