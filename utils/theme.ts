'use client';

import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#374151', // Dark gray for text
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", "Roboto", "Arial", sans-serif',
    h4: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#374151',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
  },
});

export default theme;
