import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper'
import ImageTabs from './ImageTabs'
import theme from '../../theme/'
import WorkspaceBar from './WorkspaceBar';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0

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
    cropEnabled : false,
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.props.controller.cropper = this.setCropState;
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

  _crop(){
   // image in dataUrl
   console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
 }

 setCropState = () => {
    this.state.cropEnabled = !this.state.cropEnabled;
 }

  render() {
    let showCanvas = {display: !this.state.cropEnabled ? "block" : "none"}
    let showCropper = {display: this.state.cropEnabled ? "block" : "none"}

    return(
        <Paper
            style={workspaceStyle}>
          <ImageTabs
              controller={this.props.controller}/>
          <div style={canvasContainerStyle}>

          {!this.state.cropEnabled && (
          <canvas
                style={showCanvas}
                ref={this.canvasRef}
                onMouseMove={this.canvasMovement}
                onMouseLeave={this.mouseLeaved}>
              Your browser do not support canvas
          </canvas>
          )}
          {this.props.controller.numberOfImages() > 0 && this.state.cropEnabled && (
            <Cropper
              ref='cropper'
              src={this.props.controller.getCanvas().toDataURL()}
              style={showCropper}
              guides={false}
              crop={this._crop.bind(this)} />
            )}
          </div>
          <WorkspaceBar
              position={this.state}
              image={this.props.controller.getSelectedImage()}/>
        </Paper>
    )
  }
}



export default ImageWorkspace;
