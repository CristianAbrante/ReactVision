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
import ImageDifference from './point/non-lineal/ImageDifference';
import ChangesDetection from './point/non-lineal/ChangesDetection';
import CrossImageSelection from './point/non-lineal/cross-image/CrossImageSelection';
import ImageQuantization from './point/non-lineal/ImageQuantization';
//Geometric operations
import ImageFlipper from './geometric/ImageFlipper';
import TransposedImage from './geometric/TransposedImage';
import Scaling from './geometric/Scaling';
import RotateImage from './geometric/RotateImage';
import Rotation from './geometric/Rotation';

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
  image_difference: controller => {return <ImageDifference controller={controller}/>},
  changes_detection: controller => {return <ChangesDetection controller={controller}/>},
  cross_image: controller => {return <CrossImageSelection controller={controller}/>},
  image_flipper: controller => {return <ImageFlipper controller={controller}/>},
  image_transpose: controller => {return <TransposedImage controller={controller}/>},
  scale_image: controller => {return <Scaling controller={controller}/>},
  rotate_image: controller => {return <RotateImage controller={controller}/>},
  rotation: controller => {return <Rotation controller={controller}/>},
  image_quantization: controller => {return <ImageQuantization controller={controller}/>},
};

export default actionPicker;
