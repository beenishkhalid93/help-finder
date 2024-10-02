import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { FC } from 'react';

interface ConfirmationDialogProps {
  openDeleteDialog: boolean;
  handleDeleteClose?: () => void;
  handleConfirmDelete?: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  openDeleteDialog,
  handleDeleteClose,
  handleConfirmDelete,
}) => {
  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle variant="h2" sx={{ marginBottom: '20px' }}>
          {'Delete'}
        </DialogTitle>
        <DialogContent>{'Are you sure you want to delete?'}</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={handleDeleteClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
