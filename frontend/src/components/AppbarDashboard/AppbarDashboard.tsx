import { FC } from 'react';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBarContainerDashboard,
  AppBarText,
  AppHeaderDashboard,
} from './AppbarDashboard.styles';

interface AppbarDashboardProps {
  selectedTab: string;
  onTabSelect: (tabName: string) => void;
}

const AppbarDashboard: FC<AppbarDashboardProps> = ({
  selectedTab,
  onTabSelect,
}) => {
  return (
    <>
      <AppHeaderDashboard variant="h6" onClick={() => onTabSelect('home')}>
        Help Finder
      </AppHeaderDashboard>

      <AppBarContainerDashboard>
        <AppBarText
          variant="h6"
          isSelected={selectedTab === 'users'}
          onClick={() => onTabSelect('users')}
        >
          Users
        </AppBarText>
        <AppBarText
          variant="h6"
          isSelected={selectedTab === 'cases'}
          onClick={() => onTabSelect('cases')}
        >
          Cases
        </AppBarText>
        <IconButton
          size="large"
          color="inherit"
          aria-label="notifications"
          onClick={() => console.log('Notifications button clicked')}
        >
          <NotificationsIcon />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          aria-label="account"
          onClick={() => onTabSelect('profile')}
        >
          <AccountCircle />
        </IconButton>
      </AppBarContainerDashboard>
    </>
  );
};

export default AppbarDashboard;
