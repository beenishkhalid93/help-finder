import { FC } from 'react';
import {
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  FullPageWrapper,
  TableDashboard,
  TableRowDashboard,
} from '../../styles/common.styles';

const UsersPage: FC = () => {
  const navigate = useNavigate();

  const handleRowClickUser = (user_id: number) => {
    navigate(`/profile/${user_id}`);
  };

  function createData(user_id: number, user_name: string, user_email: string) {
    return { user_id, user_name, user_email };
  }

  const rows = [
    createData(1, 'Beenish Khalid', 'beenishkhalid93@gmail.com'),
    createData(2, 'Ikram ul Haq', 'ikramulhaq1992@gmail.com'),
  ];

  return (
    <FullPageWrapper>
      <TableContainer component={Paper}>
        <TableDashboard aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRowDashboard
                key={row.user_id}
                hover
                onClick={() => handleRowClickUser(row.user_id)}
              >
                <TableCell component="th" scope="row">
                  {row.user_id}
                </TableCell>
                <TableCell align="right">{row.user_name}</TableCell>
                <TableCell align="right">{row.user_email}</TableCell>
              </TableRowDashboard>
            ))}
          </TableBody>
        </TableDashboard>
      </TableContainer>
    </FullPageWrapper>
  );
};

export default UsersPage;
