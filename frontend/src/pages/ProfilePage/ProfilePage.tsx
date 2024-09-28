import React, { FC, useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { TextfieldName, UserDataContainer } from './ProfilePage.styles';
import { useParams } from 'react-router-dom';

// Define the initial state for the form
interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
}

const defaultProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  address: '1234 Elm St, Springfield',
  profilePicture: '',
};

const ProfilePage: FC<UserProfile> = () => {
  const { user } = useParams();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [editingField, setEditingField] = useState<string | null>(null); // Tracks which field is being edited
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Handle clicking on a field to edit
  const handleFieldClick = (fieldName: string) => {
    setEditingField(fieldName);
  };

  // Handle profile picture upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      setSelectedImage(file);

      // Display a preview of the selected image by creating a URL for the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: reader.result as string, // Convert the image to base64 or URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle the form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditingField(null); // End editing mode for all fields
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
        marginLeft: '110px',
        marginRight: '110px',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
        User {user} Profile
      </Typography>

      {/* Profile Picture */}
      <Box sx={{ textAlign: 'center' }}>
        <Avatar
          alt="Profile Picture"
          src={profile.profilePicture || 'https://via.placeholder.com/150'}
          sx={{ width: 150, height: 150, marginBottom: 2 }}
        />
        <Button variant="outlined" component="label">
          Upload Picture
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange} // Handle image upload
          />
        </Button>
      </Box>

      {/* Name Field */}
      <UserDataContainer>
        <Typography variant="body1" gutterBottom>
          Full Name
        </Typography>
        {editingField === 'name' ? (
          <TextField
            name="name"
            value={profile.name}
            onChange={handleChange}
            onBlur={() => setEditingField(null)} // Exit edit mode when blurred
            fullWidth
            autoFocus
          />
        ) : (
          <TextfieldName onClick={() => handleFieldClick('name')}>
            {profile.name}
          </TextfieldName>
        )}
      </UserDataContainer>

      {/* Email Field */}
      <UserDataContainer>
        <Typography variant="body1" gutterBottom>
          Email Address
        </Typography>
        {editingField === 'email' ? (
          <TextField
            name="email"
            value={profile.email}
            onChange={handleChange}
            onBlur={() => setEditingField(null)} // Exit edit mode when blurred
            fullWidth
            autoFocus
          />
        ) : (
          <TextfieldName onClick={() => handleFieldClick('email')}>
            {profile.email}
          </TextfieldName>
        )}
      </UserDataContainer>

      {/* Phone Field */}
      <UserDataContainer>
        <Typography variant="body1" gutterBottom>
          Phone Number
        </Typography>
        {editingField === 'phone' ? (
          <TextField
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            onBlur={() => setEditingField(null)} // Exit edit mode when blurred
            fullWidth
            autoFocus
          />
        ) : (
          <TextfieldName onClick={() => handleFieldClick('phone')}>
            {profile.phone}
          </TextfieldName>
        )}
      </UserDataContainer>

      {/* Address Field */}
      <UserDataContainer>
        <Typography variant="body1" gutterBottom>
          Address
        </Typography>
        {editingField === 'address' ? (
          <TextField
            name="address"
            value={profile.address}
            onChange={handleChange}
            onBlur={() => setEditingField(null)} // Exit edit mode when blurred
            fullWidth
            autoFocus
          />
        ) : (
          <TextfieldName onClick={() => handleFieldClick('address')}>
            {profile.address}
          </TextfieldName>
        )}
      </UserDataContainer>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default ProfilePage;
