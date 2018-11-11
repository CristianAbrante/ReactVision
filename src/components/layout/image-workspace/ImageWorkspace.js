import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper'
import ImageTabs from './ImageTabs'

/**
 * Component used to render the main workspace
 * to work with images. It provides a tab
 * environment.
 * @param props
 */
class ImageWorkspace extends Component {
  state = {
    value: 0,
    size: 0
  };

  size = 0;

  handleChange = (event, value) => {
    this.setState({value})
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return(
        <Paper
            style={{height: "100%"}}
            ref={this.container}
            className="action-workspace">
          <ImageTabs />
          <canvas
              ref="canvas">
            Your browser do not support canvas
          </canvas>
        </Paper>
    )
  }
}



export default ImageWorkspace;