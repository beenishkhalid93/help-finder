import { Button, Modal, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { ModelActionContainer, ModelContainer } from './CustomModel.styles';
import { Save, Cancel } from '@mui/icons-material';

interface CustomModelProps {
  open: boolean;
  label: string;
  handleClose: () => void;
  handleSave: () => void;
  ModelBody: ReactNode;
}

const CustomModel: FC<CustomModelProps> = ({
  open,
  label,
  handleClose,
  handleSave,
  ModelBody,
}) => {
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
        {ModelBody}
        <ModelActionContainer mt={2}>
          <Button onClick={handleSave} color="primary" startIcon={<Save />}>
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
