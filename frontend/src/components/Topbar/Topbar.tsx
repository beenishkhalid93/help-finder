import { FC } from 'react';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { TopbarContainer, TopbarText, TopbarHeader } from './Topbar.styles';

interface TopbarProps {
  selectedTab: string;
  onTabSelect: (tabName: string) => void;
}

const Topbar: FC<TopbarProps> = ({ selectedTab, onTabSelect }) => {
  return (
    <>
      <TopbarHeader variant="h6" onClick={() => onTabSelect('home')}>
        Help Finder
      </TopbarHeader>

      <TopbarContainer>
        <TopbarText
          variant="h6"
          isselected={selectedTab === 'users'}
          onClick={() => onTabSelect('users')}
        >
          Users
        </TopbarText>
        <TopbarText
          variant="h6"
          isselected={selectedTab === 'cases'}
          onClick={() => onTabSelect('cases')}
        >
          Cases
        </TopbarText>
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
      </TopbarContainer>
    </>
  );
};

export default Topbar;
