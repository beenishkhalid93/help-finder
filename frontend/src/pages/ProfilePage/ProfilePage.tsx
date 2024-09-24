import { FC } from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage: FC = () => {
  const { user } = useParams();
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {user}! This is your profile page.</p>
    </div>
  );
};

export default ProfilePage;
