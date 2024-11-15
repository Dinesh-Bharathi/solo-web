import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#191919",
    },
    secondary: {
      main: "#87E64B",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
