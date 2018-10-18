import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
//import SizeMe from 'react-sizeme';
import './ImageWorkspace.css';

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
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  handleChange = (event, value) => {
    this.setState({value})
  };

  componentDidMount() {
    console.log(this.size);
    //this.refs.canvas.width = this.container.current.offsetWidth;
  }

  render() {
    return(
        <Paper
            ref={this.container}
            className="action-workspace">
          <Tabs
              value={this.state.value}
              onChange={this.handleChange}
          >
            <Tab label="item one"/>
            <Tab label="item two"/>
            <Tab label="item three"/>
          </Tabs>
          <canvas
              ref="canvas"
          >
          </canvas>
        </Paper>
    )
  }
}

export default ImageWorkspace;
