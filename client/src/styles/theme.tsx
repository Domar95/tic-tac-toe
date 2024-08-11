import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Segoe UI", sans-serif',
  },
  palette: {
    background: {
      default: "#F5F5F5",
    },
    text: {
      primary: "#212121",
    },
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#757575",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#F5F5F5",
          backgroundColor: "#212121",
          "&:hover": {
            backgroundColor: "#424242",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F5F5",
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
