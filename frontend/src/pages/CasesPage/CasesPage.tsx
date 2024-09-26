import { FC } from 'react';
import {
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import {
  FullPageWrapper,
  TableDashboard,
  TableRowDashboard,
} from '../../styles/common.styles';

const CasesPage: FC = () => {
  function createData(
    case_id: number,
    case_title: string,
    user_name: string,
    date_opened: string,
    status: string,
  ) {
    return { case_id, case_title, user_name, date_opened, status };
  }

  const rows = [
    createData(1, 'Orphan center', 'Ikram ul haq', '24-sep-2024', 'Open'),
    createData(
      2,
      'Blood Donation center',
      'Beenish Khalid',
      '15-feb-2024',
      'In progress',
    ),
  ];

  return (
    <FullPageWrapper>
      <TableContainer component={Paper}>
        <TableDashboard aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Case ID</TableCell>
              <TableCell align="right">Case Title</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Date Opened</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRowDashboard key={row.case_id} hover>
                <TableCell component="th" scope="row">
                  {row.case_id}
                </TableCell>
                <TableCell align="right">{row.case_title}</TableCell>
                <TableCell align="right">{row.user_name}</TableCell>
                <TableCell align="right">{row.date_opened}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRowDashboard>
            ))}
          </TableBody>
        </TableDashboard>
      </TableContainer>
    </FullPageWrapper>
  );
};

export default CasesPage;
