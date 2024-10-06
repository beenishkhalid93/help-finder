import { Box, Button, Modal, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ModelActionContainer, ModelContainer } from './CaseModel.styles';
import { Save, Cancel } from '@mui/icons-material';
import CustomTextField from '../CustomTextField/CustomTextField';
import { Case } from '../../pages/CasesPage/CasesPage';

interface CaseModelProps {
  open: boolean;
  label: string;
  mode: string;
  initialData: Case | undefined;
  handleClose: () => void;
  handleSave: (data: Case) => void;
}

const CaseModel: FC<CaseModelProps> = ({
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
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // State to track if the Save button should be enabled

  const handleClickSave = () => {
    const data = {
      id: initialData?.id ?? 0,
      title,
      name,
      dateOpened,
      status,
    };
    handleSave(data);
  };

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title);
        setName(initialData.name);
        setDateOpened(initialData.dateOpened);
        setStatus(initialData.status);
      } else if (mode === 'add' && !initialData) {
        setTitle('');
        setName('');
        setDateOpened('');
        setStatus('');
        setIsSaveEnabled(false);
      }
    }
  }, [open, mode, initialData]);

  useEffect(() => {
    if (title || name || dateOpened || status) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [title, name, dateOpened, status]);

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
          />
          <CustomTextField
            label={'User Name'}
            name={'name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomTextField
            label={'Date Opened'}
            name={'date_opened'}
            value={dateOpened}
            onChange={(e) => setDateOpened(e.target.value)}
          />
          <CustomTextField
            label={'Status'}
            name={'status'}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

export default CaseModel;
