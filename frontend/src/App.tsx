import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardLayout from './components/Layouts/DashboardLayout';
import UsersPage from './pages/UsersPage/UsersPage';
import CasesPage from './pages/CasesPage/CasesPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { FC } from 'react';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* No Navbar on these pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />

        {/* Pages with Navbar (Dashboard, Users, Cases) */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="profile" element={<ProfilePage />} />{' '}
          <Route path="" element={<DashboardPage />} />{' '}
          {/* <Route path="profile" element={<ProfilePage />} />{' '} */}
          {/* Default dashboard route */}
        </Route>

        {/* Profile can be under dashboard layout or separate, depending on your need */}
        <Route path="/profile/:user" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
