import { FC, useState } from 'react';
import { AppBar } from '@mui/material';
import Topbar from '../Topbar/Topbar';
import VerticalNavbar from '../VerticalNavbar/VerticalNavbar';
import { useNavigate } from 'react-router-dom';
import { NavbarContainer } from './Navbar.styles';

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
        navigate('/dashboard/profile');
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
      <NavbarContainer>
        <VerticalNavbar
          selectedTab={selectedTab}
          onTabSelect={handleTabSelection}
        />
        <Topbar selectedTab={selectedTab} onTabSelect={handleTabSelection} />
      </NavbarContainer>
    </AppBar>
  );
};

export default Navbar;
