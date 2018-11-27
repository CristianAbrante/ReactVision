import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TransposedProcessor from '../../../../processor/image/operations/TransposedProcessor';

 class TransposeImage extends Component {

   applyOperation = () => {
    
  };

   render() {
    return(
      <div>
        <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            onClick={this.applyOperation}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

 export default TransposeImage;
