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
import CaseModel from '../../components/CaseModel/CaseModel';

export interface Case {
  id: number;
  title: string;
  name: string;
  dateOpened: string;
  status: string;
}

const initialCases: Case[] = [
  {
    id: 1,
    title: 'Orphan center',
    name: 'Ikram ul haq',
    dateOpened: '24-sep-2024',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Blood Donation center',
    name: 'Beenish Khalid',
    dateOpened: '15-feb-2024',
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
    setMode('add');
    setOpen(false);
    setEditingCase(null);
  };

  const handleSaveClick = (data: {
    id: number;
    name: string;
    title: string;
    dateOpened: string;
    status: string;
  }) => {
    if (editingCase) {
      setCases((prevCases) =>
        prevCases.map((editingCase) =>
          data.id === editingCase.id ? data : editingCase,
        ),
      );
    } else {
      const newId = initialCases.length + 1;
      data['id'] = newId;
      initialCases.push(data);
      setCases(initialCases);
    }

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
                <TableCell>{caseData.dateOpened}</TableCell>
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
      <CaseModel
        open={open}
        handleClose={handleClose}
        handleSave={(data) => handleSaveClick(data)}
        label={mode === 'edit' ? 'Edit Case' : 'Add Case'}
        mode={mode}
        initialData={editingCase ?? undefined}
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
