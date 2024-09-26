import { FC, useState } from 'react';
import { AppBar } from '@mui/material';
import AppbarDashboard from '../../components/AppbarDashboard/AppbarDashboard';
import SidePanelDashboard from '../../components/SidePanelDashboard/SidePanelDashboard';
import { useNavigate } from 'react-router-dom';
import { ToolbarDashboard } from './Navbar.styles';

const Navbar: FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(''); // Users selected by default
  const navigate = useNavigate();

  // Handle tab selection and update selectedTab state
  const handleTabSelection = (tabName: string) => {
    setSelectedTab(tabName);

    switch (tabName) {
      case 'users':
        navigate('/dashboard/users');
        break;
      case 'cases':
        navigate('/dashboard/cases');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'home':
        navigate('/landing');
        break;
      default:
        navigate('/dashboard'); // Default route if none match
    }
  };

  return (
    <AppBar position="static">
      <ToolbarDashboard>
        <SidePanelDashboard
          selectedTab={selectedTab}
          onTabSelect={handleTabSelection}
        />
        <AppbarDashboard
          selectedTab={selectedTab}
          onTabSelect={handleTabSelection}
        />
      </ToolbarDashboard>
    </AppBar>
  );
};

export default Navbar;
