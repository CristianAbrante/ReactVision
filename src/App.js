import React, { Component } from "react";
import './App.css';
//import MainMenu from "./components/menu/MainMenu";
//import MenuData from "./data/menu";
import Info from "./components/info/Info";
import Action from "./components/actions/Action";
import ImageWorkspace from "./components/image-workspace/ImageWorkspace"

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

class App extends Component {
  render() {
    const gridContainerClass = "grid-container";
    const gridItemClass = "grid-item";

    return (
        <Paper className={gridContainerClass + " App"}>
          <div className={gridItemClass + " item-title title"}>
            <a href="https://github.com/CristianAbrante/ReactVision">
              React <span>Vision</span>
            </a>
          </div>
          <div className={gridItemClass + " item-menu"}>

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
    )


    /*
    return (
        <Paper className="App">
          <h3 className="title">
            React <span>Vision</span>
          </h3>
          <div className={gridContainerClass}>
            <div className={gridItemClass + " item-menu"}>

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
          </div>
          <footer className="footer">
            <Typography>
              <a href="https://github.com/CristianAbrante">Cristian Abrante</a>
              <span> & </span>
              <a href="https://github.com/AlberTJ97">Alberto González</a>
            </Typography>
          </footer>
        </Paper>
    )
    */
    /*
    return (
      <Paper className={gridContainerClass + " App"}>

        <div className={gridItemClass + " item-title"}>
          <h3 className="title">
            React <span>Vision</span>
          </h3>
        </div>
        <div className={gridItemClass + " item-menu"}>

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
        <div className={gridItemClass + " item-footer"}>
          <Typography className="footer">
            <a href="https://github.com/CristianAbrante">Cristian Abrante</a>
            <span> & </span>
            <a href="https://github.com/AlberTJ97">Alberto González</a>
          </Typography>
        </div>
      </Paper>
    );*/
  }
}

export default App;
