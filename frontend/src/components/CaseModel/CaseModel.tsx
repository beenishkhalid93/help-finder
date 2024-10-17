import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ModelActionContainer, ModelContainer } from './CaseModel.styles';
import { Save, Cancel, AccountCircle } from '@mui/icons-material';
import CustomTextField from '../CustomTextField/CustomTextField';
import { Case } from '../../pages/CasesPage/CasesPage';
import { isValidName, isValidTitle } from '../../utils/validation';

interface CaseModelProps {
  open: boolean;
  label: string;
  mode: string;
  initialData: Case | undefined;
  apiError?: string;
  handleClose: () => void;
  handleSave: (data: Case) => void;
}

const CaseModel: FC<CaseModelProps> = ({
  open,
  label,
  mode,
  initialData,
  apiError,
  handleClose,
  handleSave,
}) => {
  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero
    return `${year}-${month}-${day}`; // Format date as YYYY-MM-DD
  };

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  // const [dateOpened, setDateOpened] = useState('');
  const [dateOpened, setDateOpened] = useState<string>(getCurrentDate());
  const [status, setStatus] = useState<string>('Not Started');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // State to track if the Save button should be enabled

  const [titleError, setTitleError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleClickSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitleError(!isValidTitle(title));
    setNameError(!isValidName(name));
    if (isValidTitle(title) && isValidName(name)) {
      const data = {
        id: initialData?.id ?? 0,
        title,
        name,
        dateOpened,
        status,
      };
      handleSave(data);
    }
  };

  useEffect(() => {
    if (apiError) {
      console.log('API server error: ', apiError);
    }
  }, [apiError]);

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
        setDateOpened(getCurrentDate());
        setStatus('Not Started');
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

        {apiError && (
          <Typography color="error" sx={{ marginTop: '8px' }}>
            {apiError}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <CustomTextField
            label={'Title'}
            // placeholder={'Title'}
            name={'title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
            // startIcon={<AccountCircle />}
            helperText={titleError ? 'Error: Invalid title' : ''}
          />
          <CustomTextField
            label={'User Name'}
            // placeholder={'User Name'}
            name={'name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            startIcon={<AccountCircle />}
            helperText={nameError ? 'Error: Invalid name' : ''}
          />
          <CustomTextField
            label={'Date Opened'}
            name={'date_opened'}
            type="date"
            value={dateOpened}
            onChange={(e) => setDateOpened(e.target.value)}
          />
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status} // Binds the state to the select value
            onChange={(e) => setStatus(e.target.value)}
            // label="Status"
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
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
