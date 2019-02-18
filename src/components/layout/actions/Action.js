import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import ActionPicker from './ActionPicker';
import Window from '../windows/Window';

class Action extends Component {

  renderAction() {
    let currentAction = this.props.currentAction;
    let controller = this.props.controller;

    if (currentAction === undefined) {
      return (<Typography>Pick any action from the menu.</Typography>);
    } else {
      return ActionPicker[currentAction](controller);
    }
  }

  render() {
    return(
        <Window title={this.props.currentActionName}>
          {this.renderAction()}
         </Window>
    )
  }
}

export default Action;
