import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from '@material-ui/core/es/Menu/Menu';

class MainMenuItem extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { options, title } = this.props;

    return (
        <div>
          <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
          >
            {title}
          </Button>
          <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
          >
            {options.map(option => (
                <MenuItem
                    key={option.id}
                    id={option.id}
                    onClick={this.handleClose}
                >
                  {option.name}
                </MenuItem>
            ))}
          </Menu>
        </div>
    );
  }
}

export default MainMenuItem;
