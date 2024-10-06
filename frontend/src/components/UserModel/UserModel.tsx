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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // State to track if the Save button should be enabled

  const handleClickSave = () => {
    const data = {
      id: initialData?.id ?? 0,
      name,
      email,
      phone,
    };
    handleSave(data);
  };

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        setName(initialData.name);
        setEmail(initialData.email);
        setPhone(initialData.phone);
      }
    }
  }, [open, mode, initialData]);

  useEffect(() => {
    if (name || email || phone) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [name, email, phone]);

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
            label={'User Name'}
            name={'name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomTextField
            label={'Email'}
            name={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextField
            label={'Phone'}
            name={'phone'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
