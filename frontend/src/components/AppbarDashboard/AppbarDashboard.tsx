import { FC } from 'react';
import {
  AppBarContainerDashboard,
  AppHeaderDashboard,
} from '../../styles/common.styles';
import { AppBarText } from '../../pages/DashboardPage/DashboardPage.styles';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

interface selectedTabprops {
  selectedTab?: string;
}

const AppbarDashboard: FC<selectedTabprops> = ({ selectedTab }) => {
  const navigate = useNavigate();
  //   const [selectedTab, setSelectedTab] = useState('users');

  const handleTabSelection = (tabName: string) => {
    // setSelectedTab(tabName);
    console.log(tabName);
    switch (tabName) {
      case 'cases':
        navigate('/cases');
        break;
      case 'users':
        navigate('/users');
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

  return (
    <>
      <AppHeaderDashboard
        variant="h6"
        onClick={() => handleTabSelection('home')}
      >
        Help Finder
      </AppHeaderDashboard>

      <AppBarContainerDashboard>
        <AppBarText
          variant="h6"
          isSelected={selectedTab === 'users'}
          onClick={() => handleTabSelection('users')}
        >
          Users
        </AppBarText>
        <AppBarText
          variant="h6"
          isSelected={selectedTab === 'cases'}
          onClick={() => handleTabSelection('cases')}
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
          onClick={() => handleTabSelection('profile')}
        >
          <AccountCircle />
        </IconButton>
      </AppBarContainerDashboard>
    </>
  );
};

export default AppbarDashboard;
