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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FullPageWrapper, TableDashboard } from '../../styles/common.styles';
import { Edit, Delete, Add } from '@mui/icons-material';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import UserModel from '../../components/UserModel/UserModel';
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from '../../services/userService';

export interface User {
  id?: number;
  firstname: string;
  surname: string;
  email: string;
  password?: string;
}

const UsersPage: FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

  // Fetch users when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to load users', error);
      }
    };
    loadUsers();
  }, []);

  // Navigate to the profile page
  const handleRowClickUser = useCallback(
    (userId: number) => {
      navigate(`/dashboard/profile/${userId}`);
    },
    [navigate],
  );

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
  const handleClose = () => {
    setMode('add');
    setOpen(false);
    setEditingUser(null);
  };

  // Save a new or edited user
  const handleSaveClick = async (data: User) => {
    try {
      if (editingUser) {
        // Update user
        await updateUser(data);
        setUsers((prevUsers) =>
          prevUsers.map((editingUser) =>
            data.id === editingUser.id ? data : editingUser,
          ),
        );
      } else {
        // Add a new user
        const newUser = await createUser(data);
        setUsers((prevUsers) => [...prevUsers, newUser]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Handle delete user logic
  const handleDeleteClick = useCallback((userId: number) => {
    setDeletingUserId(userId);
    setOpenDeleteDialog(true);
  }, []);

  const handleConfirmDelete = async () => {
    if (deletingUserId !== null) {
      try {
        await deleteUser(deletingUserId);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== deletingUserId),
        );
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
    setOpenDeleteDialog(false);
    setDeletingUserId(null);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeletingUserId(null);
  };

  return (
    <FullPageWrapper>
      {/* User Table */}
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

      {/* User Modal */}
      <UserModel
        open={open}
        handleClose={handleClose}
        handleSave={handleSaveClick}
        label={mode === 'edit' ? 'Edit User' : 'Add User'}
        mode={mode}
        initialData={editingUser ?? undefined}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        openDeleteDialog={openDeleteDialog}
        handleDeleteClose={handleDeleteClose}
        handleConfirmDelete={handleConfirmDelete}
      />
    </FullPageWrapper>
  );
};

export default UsersPage;
