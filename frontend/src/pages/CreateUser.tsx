import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { FullPageWrapper } from '../styles/common.styles';

// Define the interface for a new user
interface NewUser {
  title: string;
  name: string;
  date_opened: string;
  status: string;
}

// Define the API URL
const API_URL = 'http://localhost:8000/api/users/';

// Function to create a new user via POST request
const createUser = async (userData: NewUser) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// React Component to handle form and create a user
const CreateUser: React.FC = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [dateOpened, setDateOpened] = useState('');
  const [status, setStatus] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new user object
    const newUser: NewUser = {
      title,
      name,
      date_opened: dateOpened,
      status,
    };

    try {
      const createdUser = await createUser(newUser);
      console.log('User created:', createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <FullPageWrapper>
      <Typography>Create New User</Typography>
      <form onSubmit={handleSubmit}>
        <Box>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Box>
        <Box>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box>
          <label>Date Opened: </label>
          <input
            type="date"
            value={dateOpened}
            onChange={(e) => setDateOpened(e.target.value)}
            required
          />
        </Box>
        <Box>
          <label>Status: </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </Box>
        <button type="submit">Create User</button>
      </form>
    </FullPageWrapper>
  );
};

export default CreateUser;
