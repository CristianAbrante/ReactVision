import React, { Component } from "react";
import './App.css';
import MainMenu from "./components/layout/menu/MainMenu";
import MenuData from "./data/menu";
import Info from "./components/layout/info/Info";
import Action from "./components/layout/actions/Action";
import ImageWorkspace from "./components/layout/image-workspace/ImageWorkspace"
import Footer from "./components/layout/footer/"
import Theme from "./components/theme"

import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider} from '@material-ui/core/styles';

class App extends Component {
  render() {
    const gridContainerClass = "grid-container";
    const gridItemClass = "grid-item";

    return (
        <MuiThemeProvider theme={Theme}>
          <Paper className={gridContainerClass + " App"}>
            <div className={gridItemClass + " item-menu"}>
              <MainMenu items={MenuData.items} />
            </div>
            <div className={gridItemClass + " item-workspace"}>
              <ImageWorkspace />
            </div>
            <div className={gridItemClass + " item-info"}>
              <Info />
            </div>
            <div className={gridItemClass + " item-action"}>
              <Action />
            </div>
            <div className={gridItemClass + " item-footer"}>
              <Footer />
            </div>
          </Paper>
        </MuiThemeProvider>
    )
  }
}

export default App;
