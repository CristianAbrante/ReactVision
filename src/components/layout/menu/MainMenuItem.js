import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

class MainMenuItem extends Component {
  state = {
    anchorEl: null,
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
    let optionId = event.target.id;
    this.props.updateAction(optionId);
  };

  handleOutClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { options, title } = this.props;
    const { open } = this.state;

    return (
        <div>
          <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}>
            {title}
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleOutClose}>
                      <MenuList>
                        {
                          options.map(option => (
                              <MenuItem
                                  key={option.id}
                                  id={option.id}
                                  onClick={this.handleClose}>
                                {option.name}
                              </MenuItem>
                          ))
                        }
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
            )}
          </Popper>
        </div>
    );
  }
}

export default MainMenuItem;
