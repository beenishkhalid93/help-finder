import { Box, styled } from "@mui/material";

export const ModelContainer = styled(Box)(({theme}) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.common.white,
    borderRadius: '8px',
    boxShadow: '24px',
    padding: theme.spacing(4),
}));

export const ModelActionContainer = styled(Box)(() => ({
    display: 'flex', 
    justifyContent: 'flex-end', 
    gap: 2
}));