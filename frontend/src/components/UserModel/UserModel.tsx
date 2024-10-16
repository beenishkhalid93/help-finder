import { Box, Button, Modal, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ModelActionContainer, ModelContainer } from './UserModel.styles';
import { Save, Cancel, AccountCircle, Mail } from '@mui/icons-material';
import { User } from '../../pages/UsersPage/UsersPage';
import CustomTextField from '../CustomTextField/CustomTextField';
import {
  isValidEmail,
  isValidFirstname,
  isValidSurname,
} from '../../utils/validation';

interface UserModelProps {
  open: boolean;
  label: string;
  mode: string;
  initialData: User | undefined;
  apiError: string;
  handleClose: () => void;
  handleSave: (data: User) => void;
}

const UserModel: FC<UserModelProps> = ({
  open,
  label,
  mode,
  initialData,
  apiError,
  handleClose,
  handleSave,
}) => {
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // State to track if the Save button should be enabled

  const [firstnameError, setFirstnameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleClickSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFirstnameError(!isValidFirstname(firstname));
    setSurnameError(!isValidSurname(surname));
    setEmailError(!isValidEmail(email));
    if (
      isValidFirstname(firstname) &&
      isValidSurname(surname) &&
      isValidEmail(email)
    ) {
      const data = {
        id: initialData?.id ?? 0,
        firstname,
        surname,
        email,
      };
      handleSave(data);
    }
  };

  useEffect(() => {
    if (apiError) {
      console.log('API server: ', apiError);
    }
  }, [apiError]);

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

        {apiError && (
          <Typography color="error" sx={{ marginTop: '8px' }}>
            {apiError}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <CustomTextField
            // label={'User Firstname'}
            placeholder={'Firstname'}
            name={'firstname'}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            error={firstnameError}
            startIcon={<AccountCircle />}
            helperText={firstnameError ? 'Error: Invalid firstname' : ''}
          />
          <CustomTextField
            // label={'User Surname'}
            placeholder={'Surname'}
            name={'surname'}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            error={surnameError}
            startIcon={<AccountCircle />}
            helperText={surnameError ? 'Error: Invalid surname' : ''}
          />
          <CustomTextField
            // label={'User Email'}
            placeholder={'Email'}
            name={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            startIcon={<Mail />}
            helperText={emailError ? 'Error: Invalid email' : ''}
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
