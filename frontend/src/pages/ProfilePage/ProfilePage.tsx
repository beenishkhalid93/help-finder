import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ProfileDataTextField from '../../components/ProfileDataTextField/ProfileDataTextField';
import { PictureContainer } from './ProfilePage.styles';
import { useParams } from 'react-router-dom';
import {
  isValidEmail,
  isValidFirstname,
  isValidSurname,
} from '../../utils/validation';
import { getUserById, updateUser } from '../../services/userService';

interface UserProfile {
  id?: number;
  firstname: string;
  surname: string;
  email: string;
  profilePicture?: string; // URL or base64 string for the profile picture
}

const ProfilePage: FC = () => {
  const params = useParams(); // Extract user_id from URL
  const userId = Number.parseInt(params.user ?? '');
  const [profile, setProfile] = useState<UserProfile | null>(null); // Profile state
  const [isSaveEnabled, setSaveEnabled] = useState(false); // State to track if the Save button should be enabled
  const [isFieldChange, setFieldChange] = useState(false);
  const [errors, setErrors] = useState({
    firstname: false,
    surname: false,
    email: false,
  });

  // Fetch user profile by ID
  useEffect(() => {
    const fetchUser = async (userId: number) => {
      try {
        const user = await getUserById(userId);
        setProfile(user!); // Set the fetched user profile to the state
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  // Validate profile data when fields change
  useEffect(() => {
    if (profile && isFieldChange) {
      const { firstname, surname, email } = profile;
      const newErrors = {
        firstname: !isValidFirstname(firstname),
        surname: !isValidSurname(surname),
        email: !isValidEmail(email),
      };
      setErrors(newErrors);
      setSaveEnabled(!Object.values(newErrors).includes(true));
    }
  }, [profile, isFieldChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (profile) {
      setProfile({
        ...profile,
        [name]: value,
      });
      setFieldChange(true);
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
    if (isSaveEnabled && profile) {
      try {
        const response = await updateUser(profile);
        console.log('User updated:', response);
        setSaveEnabled(false);
        setFieldChange(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  // Render error message if field is invalid
  const renderError = (error: boolean, field: string) => {
    return (
      error && (
        <Typography color="error" sx={{ marginTop: '8px' }}>
          {`Error: Invalid ${field}`}
        </Typography>
      )
    );
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
      />
      {renderError(errors.firstname, 'Firstname')}

      <ProfileDataTextField
        label="Surname"
        name="surname"
        value={profile.surname}
        onChange={handleChange}
      />
      {renderError(errors.surname, 'Surname')}

      <ProfileDataTextField
        label="Email Address"
        name="email"
        value={profile.email}
        onChange={handleChange}
      />
      {renderError(errors.email, 'Email')}

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
