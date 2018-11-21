import React, { PureComponent } from "react";
import Paper from '@material-ui/core/Paper'
import ImageTabs from './ImageTabs'
import theme from '../../theme/'
import WorkspaceBar from './WorkspaceBar';
import Cropper from './react-cropper';

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
class ImageWorkspace extends PureComponent  {
  canvasRef;
  state = {
    x: -1,
    y: -1,
    src: "",
    crop: {
      x: 10,
      y: 10,
      width: 50
    }
  };

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.controller.setCanvas(this.canvasRef.current);
  // }

  canvasMovement = (event) => {
    this.setState({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY});
  };

  mouseLeaved = event => {
    this.setState({x: -1, y: -1});
  }

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  getCroppedImg(image, pixelCrop, fileName) {
    console.log("getcropeed")
    console.log(image);
    console.log(pixelCrop);
    console.log(fileName);
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    if(this.props.controller.numberOfImages() > 0){
      this.state.src = this.props.controller.canvas.toDataURL();
      //console.log(this.props.controller.canvas.toDataURL())
    }


    const { croppedImageUrl } = this.state;
    // <Cropper
    //   ref={this.canvasRef}
    //   src={this.state.src}
    //   crop={this.state.crop}
    //   onImageLoaded={this.onImageLoaded}
    //   onComplete={this.onCropComplete}
    //   onChange={this.onCropChange}
    // />
    console.log(typeof this.canvasRef)
    return(
        <Paper
            style={workspaceStyle}>
          <ImageTabs
              controller={this.props.controller}/>
          <div style={canvasContainerStyle}>


          <Cropper

                      aspectRatio={16 / 9}
                      preview=".img-preview"
                      guides={false}
                      src={this.state.src}
                      controller={this.props.controller}
              />
        


          </div>
          <WorkspaceBar
              position={this.state}
              image={this.props.controller.getSelectedImage()}/>
        </Paper>
    )
  }
}



export default ImageWorkspace;
