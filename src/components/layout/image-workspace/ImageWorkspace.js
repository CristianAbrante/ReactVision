import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper'
import ImageTabs from './ImageTabs'
import theme from '../../theme/'
import WorkspaceBar from './WorkspaceBar';

const workspaceStyle = {
  background: theme.palette.primary.main,
  height: "100%",
  width: "71vw",
  display: "flex",
  flexDirection: "column",
  alignContent: "stretch"
};

const canvasContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "95%",
  overflow: "auto",
};

/**
 * Component used to render the main workspace
 * to work with images. It provides a tab
 * environment.
 * @param props
 */
class ImageWorkspace extends Component {
  canvasRef;
  state = {
    x: -1,
    y: -1,
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.props.controller.setCanvas(this.canvasRef.current);
  }

  canvasMovement = (event) => {
    this.setState({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY});
  };

  mouseLeaved = event => {
    this.setState({x: -1, y: -1});
  }

  render() {
    return(
        <Paper
            style={workspaceStyle}>
          <ImageTabs
              controller={this.props.controller}/>
          <div style={canvasContainerStyle}>
            <canvas
                ref={this.canvasRef}
                onMouseMove={this.canvasMovement}
                onMouseLeave={this.mouseLeaved}>
              Your browser do not support canvas
            </canvas>
          </div>
          <WorkspaceBar
              position={this.state}
              image={this.props.controller.getSelectedImage()}/>
        </Paper>
    )
  }
}



export default ImageWorkspace;