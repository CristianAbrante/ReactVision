import React, { Component } from "react";
import MainMenuItem from "./MainMenuItem";
import Paper from "@material-ui/core/Paper";
import Toolbar from '@material-ui/core/Toolbar'

class MainMenu extends Component {
  state = { open: false };
  render() {
    const items = this.props.items;
    return (
      <nav>
        <Toolbar>
          {items.map(item => (
            <MainMenuItem
              key={item.title}
              title={item.title}
              options={item.options}
            />
          ))}
        </Toolbar>
      </nav>
    );
  }
}

export default MainMenu;
