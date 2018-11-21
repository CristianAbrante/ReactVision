import React from 'react';
import LoadImage from './LoadImageAction';
import SaveImage from './SaveImageAction';
import LinealPicewiseAdjustment from './lineal/piecewise-adjustment/LinealPicewiseAdjustment';

/**
 * Action picker object determines
 * witch action to display in any moment.
 *
 * @type {{load_img: (function(*): *)}}
 */
let actionPicker = {
  load_img: controller => {return <LoadImage controller={controller}/>},
  save_img: controller => {return <SaveImage controller={controller}/>},
  lineal_adjustment: controller => {return <LinealPicewiseAdjustment controller={controller}/>}
};

export default actionPicker;
