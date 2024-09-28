import { Box, styled } from "@mui/material";

export const TopContainer = styled(Box)(() => ( {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
}));

export const BottomContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
}));

export const BottomInnerContainer = styled(Box)(() => ({
    display: 'flex',
    gap: '20px',
}));