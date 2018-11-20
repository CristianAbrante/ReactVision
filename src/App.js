import React, { Component } from "react";
import './App.css';
import MainMenu from "./components/layout/menu/MainMenu";
import MenuData from "./data/menu";
import Info from "./components/layout/info/Info";
import Action from "./components/layout/actions/Action";
import ImageWorkspace from "./components/layout/image-workspace/ImageWorkspace"
import Footer from "./components/layout/footer/"
import Theme from "./components/theme"

import ImageController from './processor/controller/ImageController';

import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider} from '@material-ui/core/styles';

class App extends Component {
  state = {
    controller: undefined,
    currentAction: undefined,
  };

  constructor(props) {
    super(props);
    this.state.controller = new ImageController(this.updateController)
  }

  updateController = () => {
    this.setState({controller: this.state.controller});
  };

  updateCurrentAction = action => {
    this.setState({currentAction: action});
  };

  render() {
    const gridContainerClass = "grid-container";
    const gridItemClass = "grid-item";

    return (
        <MuiThemeProvider theme={theme}>
          <Paper className={gridContainerClass + " App"}>
            <div className={gridItemClass + " menubar"}>
            <div className={gridItemClass + " title"}>
              <a href="https://github.com/CristianAbrante/ReactVision">
              React <span>Vision</span>
              </a>
            </div>
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
