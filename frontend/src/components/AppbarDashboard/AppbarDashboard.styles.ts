import { styled, Typography } from "@mui/material";

export const AppBarText = styled(Typography)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    flexGrow: 1,
    cursor: 'pointer',
    marginRight: theme.spacing(2), // Use theme.spacing for consistent margin
    fontWeight: isSelected ? 'bold' : 'normal', // Bold text for selected tab
    color: isSelected ? theme.palette.secondary.contrastText : 'inherit', // Conditional text color
  }));