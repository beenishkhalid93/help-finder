import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import App from './App.tsx'

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    </ThemeProvider>
  </StrictMode>,
)
