import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import zIndex from "@material-ui/core/styles/zIndex"
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

/*
class MainMenuItem extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { options, title } = this.props;

    return (
      <React.Fragment>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          {title}
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper style={{zIndex: zIndex.tooltip}}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList style={{zIndex: zIndex.tooltip}}>
                    {options.map(option => (
                      <MenuItem
                        key={option.id}
                        id={option.id}
                        onClick={this.handleClose}
                        style={{zIndex: zIndex.tooltip, background: "white"}}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}
*/
export default MainMenuItem;
