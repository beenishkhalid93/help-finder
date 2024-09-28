import { FC, useState } from 'react';
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';
import {
  BottomContainer,
  BottomInnerContainer,
  TopContainer,
} from './DashboardPage.styles';
import StatCard from '../../components/Dashboard/StatCard';
import ProgressWidget from '../../components/Dashboard/ProgressWidget';

interface Task {
  title: string;
  subtasks: Array<{ name: string; status: string }>;
}

const tasks: Task[] = [
  {
    title: 'Task 1',
    subtasks: [
      { name: 'Subtask 1.1', status: 'Complete' },
      { name: 'Subtask 1.2', status: 'Incomplete' },
    ],
  },
  {
    title: 'Task 2',
    subtasks: [
      { name: 'Subtask 2.1', status: 'Incomplete' },
      { name: 'Subtask 2.2', status: 'Incomplete' },
    ],
  },
];

const DashboardPage: FC = () => {
  const activities = ['Activity 1', 'Activity 2', 'Activity 3'];

  const [openTask, setOpenTask] = useState<number | null>(null);

  // Toggle subtasks visibility for the selected task
  const handleToggleSubtasks = (index: number) => {
    setOpenTask(openTask === index ? null : index); // Toggle between open and closed state
  };

  return (
    <>
      <TopContainer>
        <List
          sx={{
            width: '60%',
          }}
        >
          {tasks.map((task, index) => (
            <React.Fragment key={index}>
              {/* Task with a toggle icon */}
              <ListItem>
                <ListItemText primary={task.title} />
                <ListItemIcon>
                  <IconButton onClick={() => handleToggleSubtasks(index)}>
                    {openTask === index ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </ListItemIcon>
              </ListItem>

              {/* Collapse table of subtasks */}
              <Collapse in={openTask === index} timeout="auto" unmountOnExit>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Subtask</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {task.subtasks.map((subtask, subIndex) => (
                        <TableRow key={subIndex}>
                          <TableCell component="th" scope="row">
                            {subtask.name}
                          </TableCell>
                          <TableCell align="right">{subtask.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
        <List
          sx={{
            width: '40%',
          }}
        >
          {activities.map((activity, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary={activity} />
            </ListItem>
          ))}
        </List>
      </TopContainer>

      <BottomContainer>
        <BottomInnerContainer>
          <ProgressWidget title="Completion Rate" value={75} />
          <ProgressWidget title="Monthly Target" value={50} />
        </BottomInnerContainer>
        <BottomInnerContainer>
          <StatCard title="Total Users" value="1,200" />
          <StatCard title="Active Cases" value="320" />
        </BottomInnerContainer>
      </BottomContainer>
    </>
  );
};

export default DashboardPage;
