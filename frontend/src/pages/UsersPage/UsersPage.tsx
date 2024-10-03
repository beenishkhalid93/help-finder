import { FC, useState } from 'react';
import {
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FullPageWrapper, TableDashboard } from '../../styles/common.styles';
import { Edit, Delete } from '@mui/icons-material';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import CustomModel from '../../components/CustommModel/CustomModel';

// Define the type for a user
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const initialUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '456-123-7890',
  },
];

const UsersPage: FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null); // Track the user being edited
  const [open, setOpen] = useState<boolean>(false); // Track if the modal is open
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); // Track if the delete confirmation dialog is open
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null); // Track the user being deleted

  const handleRowClickUser = (user_id: number) => {
    navigate(`/dashboard/profile/${user_id}`);
  };

  // Handle opening the modal
  const handleEditClick = (user: User) => {
    setEditingUser(user); // Set the current user to edit
    setOpen(true); // Open the modal
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setEditingUser(null); // Clear the editing user on close
  };

  // Handle field changes in the form
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditingUser((prevUser) =>
      prevUser ? { ...prevUser, [name]: value } : null,
    );
  };

  // Save the changes and update the user list
  const handleSaveClick = () => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? editingUser : user,
        ),
      );
    }
    handleClose(); // Close the modal after saving
  };

  // Handle opening the delete confirmation dialog
  const handleDeleteClick = (userId: number) => {
    setDeletingUserId(userId); // Set the user to be deleted
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  // Handle closing the delete confirmation dialog
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeletingUserId(null); // Clear the user to be deleted on close
  };

  // Confirm delete and remove the user from the list
  const handleConfirmDelete = () => {
    if (deletingUserId !== null) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deletingUserId),
      );
    }
    handleDeleteClose(); // Close the dialog after deleting
  };

  return (
    <FullPageWrapper>
      {/* User Table */}
      <TableContainer component={Paper}>
        <TableDashboard aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
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

      {/* Edit User Modal */}
      <CustomModel
        open={open}
        handleClose={handleClose}
        label={'Edit User'}
        handleSave={handleSaveClick}
        ModelBody={
          editingUser && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <CustomTextField
                label={'Full Name'}
                name={'name'}
                value={editingUser.name}
                onChange={handleFieldChange}
              />
              <CustomTextField
                label={'Email'}
                name={'email'}
                value={editingUser.email}
                onChange={handleFieldChange}
              />
              <CustomTextField
                label={'Phone'}
                name={'phone'}
                value={editingUser.phone}
                onChange={handleFieldChange}
              />
            </Box>
          )
        }
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
