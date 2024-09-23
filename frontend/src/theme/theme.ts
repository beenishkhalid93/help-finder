import { createTheme } from "@mui/material";
import typography from "./typography";

const theme = createTheme(
    {
        palette: {
            primary : {
            main: '#1565c0',
            light: '#1976d2',
            dark: '#0d47a1',
            contrastText: '#fff',
          },
          secondary : {
            main: '#fff',
            light: '#fafafa',
            dark: '#f5f5f5',
            contrastText: '#000',
          }},
        typography,
    }
);
export default theme;