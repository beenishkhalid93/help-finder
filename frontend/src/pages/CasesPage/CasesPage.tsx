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
import {
  createCase,
  deleteCase,
  getCases,
  updateCase,
} from '../../services/caseService';

export interface Case {
  id?: number;
  title: string;
  name: string;
  dateOpened: string;
  status: string;
}

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
        const fetchedCases = await getCases();
        setCases(fetchedCases!);
      } catch (error) {
        console.error('Failed to load cases', error);
      }
    };

    loadCases();
  }, []);

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

  const saveCase = async (data: Case) => {
    try {
      const dataToSend = { ...data };
      delete dataToSend.id; // Remove id for new case creation

      if (editingCase) {
        await updateCase(data); // Update existing case
        setCases((prevCases) =>
          prevCases.map((prevCase) =>
            prevCase.id === data.id ? data : prevCase,
          ),
        );
      } else {
        const createdCase = await createCase(dataToSend); // Create new case
        setCases((prevCases) => [...prevCases, createdCase!]);
      }
    } catch (error) {
      console.error('Error saving case:', error);
    }

    handleClose();
  };

  const handleSaveClick = (data: Case) => saveCase(data);

  const handleDeleteClick = (caseDataId: number) => {
    setDeletingCaseId(caseDataId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setDeletingCaseId(null);
  };

  const handleConfirmDelete = async () => {
    if (deletingCaseId !== null) {
      try {
        await deleteCase(deletingCaseId);
        setCases((prevCases) =>
          prevCases.filter((caseData) => caseData.id !== deletingCaseId),
        );
      } catch (error) {
        console.error('Error deleting case:', error);
      }
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
                      onClick={() => handleDeleteClick(caseData.id as number)}
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
