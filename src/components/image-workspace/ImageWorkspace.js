import React, {Component} from 'react';

/**
 * Component used to render the main workspace
 * to work with images. It provides a tab
 * environment.
 * @param props
 */
class ImageWorkspace extends Component {
  render() {
    return(
        <div className={this.props.className}>
          This is going to be the image workspace
        </div>
    )
  }
}

export default ImageWorkspace;