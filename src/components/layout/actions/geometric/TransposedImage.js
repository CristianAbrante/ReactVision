import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ErrorHandler from '../../error/ErrorHandler';
import TransposedProcessor from '../../../../processor/operations/geometric/TransposedProcessor';

 class TransposedImage extends Component {
   state = {
     error: false,
     errorMsg: "error",
   };

   handleError = (msg) => {
     this.setState({error: true, errorMsg: msg})
   };

   closeError = (msg) => {
     this.setState({error: false})
   };

   applyOperation = () => {
     try {
       let selectedImage = this.props.controller.getSelectedImage();

       if(selectedImage.getWidth() != selectedImage.getHeight()) {
         throw new Error('the image must have same height and width.');
       }

       this.props.controller.getSelectedImage().createNewState();
       this.props.controller.getSelectedImage().setNextState();

       TransposedProcessor.applyGeometricChange(selectedImage);

       this.props.controller.updateImageHistogram();
       this.props.controller.updateImageCanvas();
       this.props.controller.updateMethod();
     } catch (e) {
         this.handleError(e.message);
     }
  };

   render() {
    return(
      <div>
      <div>
        <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            onClick={this.applyOperation}>
          <AddIcon />
        </Button>
        </div>
        <ErrorHandler
            open={this.state.error}
            errorMsg={this.state.errorMsg}
            handler={this.closeError}/>
      </div>
    );
  }
}

 export default TransposedImage;
