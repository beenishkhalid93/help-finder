import LandingPage from "./pages/LandingPage/LandingPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { FC } from "react";

const App: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
