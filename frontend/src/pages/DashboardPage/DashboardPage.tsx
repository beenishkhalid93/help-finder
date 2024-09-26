import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import UsersPage from '../UsersPage/UsersPage';
import CasesPage from '../CasesPage/CasesPage';
import ProfilePage from '../ProfilePage/ProfilePage'; // If profile is part of the dashboard
import { FC } from 'react';

const DashboardPage: FC = () => {
  return (
    <>
      <Navbar /> {/* Common navbar for all dashboard-related pages */}
      <Routes>
        <Route path="users" element={<UsersPage />} />
        <Route path="cases" element={<CasesPage />} />
        <Route path="profile" element={<ProfilePage />} /> {/* If needed */}
        {/* Add other dashboard-related routes here */}
      </Routes>
    </>
  );
};

export default DashboardPage;
