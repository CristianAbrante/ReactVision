import React, { Component } from "react";
import './App.css';
import MainMenu from "./components/layout/menu/MainMenu";
import MenuData from "./data/menu";
import Info from "./components/layout/info/Info";
import Action from "./components/layout/actions/Action";
import ImageWorkspace from "./components/layout/image-workspace/ImageWorkspace"
import Footer from "./components/layout/footer/"
import Theme from "./components/theme"

import ImageController from './processing/ImageController';

import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider} from '@material-ui/core/styles';

class App extends Component {
  state = {
    controller: undefined,
    currentAction: undefined,
  }

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
      <MuiThemeProvider theme={Theme}>
        <Paper className={gridContainerClass + " App"}>
          <div className={gridItemClass + " item-menu"}>
            <MainMenu
                items={MenuData.items}
                updateAction={this.updateCurrentAction}/>
          </div>
          <div className={gridItemClass + " item-workspace"}>
            <ImageWorkspace controller={this.state.controller}/>
          </div>
          <div className={gridItemClass + " item-info"}>
            <Info />
          </div>
          <div className={gridItemClass + " item-action"}>
            <Action
                controller={this.state.controller}
                currentAction={this.state.currentAction}/>
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
