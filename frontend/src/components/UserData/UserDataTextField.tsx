import { FC } from 'react';
import { TextField } from '@mui/material';

interface UserDataProps {
  userProfileFieldData: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editField: void;
}

const UserData: FC<UserDataProps> = ({
  userProfileFieldData,
  handleChange,
  editField,
}) => {
  return (
    <TextField
      value={userProfileFieldData}
      onChange={handleChange}
      onBlur={() => editField} // Exit edit mode when blurred (when clicking outside)
      fullWidth
      autoFocus
    />
  );
};

export default UserData;
