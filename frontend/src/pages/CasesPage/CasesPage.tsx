import { FC, useEffect, useState } from 'react';
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
import axios from 'axios';

export interface Case {
  id: number;
  title: string;
  name: string;
  dateOpened: string;
  status: string;
}

export interface newCase {
  id?: number;
  title: string;
  name: string;
  dateOpened: string;
  status: string;
}

const API_URL = 'http://localhost:8000/api/cases/';

const fetchCases = async () => {
  try {
    const response = await axios.get<Case[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};

const CasesPage: FC = () => {
  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [cases, setCases] = useState<Case[]>([]);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deletingCaseId, setDeletingCaseId] = useState<number | null>(null);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const fetchedCases = await fetchCases();
        setCases(fetchedCases);
      } catch (error) {
        console.error('Failed to load cases', error);
      }
    };

    loadCases();
  }, []);

  const createCase = async (caseData: newCase) => {
    const dataToSend = { ...caseData };
    delete dataToSend.id;

    try {
      const response = await axios.post(API_URL, dataToSend);
      return response.data;
    } catch (error) {
      console.error('Error creating case:', error);
      throw error;
    }
  };

  const deleteCase = async (caseId: number) => {
    try {
      await axios.delete(`${API_URL}${caseId}/`);
      setCases((prevCases) =>
        prevCases.filter((caseData) => caseData.id !== caseId),
      );
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

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

  const handleSaveClick = async (data: {
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

      try {
        const response = await axios.put(`${API_URL}${data.id}/`, data);
        console.log('Case updated:', response.data);
      } catch (error) {
        console.error('Error updating case:', error);
      }
    } else {
      const newId = cases.length + 1;
      data['id'] = newId;

      try {
        const createdCase = await createCase(data);
        cases.push(createdCase);
        console.log('Case created:', createdCase);
      } catch (error) {
        console.error('Error creating case:', error);
      }
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
      deleteCase(deletingCaseId);
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
