import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';
import React from 'react';

//propiedades del componente ThemeConfig
interface Props {
  children: React.ReactNode;
}

//paleta de colores y fuentes globales
export enum ThemePalette {
  BG = '#12181b',
  LIME = '#a2c11c',
  FONT_GLOBAL = 'jetbrains mono, monospace',
}

// Opciones del tema
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: { default: ThemePalette.BG },
    primary: {
      main: ThemePalette.LIME,
    },
  },
  typography: {
    fontFamily: ThemePalette.FONT_GLOBAL,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '0.5em',
          backgroundColor: ThemePalette.LIME,
          fontFamily: ThemePalette.FONT_GLOBAL,
          '&:hover': {
            backgroundColor: '#8aa517', // Color de hover
          },
        },
      },
    },
  },
};

// Creación del tema con las opciones definidas
const theme = createTheme(themeOptions);

// aplica el tema a sus hijos
export const ThemeConfig: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
