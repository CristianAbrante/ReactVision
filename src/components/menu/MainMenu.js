import React, { Component } from "react";
import MainMenuItem from "./MainMenuItem";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";

const pStyle = {
  padding: 0
};

class MainMenu extends Component {
  state = { open: false };
  render() {
    const items = this.props.items;
    return (
      <nav class="main-navigator">
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
