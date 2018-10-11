import React, { Component } from "react";
import MainMenuItem from "./MainMenuItem";
import Paper from "@material-ui/core/Paper";

class MainMenu extends Component {
  state = { open: false };
  render() {
    const items = this.props.items;
    return (
      <nav>
        <Paper>
          {items.map(item => (
            <MainMenuItem
              key={item.title}
              title={item.title}
              options={item.options}
            />
          ))}
        </Paper>
      </nav>
    );
  }
}

export default MainMenu;
