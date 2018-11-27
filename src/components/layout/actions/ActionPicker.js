import React from 'react';
import LoadImage from './LoadImageAction';
import SaveImage from './SaveImageAction';

// Lineal point operations.
import BlackAndWhite from './point/lineal/BlackAndWhite';
import LinealPicewiseAdjustment from './point/lineal/LinealPicewiseAdjustment';
import BrightnessAndContrast from './point/lineal/BrightnessAndContrast';

// Non lineal point operation.
import HistogramEqualization from './point/non-lineal/HistogramEqualization';
import HistogramSpecification from './point/non-lineal/HistogramSpecification';
import GammaCorrection from './point/non-lineal/GammaCorrection';

//Geometric operations
import ImageFlipper from './geometric/ImageFlipper';
import TransposeImage from './geometric/TransposeImage';


/**
 * Action picker object determines
 * witch action to display in any moment.
 *
 * @type {{load_img: (function(*): *)}}
 */
let actionPicker = {
  load_img: controller => {return <LoadImage controller={controller}/>},
  save_img: controller => {return <SaveImage controller={controller}/>},
  black_white: controller => {return <BlackAndWhite controller={controller}/>},
  lineal_adjustment: controller => {return <LinealPicewiseAdjustment controller={controller}/>},
  brightness_contrast: controller => {return <BrightnessAndContrast controller={controller}/>},
  histogram_equalization: controller => {return <HistogramEqualization controller={controller}/>},
  histogram_specification: controller => {return <HistogramSpecification controller={controller}/>},
  gamma_correction: controller => {return <GammaCorrection controller={controller}/>},
  image_flipper: controller => {return <ImageFlipper controller={controller}/>},
  image_transpose: controller => {return <TransposeImage controller={controller}/>},
};

export default actionPicker;
