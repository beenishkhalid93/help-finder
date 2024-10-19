import { FC, useEffect, useState, useCallback } from 'react';
import {
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Fab,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FullPageWrapper, TableDashboard } from '../../styles/common.styles';
import { Edit, Delete, Add } from '@mui/icons-material';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import UserModel from '../../components/UserModel/UserModel';
import { useUser } from '../../hooks/useUser';

export interface User {
  id?: number;
  firstname: string;
  surname: string;
  email: string;
  password?: string;
}

const UsersPage: FC = () => {
  const navigate = useNavigate();
  const { users, loading, error, fetchUsers, addUser, editUser, removeUser } =
    useUser();
  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>('');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Navigate to the profile page
  const handleRowClickUser = useCallback(
    (userId: number) => {
      navigate(`/dashboard/profile/${userId}`);
    },
    [navigate],
  );

  useEffect(() => {
    if (error) {
      setApiError(error);
    }
  }, [error]);

  useEffect(() => {
    if (!open) {
      setApiError(''); // Clear the API error when modal is closed
    }
  }, [open]);

  // Open the modal for editing or adding a user
  const handleEditClick = useCallback((user: User) => {
    setMode('edit');
    setEditingUser(user);
    setOpen(true);
  }, []);

  const handleAddUserClick = useCallback(() => {
    setMode('add');
    setEditingUser(null);
    setOpen(true);
  }, []);

  // Close the modal
  const handleClose = useCallback(() => {
    setMode('add');
    setOpen(false);
    setEditingUser(null);
  }, []);

  // Save a new or edited user
  const handleSaveClick = useCallback(
    async (data: User) => {
      // try {
      if (mode === 'edit' && editingUser) {
        await editUser(data);
      } else {
        await addUser(data);
      }
      // Close the modal only if there was no error
      if (!apiError) {
        handleClose();
      }
      // } catch (err) {
      //   console.log('catch:');
      //   // If an error occurs, the modal remains open
      //   console.error('Error saving user:', err);
      //   setApiError(error);
      //   console.log('catch:');
      // }
    },
    [editUser, addUser, handleClose, mode, editingUser],
  );

  // Handle delete user logic
  const handleDeleteClick = useCallback((userId: number) => {
    setDeletingUserId(userId);
    setOpenDeleteDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (deletingUserId !== null) {
      await removeUser(deletingUserId);
    }
    setOpenDeleteDialog(false);
    setDeletingUserId(null);
  }, [removeUser, deletingUserId]);

  const handleDeleteClose = useCallback(() => {
    setOpenDeleteDialog(false);
    setDeletingUserId(null);
  }, []);

  return (
    <FullPageWrapper>
      {loading && <Typography variant="h6">Loading...</Typography>}
      {/* {error && <Typography color="error">{error}</Typography>} */}

      <TableContainer component={Paper}>
        <TableDashboard aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClickUser(user.id as number)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.surname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(user)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteClick(user.id as number)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableDashboard>
      </TableContainer>

      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        onClick={handleAddUserClick}
        sx={{ margin: 2 }}
      >
        <Add sx={{ mr: 1 }} />
        Add User
      </Fab>

      <UserModel
        open={open}
        handleClose={handleClose}
        handleSave={handleSaveClick}
        label={mode === 'edit' ? 'Edit User' : 'Add User'}
        mode={mode}
        initialData={editingUser ?? undefined}
        apiError={apiError}
      />

      <ConfirmationDialog
        openDeleteDialog={openDeleteDialog}
        handleDeleteClose={handleDeleteClose}
        handleConfirmDelete={handleConfirmDelete}
      />
    </FullPageWrapper>
  );
};

export default UsersPage;
