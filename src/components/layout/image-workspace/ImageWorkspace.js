import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper'
import ImageTabs from './ImageTabs'
import theme from '../../theme/'
import WorkspaceBar from './WorkspaceBar';
import ProcessImage from '../../../processor/image/ProcessImage'
import RegionSelect from 'react-region-select';
import objectAssign from 'object-assign';
import Button from '@material-ui/core/Button';

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

const regionStyle = {
  background: 'rgba(0, 102, 204, 0.5)'
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
    regions: [],
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.regionRenderer = this.regionRenderer.bind(this);
		this.updateRegions = this.updateRegions.bind(this);
    this.props.keyController("Escape", this.handleKeyPress);
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

 setCropState = () => {
    this.state.cropEnabled = !this.state.cropEnabled;
 }

handleCrop = () => {
    let originalImageData = this.props.controller.getSelectedImage();

    let fromX = originalImageData.getWidth() * (this.state.regions[0].x/100);
    let fromY = originalImageData.getHeight() * (this.state.regions[0].y/100);
    let toX =  originalImageData.getWidth() * (this.state.regions[0].width/100);
    let toY =  originalImageData.getHeight() * (this.state.regions[0].height/100);

    let ctx = this.props.controller.getCanvas().getContext('2d');
    let imageData = new ImageData(ctx.getImageData(fromX, fromY, toX, toY).data, toX, toY);

    this.handleKeyPress();
    let image = new ProcessImage(originalImageData.getTitle() + " - Copy", imageData.data, imageData.width, imageData.height);
    this.props.controller.add(image);

}

 updateRegions (regions) {
		this.setState({
			regions: regions
		});
	}

	regionRenderer (regionProps) {
		if (!regionProps.isChanging) {
			return (

        <div style={{ position: 'absolute', bottom: '-2.5em'}}>
        <Button variant="contained" color="secondary" onClick={this.handleCrop}>
        Crop
      </Button>

      </div>
			);
		}
	}

  handleKeyPress = () => {
    this.setState({ regions: [] });
}

  render() {
    let showCropper = {display: this.props.controller.numberOfImages > 0 ? "none" : "block"}

    return(
        <Paper
            style={workspaceStyle}>
          <ImageTabs
              controller={this.props.controller}/>
          <div style={canvasContainerStyle}
          >

          <RegionSelect
						maxRegions={1}
						regions={this.state.regions}
            regionStyle={regionStyle}
						constraint
            regionRenderer={this.regionRenderer}
						onChange={this.updateRegions}
						style={showCropper}
					>

          <canvas
                ref={this.canvasRef}
                onMouseMove={this.canvasMovement}
                onMouseLeave={this.mouseLeaved}>
              Your browser do not support canvas
          </canvas>
          </RegionSelect>

          </div>
          <WorkspaceBar
              position={this.state}
              controller={this.props.controller}/>
        </Paper>
    )
  }
}



export default ImageWorkspace;
