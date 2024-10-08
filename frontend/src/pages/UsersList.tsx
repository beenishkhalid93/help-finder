import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  title: string;
  name: string;
  date_opened: string;
  status: string;
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

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <Box>
      <Typography>User List</Typography>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.title}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default UsersList;
