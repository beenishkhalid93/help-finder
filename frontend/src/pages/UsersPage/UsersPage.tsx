import { FC, useEffect, useState } from 'react';
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
import axios from 'axios';

// Define the type for a user
export interface User {
  id: number;
  firstname: string;
  surname: string;
  email: string;
}

// Define the type for a user
export interface newUser {
  id?: number;
  firstname: string;
  surname: string;
  email: string;
}

const API_URL = 'http://localhost:8000/api/users/';

const fetchUsers = async () => {
  try {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const UsersPage: FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to load users', error);
      }
    };

    loadUsers();
  }, []);

  const createUser = async (userData: newUser) => {
    const dataToSend = { ...userData };
    delete dataToSend.id;

    try {
      const response = await axios.post(API_URL, dataToSend);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${API_URL}${userId}/`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUserClick = () => {
    setMode('add');
    setEditingUser(null);
    setOpen(true);
  };

  const handleRowClickUser = (user_id: number) => {
    navigate(`/dashboard/profile/${user_id}`);
  };

  const handleEditClick = (user: User) => {
    setMode('edit');
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setMode('add');
    setOpen(false);
    setEditingUser(null);
  };

  const handleSaveClick = async (data: {
    id: number;
    firstname: string;
    surname: string;
    email: string;
  }) => {
    if (editingUser) {
      setUsers((prevCases) =>
        prevCases.map((editingUser) =>
          data.id === editingUser.id ? data : editingUser,
        ),
      );

      try {
        const response = await axios.put(`${API_URL}${data.id}/`, data);
        console.log('User updated:', response.data);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      const newId = users.length + 1;
      data['id'] = newId;

      try {
        const createdUser = await createUser(data);
        users.push(createdUser);
        console.log('User created:', createdUser);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }

    handleClose();
  };

  const handleDeleteClick = (userId: number) => {
    setDeletingUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeletingUserId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingUserId !== null) {
      deleteUser(deletingUserId);
    }
    handleDeleteClose();
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
                onClick={() => handleRowClickUser(user.id)}
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
                      onClick={() => handleDeleteClick(user.id)}
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
        handleSave={(data) => handleSaveClick(data)}
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
