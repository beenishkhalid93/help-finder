import { FC, useEffect, useState, useCallback } from 'react';
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
  Typography,
} from '@mui/material';
import { FullPageWrapper, TableDashboard } from '../../styles/common.styles';
import { Edit, Delete, Add } from '@mui/icons-material';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import CaseModel from '../../components/CaseModel/CaseModel';
import { useCase } from '../../hooks/useCase';

export interface Case {
  id?: number;
  title: string;
  name: string;
  dateOpened: string;
  status: string;
}

const CasesPage: FC = () => {
  const { cases, loading, error, fetchCases, addCase, editCase, removeCase } =
    useCase();

  const [mode, setMode] = useState<'edit' | 'add'>('add');
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deletingCaseId, setDeletingCaseId] = useState<number | null>(null);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const handleEditClick = useCallback((caseData: Case) => {
    setMode('edit');
    setEditingCase(caseData);
    setOpen(true);
  }, []);

  const handleAddCaseClick = useCallback(() => {
    setMode('add');
    setEditingCase(null);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setMode('add');
    setOpen(false);
    setEditingCase(null);
  }, []);

  const handleSaveClick = useCallback(
    async (data: Case) => {
      if (mode === 'edit' && editingCase) {
        await editCase(data);
      } else {
        await addCase(data);
      }
      handleClose();
    },
    [editCase, addCase, handleClose, mode, editingCase],
  );

  const handleDeleteClick = useCallback((caseId: number) => {
    setDeletingCaseId(caseId);
    setOpenDeleteDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (deletingCaseId !== null) {
      await removeCase(deletingCaseId);
    }
    setOpenDeleteDialog(false);
    setDeletingCaseId(null);
  }, [removeCase, deletingCaseId]);

  const handleDeleteClose = useCallback(() => {
    setOpenDeleteDialog(false);
    setDeletingCaseId(null);
  }, []);

  return (
    <FullPageWrapper>
      {loading && <Typography variant="h6">Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

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

      <CaseModel
        open={open}
        handleClose={handleClose}
        handleSave={handleSaveClick}
        label={mode === 'edit' ? 'Edit Case' : 'Add Case'}
        mode={mode}
        initialData={editingCase ?? undefined}
      />

      <ConfirmationDialog
        openDeleteDialog={openDeleteDialog}
        handleDeleteClose={handleDeleteClose}
        handleConfirmDelete={handleConfirmDelete}
      />
    </FullPageWrapper>
  );
};

export default CasesPage;
