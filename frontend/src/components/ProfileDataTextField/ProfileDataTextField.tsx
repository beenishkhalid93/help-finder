import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { ProfileDataContainer } from './ProfileDataTextField.styles';

interface ProfileDataTextFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileDataTextField: React.FC<ProfileDataTextFieldProps> = ({
  label,
  name,
  value,
  type = 'text',
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ProfileDataContainer className="form-field">
      <Typography variant="body1" gutterBottom>
        {label}
      </Typography>
      {isEditing ? (
        <TextField
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => setIsEditing(false)} // Exit edit mode on blur
          type={type}
          fullWidth
          autoFocus
        />
      ) : (
        <Typography
          onClick={() => setIsEditing(true)}
          sx={{ cursor: 'pointer' }}
        >
          {value || `Click to enter ${label.toLowerCase()}`}
        </Typography>
      )}
    </ProfileDataContainer>
  );
};

export default ProfileDataTextField;