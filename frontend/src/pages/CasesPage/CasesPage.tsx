import { FC, useState } from 'react';
import {
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { FullPageWrapper, TableDashboard } from '../../styles/common.styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

// Define the type for a user
interface Case {
  id: number;
  title: string;
  name: string;
  date_opened: string;
  status: string;
}

const initialCases: Case[] = [
  {
    id: 1,
    title: 'Orphan center',
    name: 'Ikram ul haq',
    date_opened: '24-sep-2024',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Blood Donation center',
    name: 'Beenish Khalid',
    date_opened: '15-feb-2024',
    status: 'In progress',
  },
];

const CasesPage: FC = () => {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [editingCase, setEditingCase] = useState<Case | null>(null); // Track the user being edited
  const [open, setOpen] = useState<boolean>(false); // Track if the modal is open
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); // Track if the delete confirmation dialog is open
  const [deletingCaseId, setDeletingCaseId] = useState<number | null>(null); // Track the user being deleted

  // Handle opening the modal
  const handleEditClick = (caseData: Case) => {
    setEditingCase(caseData); // Set the current user to edit
    setOpen(true); // Open the modal
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setEditingCase(null); // Clear the editing user on close
  };

  // Handle field changes in the form
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditingCase((prevCase) =>
      prevCase ? { ...prevCase, [name]: value } : null,
    );
  };

  // Save the changes and update the user list
  const handleSaveClick = () => {
    if (editingCase) {
      setCases((prevCases) =>
        prevCases.map((caseData) =>
          caseData.id === editingCase.id ? editingCase : caseData,
        ),
      );
    }
    handleClose(); // Close the modal after saving
  };

  // Handle opening the delete confirmation dialog
  const handleDeleteClick = (caseDataId: number) => {
    setDeletingCaseId(caseDataId); // Set the user to be deleted
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  // Handle closing the delete confirmation dialog
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeletingCaseId(null); // Clear the user to be deleted on close
  };

  // Confirm delete and remove the user from the list
  const handleConfirmDelete = () => {
    if (deletingCaseId !== null) {
      setCases((prevCases) =>
        prevCases.filter((caseData) => caseData.id !== deletingCaseId),
      );
    }
    handleDeleteClose(); // Close the dialog after deleting
  };

  return (
    <FullPageWrapper>
      {/* User Table */}
      <TableContainer component={Paper}>
        <TableDashboard aria-label="case table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Date Opened</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cases.map((caseData) => (
              <TableRow key={caseData.id}>
                <TableCell>{caseData.id}</TableCell>
                <TableCell>{caseData.title}</TableCell>
                <TableCell>{caseData.name}</TableCell>
                <TableCell>{caseData.date_opened}</TableCell>
                <TableCell>{caseData.status}</TableCell>
                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(caseData)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteClick(caseData.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableDashboard>
      </TableContainer>

      {/* Edit User Modal */}
      {/* Modal for Editing User */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-modal-title">Edit User</h2>
          {editingCase && (
            <>
              <TextField
                margin="dense"
                label="Title"
                name="title"
                value={editingCase.title}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="User Name"
                name="user_name"
                value={editingCase.name}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Date Opened"
                name="data_opened"
                value={editingCase.date_opened}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Status"
                name="status"
                value={editingCase.status}
                onChange={handleFieldChange}
                fullWidth
              />
            </>
          )}
          <Box
            mt={2}
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <Button
              onClick={handleClose}
              color="secondary"
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveClick}
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>{'Delete Confirmation'}</DialogTitle>
        <DialogContent>
          {'Are you sure you want to delete this user?'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={handleDeleteClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </FullPageWrapper>
  );
};

export default CasesPage;
