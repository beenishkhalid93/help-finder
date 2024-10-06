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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FullPageWrapper, TableDashboard } from '../../styles/common.styles';
import { Edit, Delete } from '@mui/icons-material';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import UserModel from '../../components/UserModel/UserModel';

// Define the type for a user
export interface User {
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

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSaveClick = (data: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }) => {
    if (editingUser) {
      setUsers((prevCases) =>
        prevCases.map((editingUser) =>
          data.id === editingUser.id ? data : editingUser,
        ),
      );
    } else {
      const newId = initialUsers.length + 1;
      data['id'] = newId;
      initialUsers.push(data);
      setUsers(initialUsers);
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
      <UserModel
        open={open}
        handleClose={handleClose}
        label={'Edit User'}
        handleSave={(data) => handleSaveClick(data)}
        mode={'edit'}
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
