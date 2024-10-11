import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ProfileDataTextField from '../../components/ProfileDataTextField/ProfileDataTextField';
import { PictureContainer } from './ProfilePage.styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  isValidEmail,
  isValidFirstname,
  isValidSurname,
} from '../../utils/validation';

interface UserProfile {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  profilePicture: string; // URL or base64 string for the profile picture
}

const API_URL = 'http://localhost:8000/api/users/';

const fetchUserById = async (userId: number) => {
  try {
    const response = await axios.get<UserProfile>(`${API_URL}${userId}/`); // Fetch user by ID
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const ProfilePage: FC = () => {
  const params = useParams(); // Extract user_id from URL
  const userId = Number.parseInt(params.user ?? '');
  const [profile, setProfile] = useState<UserProfile | null>(null); // Profile state

  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // State to track if the Save button should be enabled

  const [firstnameError, setFirstnameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  console.log('UserId', userId);

  useEffect(() => {
    const fetchUser = async (userId: number) => {
      try {
        const user = await fetchUserById(userId);
        setProfile(user); // Set the fetched user profile to the state
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser(userId); // Call the function with the extracted user_id
    }
  }, [userId]);

  useEffect(() => {
    if (profile) {
      setFirstnameError(!isValidFirstname(profile.firstname));
      setSurnameError(!isValidSurname(profile.surname));
      setEmailError(!isValidEmail(profile.email));
      if (firstnameError || surnameError || emailError) {
        setIsSaveEnabled(false);
      } else {
        setIsSaveEnabled(true);
      }
    }
  }, [profile, firstnameError, surnameError, emailError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (profile) {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) =>
          prevProfile
            ? {
                ...prevProfile,
                profilePicture: reader.result as string,
              }
            : null,
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaveEnabled) {
      try {
        const response = await axios.put(`${API_URL}${userId}/`, profile);
        setIsSaveEnabled(false);
        console.log('User updated:', response.data);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }

    console.log('Profile Data Submitted:', profile);
  };

  if (!profile) {
    return <Typography variant="h6">User not found</Typography>;
  }

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
        label="Firstname"
        name="firstname"
        value={profile.firstname}
        onChange={handleChange}
        textError={firstnameError}
      />

      <ProfileDataTextField
        label="Surname"
        name="surname"
        value={profile.surname}
        onChange={handleChange}
        type="surname"
        textError={surnameError}
      />

      <ProfileDataTextField
        label="Email Address"
        name="email"
        value={profile.email}
        onChange={handleChange}
        textError={emailError}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="submit-button"
        disabled={!isSaveEnabled}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ProfilePage;
