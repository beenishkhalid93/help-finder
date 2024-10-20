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
import { useUser } from '../../hooks/useUser';

interface UserProfile {
  id?: number;
  firstname: string;
  surname: string;
  email: string;
  profilePicture?: string;
}

const ProfilePage: FC = () => {
  const params = useParams(); // Extract user_id from URL
  const userId = Number.parseInt(params.user ?? '');
  const { users, editUser, fetchUsers, error, loading, setError } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaveEnabled, setSaveEnabled] = useState(false);
  const [isFieldChange, setFieldChange] = useState(false);
  const [errors, setErrors] = useState({
    firstname: false,
    surname: false,
    email: false,
  });

  // Fetch user profile by ID using the useUser hook
  useEffect(() => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setProfile(user);
    } else if (userId) {
      fetchUsers().catch((fetchError) => {
        console.error('Error fetching users:', fetchError);
      });
    }
  }, [userId, users, fetchUsers]);

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
      setError(null); // Clear previous API error on field change
    }
  }, [profile, isFieldChange, setError]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaveEnabled && profile) {
      await editUser(profile);
      setSaveEnabled(false);
      setFieldChange(false);
    }
  };

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
        gap: '16px',
        maxWidth: '80%',
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
            onChange={handleImageChange}
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

      {loading && <Typography variant="h6">Loading...</Typography>}

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
