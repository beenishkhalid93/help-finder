import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
  fontFamily: "'Comfortaa', 'sans-serif'",
  h1: {
    fontWeight: 300,
    fontSize: '3.125rem',
    letterSpacing: '-0.015em',
  },
  h2: {
    fontWeight: 600,
    fontSize: '2rem',
    letterSpacing: '-0.015em',
    lineHeight: '1.2',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0.00735em',
  },
  body1: {
    fontWeight: 300,
    fontSize: '1rem',
    letterSpacing: '-0.005em',
    lineHeight: '1.5',
  },
  button: {
    fontWeight: 400,
    fontSize: '1rem',
    textTransform: 'none',
    letterSpacing: 'normal',
  },
  caption: {
    fontWeight: 300,
    fontSize: '0.8125rem',
    letterSpacing: '-0.015em',
    lineHeight: '1.2',
  },
};

export default typography;