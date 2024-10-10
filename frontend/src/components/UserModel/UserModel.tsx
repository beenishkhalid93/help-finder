import { Box, Button, Modal, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ModelActionContainer, ModelContainer } from './UserModel.styles';
import { Save, Cancel } from '@mui/icons-material';
import { User } from '../../pages/UsersPage/UsersPage';
import CustomTextField from '../CustomTextField/CustomTextField';

interface UserModelProps {
  open: boolean;
  label: string;
  mode: string;
  initialData: User | undefined;
  handleClose: () => void;
  handleSave: (data: User) => void;
}

const UserModel: FC<UserModelProps> = ({
  open,
  label,
  mode,
  initialData,
  handleClose,
  handleSave,
}) => {
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // State to track if the Save button should be enabled

  const handleClickSave = () => {
    const data = {
      id: initialData?.id ?? 0,
      firstname,
      surname,
      email,
    };
    handleSave(data);
  };

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        setFirstname(initialData.firstname);
        setSurname(initialData.surname);
        setEmail(initialData.email);
      } else if (mode === 'add' && !initialData) {
        setFirstname('');
        setSurname('');
        setEmail('');
        setIsSaveEnabled(false);
      }
    }
  }, [open, mode, initialData]);

  useEffect(() => {
    if (firstname || surname || email) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [firstname, surname, email]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModelContainer>
        <Typography
          variant="h2"
          id="modal-modal-title"
          sx={{ marginBottom: '20px' }}
        >
          {label}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <CustomTextField
            label={'User Firstname'}
            name={'firstname'}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <CustomTextField
            label={'User Surname'}
            name={'surname'}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <CustomTextField
            label={'User Email'}
            name={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <ModelActionContainer mt={2}>
          <Button
            onClick={handleClickSave}
            color="primary"
            startIcon={<Save />}
            disabled={!isSaveEnabled}
          >
            Save
          </Button>
          <Button onClick={handleClose} color="primary" startIcon={<Cancel />}>
            Cancel
          </Button>
        </ModelActionContainer>
      </ModelContainer>
    </Modal>
  );
};

export default UserModel;
