import { Box, styled, Typography } from "@mui/material"

export const AppBarContainer = styled(Box)(() => ({
    alignItems: 'center',
    gap: 10,
    display: 'flex',
    
}));

export const AppBarText = styled(Typography)(() => ({
    flexGrow: 1, 
    cursor: 'pointer' ,
    marginRight: 2,
}));