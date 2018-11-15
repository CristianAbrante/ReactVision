import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from '@material-ui/core/es/Menu/Menu';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

class MainMenuItem extends Component {
  state = {
    anchorEl: null,
    open: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { options, title } = this.props;
    const { open } = this.state;

    return (
        <div>
        <Button
           buttonRef={node => {
             this.anchorEl = node;
           }}
           aria-owns={open ? 'menu-list-grow' : null}
           aria-haspopup="true"
           onClick={this.handleClick}
         >
            {title}
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
           {({ TransitionProps, placement }) => (
             <Grow
               {...TransitionProps}
               id="menu-list-grow"
               style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
             >
               <Paper>
                 <ClickAwayListener onClickAway={this.handleClose}>
                   <MenuList>
                   {options.map(option => (
                       <MenuItem
                           key={option.id}
                           id={option.id}
                           onClick={this.handleClose}
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

        </div>
    );
  }
}

export default MainMenuItem;
