import { Box, Button, Modal, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ModelActionContainer, ModelContainer } from './CustomModel.styles';
import { Save, Cancel } from '@mui/icons-material';
import CustomTextField from '../CustomTextField/CustomTextField';

interface CustomModelProps {
  open: boolean;
  label: string;
  mode: string;
  initialData: {
    title: string;
    name: string;
    dateOpened: string;
    status: string;
  };
  handleClose: () => void;
  handleSave: (data: {
    name: string;
    title: string;
    dateOpened: string;
    status: string;
  }) => void;
}

const CustomModel: FC<CustomModelProps> = ({
  open,
  label,
  mode,
  initialData,
  handleClose,
  handleSave,
}) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [dateOpened, setDateOpened] = useState('');
  const [status, setStatus] = useState('');

  const handleClickSave = () => {
    handleSave({ title, name, dateOpened, status });
  };
  // useEffect to listen for changes in any of the state values
  useEffect(() => {
    // if (mode === 'edit' && initialData)
    if (mode === 'edit' && initialData) {
      console.log('One of the case fields changed:');
      setTitle(initialData.title);
      console.log('Title:', title);
      setName(initialData.name);
      console.log('Name:', name);
      setDateOpened(initialData.dateOpened);
      console.log('Date Opened:', dateOpened);
      setStatus(initialData.status);
      console.log('Status:', status);
    }
    // You can perform any action when one of these state variables changes

    // For example, you could make an API call or update something
  }, [mode, initialData, title, name, dateOpened, status]);
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
            label={'Title'}
            name={'title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // onChange={(e) => setTitleCase(e.target.value)}
          />
          <CustomTextField
            label={'User Name'}
            name={'name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            // onChange={(e) => setNameCase(e.target.value)}
          />
          <CustomTextField
            label={'Date Opened'}
            name={'date_opened'}
            value={dateOpened}
            onChange={(e) => setDateOpened(e.target.value)}
            // onChange={(e) => setDateOpenedCase(e.target.value)}
          />
          <CustomTextField
            label={'Status'}
            name={'status'}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            // onChange={(e) => setStatusCase(e.target.value)}
          />
        </Box>

        <ModelActionContainer mt={2}>
          <Button
            onClick={handleClickSave}
            color="primary"
            startIcon={<Save />}
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

export default CustomModel;
