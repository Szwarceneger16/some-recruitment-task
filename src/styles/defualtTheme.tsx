import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1C5CC5',
      contrastText: '#FFFFFF',
      dark: '#454860',
      light: '#3578EB'
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#1C5CC5',
      dark: '#C2CBD9',
      light: '#3578EB'
    }
  },
  typography: {
    fontFamily: 'Lora, serif',
    fontWeightMedium: 'bold',
    fontWeightRegular: 'bold'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          minHeight: '100vh',
          background: 'linear-gradient(60deg, #1C5CC5 46%,#ffffff 54%)',
          '& div#root': {
            minHeight: 'inherit'
          }
        },
        a: {
          textDecoration: 'none',
          color: 'black'
        },
        '.MuiAutocomplete-option': {
          fontSize: '1rem'
        }
      }
    }
  }
});
