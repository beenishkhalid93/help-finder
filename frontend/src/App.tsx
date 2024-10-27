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
import PrivateRoute from './components/PrivateRoute';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route for login */}
        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* PrivateRoute wraps all the protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="" element={<DashboardPage />} />
            <Route path="profile/:user" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Pages with Navbar (Dashboard, Users, Cases) */}
        {/* <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="" element={<DashboardPage />} />
          <Route path="profile/:user" element={<ProfilePage />} />
        </Route> */}

        {/* No Navbar on these pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
