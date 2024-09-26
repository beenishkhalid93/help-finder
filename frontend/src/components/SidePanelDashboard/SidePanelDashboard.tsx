import { Drawer, List, ListItemText } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { FC, useState } from 'react';
import {
  IconButtonDashboard,
  SideListBarDashboard,
  SideListBarName,
} from './SidePanelDashboard.styles';

interface SidePanelProps {
  selectedTab: string;
  onTabSelect: (tabName: string) => void;
}

const SidePanelDashboard: FC<SidePanelProps> = ({
  selectedTab,
  onTabSelect,
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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
            <SideListBarName
              isSelected={selectedTab === 'users'}
              onClick={() => onTabSelect('users')}
            >
              <ListItemText primary="Users" />
            </SideListBarName>
            <SideListBarName
              isSelected={selectedTab === 'cases'}
              onClick={() => onTabSelect('cases')}
            >
              <ListItemText primary="Cases" />
            </SideListBarName>
            <SideListBarName
              isSelected={selectedTab === 'profile'}
              onClick={() => onTabSelect('profile')}
            >
              <ListItemText primary="Profile" />
            </SideListBarName>
          </List>
        </SideListBarDashboard>
      </Drawer>
    </>
  );
};
export default SidePanelDashboard;
