import { useState, useCallback } from 'react';
import { User } from '../pages/UsersPage/UsersPage';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

interface UseUserHook {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  removeUser: (userId: number) => Promise<void>;
}

export const useUser = (): UseUserHook => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add user
  const addUser = useCallback(async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await createUser(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setError(null);
    } catch (err) {
        console.log('catch in hook')
     
      
      if (err instanceof Error) {
        setError(err.message);
        console.error('Caught Error: ', err.message);
        throw new Error(err.message);
      }
      else{
        console.error('Caught Error: An error occurred');
    }

    } finally {
      setLoading(false);
    }
  }, []);

  // Edit user
  const editUser = useCallback(async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      await updateUser(user);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove user
  const removeUser = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    editUser,
    removeUser,
  };
};
