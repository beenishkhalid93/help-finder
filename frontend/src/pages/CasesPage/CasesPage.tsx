import { FC, useState } from 'react';
import {
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Fab,
} from '@mui/material';
import { FullPageWrapper, TableDashboard } from '../../styles/common.styles';
import { Edit, Delete, Add } from '@mui/icons-material';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import CustomModel from '../../components/CustommModel/CustomModel';

interface Case {
  id: number;
  title: string;
  name: string;
  date_opened: string;
  status: string;
}

const initialCases: Case[] = [
  {
    id: 1,
    title: 'Orphan center',
    name: 'Ikram ul haq',
    date_opened: '24-sep-2024',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Blood Donation center',
    name: 'Beenish Khalid',
    date_opened: '15-feb-2024',
    status: 'In progress',
  },
];

const CasesPage: FC = () => {
  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deletingCaseId, setDeletingCaseId] = useState<number | null>(null);

  const handleEditClick = (caseData: Case) => {
    setMode('edit');
    setEditingCase(caseData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCase(null);
  };

  const handleSaveClick = (data: Case) => {
    console.log(data);
    initialCases.push(data);
    console.log(initialCases);
    /*   if (editingCase) {
      setCases((prevCases) =>
        prevCases.map((caseData) =>
          caseData.id === editingCase.id ? editingCase : caseData,
        ),
      );
    } */
    handleClose();
  };

  const handleDeleteClick = (caseDataId: number) => {
    setDeletingCaseId(caseDataId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeletingCaseId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingCaseId !== null) {
      setCases((prevCases) =>
        prevCases.filter((caseData) => caseData.id !== deletingCaseId),
      );
    }
    handleDeleteClose();
  };

  const handleAddCaseClick = () => {
    setMode('add');
    setEditingCase(null);
    setOpen(true);
  };

  return (
    <FullPageWrapper>
      {/* User Table */}
      <TableContainer component={Paper}>
        <TableDashboard aria-label="case table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Date Opened</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cases.map((caseData) => (
              <TableRow key={caseData.id}>
                <TableCell>{caseData.id}</TableCell>
                <TableCell>{caseData.title}</TableCell>
                <TableCell>{caseData.name}</TableCell>
                <TableCell>{caseData.date_opened}</TableCell>
                <TableCell>{caseData.status}</TableCell>
                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(caseData)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteClick(caseData.id)}
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
        onClick={handleAddCaseClick}
        sx={{ margin: 2 }}
      >
        <Add sx={{ mr: 1 }} />
        Add Case
      </Fab>

      {/* Edit Case Modal */}
      <CustomModel
        open={open}
        handleClose={handleClose}
        handleSave={handleSaveClick}
        label={'Case'}
        mode={mode}
        initialData={{
          title: editingCase?.title ?? '',
          name: editingCase?.name ?? '',
          dateOpened: editingCase?.date_opened ?? '',
          status: editingCase?.status ?? '',
        }}
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

export default CasesPage;
