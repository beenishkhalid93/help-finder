import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { FC } from 'react';

const DashboardLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Render the nested routes here */}
    </>
  );
};

export default DashboardLayout;
