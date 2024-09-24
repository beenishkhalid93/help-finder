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

  return (
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
          sx={{ flexGrow: 1, marginRight: { xs: 0, md: 48 } }} // Adjust margin based on screen size
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

        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
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
  );
};

export default CasesPage;
