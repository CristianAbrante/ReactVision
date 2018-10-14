import React, { Component } from "react";
import './App.css';
import MainMenu from "./components/menu/MainMenu";
import MenuData from "./data/menu";
import Info from "./components/info/Info";
import Action from "./components/actions/Action";
import ImageWorkspace from "./components/image-workspace/ImageWorkspace"

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme(
    {
      palette: {
        primary: {
          light: "#ffffff",
          main: "#eceff1",
          dark: "#babdbe",
          contrastText: "000000",
        },
        secondary: {
          light: "#f05545",
          main: "#b71c1c",
          dark: "#7f0000",
          contrastText: "#ffffff",
        }
      },
    }
);

class App extends Component {
  render() {
    const gridContainerClass = "grid-container";
    const gridItemClass = "grid-item";

    return (
        <MuiThemeProvider theme={theme}>
          <Paper className={gridContainerClass + " App"}>
            <div className={gridItemClass + " item-title title"}>
              <a href="https://github.com/CristianAbrante/ReactVision">
                React <span>Vision</span>
              </a>
            </div>
            <div className={gridItemClass + " item-menu"}>
              <MainMenu items={MenuData.items}></MainMenu>
            </div>
            <div className={gridItemClass + " item-workspace"}>
              <ImageWorkspace/>
            </div>
            <div className={gridItemClass + " item-info"}>
              <Info/>
            </div>
            <div className={gridItemClass + " item-action"}>
              <Action/>
            </div>
            <div className={gridItemClass + " item-footer footer"}>
              <Typography>
                <span>By </span>
                <a href="https://github.com/CristianAbrante">Cristian Abrante</a>
                <span> & </span>
                <a href="https://github.com/AlberTJ97">Alberto González</a>
              </Typography>
            </div>
          </Paper>
        </MuiThemeProvider>
    )
  }
}

export default App;
