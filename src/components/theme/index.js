import {createMuiTheme} from '@material-ui/core/styles/index';

const theme = createMuiTheme(
    {
      palette: {
        primary: {
          light: "#ffffff",
          main: "#eceff1",
          dark: "#babdbe",
          contrastText: "#000000",
        },
        secondary: {
          light: "#f05545",
          main: "#b71c1c",
          dark: "#7f0000",
          contrastText: "#ffffff",
        }
      },
      typography: {
        useNextVariants: true,
      }
    }
);

export default theme;