import React, { FC, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ProfileDataTextField from '../../components/ProfileDataTextField/ProfileDataTextField';
import { PictureContainer } from './ProfilePage.styles';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string; // URL or base64 string for the profile picture
}

const profiles: UserProfile[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '1234 Elm St, Springfield',
    profilePicture: '',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    address: '1234 Elm St, Springfield',
    profilePicture: '',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '456-123-7890',
    address: '1234 Elm St, Springfield',
    profilePicture: '',
  },
];

const ProfilePage: FC = () => {
  const [profile, setProfile] = useState<UserProfile>(profiles[0]);
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Handle profile picture upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Profile Data Submitted:', profile);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px', // Space between form fields
        maxWidth: '80%', // Limit form width
        margin: '70px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>

      {/* Profile Picture */}
      <Box sx={{ textAlign: 'center' }}>
        <PictureContainer
          alt="Profile Picture"
          src={profile.profilePicture || 'https://via.placeholder.com/150'}
        />
        <Button variant="outlined" component="label" sx={{ marginTop: '20px' }}>
          Upload Picture
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange} // Handle image upload
          />
        </Button>
      </Box>

      {/* Generic Form Fields */}
      <ProfileDataTextField
        label="Full Name"
        name="name"
        value={profile.name}
        onChange={handleChange}
      />
      <ProfileDataTextField
        label="Email Address"
        name="email"
        value={profile.email}
        onChange={handleChange}
        type="email"
      />
      <ProfileDataTextField
        label="Phone Number"
        name="phone"
        value={profile.phone}
        onChange={handleChange}
        type="tel"
      />
      <ProfileDataTextField
        label="Address"
        name="address"
        value={profile.address}
        onChange={handleChange}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="submit-button"
      >
        Submit
      </Button>
    </Box>
  );
};

export default ProfilePage;
