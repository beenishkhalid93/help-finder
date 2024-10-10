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

// Function to create a new user via POST request
const createUser = async (userData: newUser) => {
  // Make a copy of the userData object to avoid mutating the original object
  const dataToSend = { ...userData };

  // Remove the 'id' field if it exists
  delete dataToSend.id;

  try {
    const response = await axios.post(API_URL, dataToSend);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// const initialUsers: User[] = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     phone: '987-654-3210',
//   },
//   {
//     id: 3,
//     name: 'Bob Johnson',
//     email: 'bob@example.com',
//     phone: '456-123-7890',
//   },
// ];

const UsersPage: FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null); // Track the user being edited
  const [open, setOpen] = useState<boolean>(false); // Track if the modal is open
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); // Track if the delete confirmation dialog is open
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null); // Track the user being deleted

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        console.log(users);
        // console.log(initialUsers);
      } catch (error) {
        console.error('Failed to load users', error);
      }
    };

    loadUsers();
  }, []);

  const handleAddUserClick = () => {
    setMode('add');
    setEditingUser(null);
    setOpen(true);
  };

  const handleRowClickUser = (user_id: number) => {
    navigate(`/dashboard/profile/${user_id}`);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
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
    } else {
      console.log(users);
      console.log(data);
      const newId = users.length + 1;
      data['id'] = newId;
      users.push(data);
      console.log(users);
      console.log(data);

      try {
        const createdUser = await createUser(data);
        console.log('User created:', createdUser);
        // navigate('/dashboard');
      } catch (error) {
        console.error('Error creating user:', error);
      }

      // setUsers(initialUsers);
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
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deletingUserId),
      );
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
                onClick={() => handleRowClickUser(user.id)} // Navigate when the row is clicked
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

      {/* Edit User Modal */}
      <UserModel
        open={open}
        handleClose={handleClose}
        // label={'Edit User'}
        handleSave={(data) => handleSaveClick(data)}
        label={mode === 'edit' ? 'Edit User' : 'Add User'}
        mode={mode}
        // mode={'edit'}
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
