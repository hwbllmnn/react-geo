import * as React from 'react';
import { Slider } from 'antd';
import OlLayerBase from 'ol/layer/Base';

/**
 *
 * @export
 * @interface TimeSliderProps
 * @extends {Partial<LayerTransparencySliderDefaultProps>}
 */
export interface LayerTransparencySliderProps {
  /**
   * The layer to handle.
   */
  layer: OlLayerBase;
}

/**
 * The LayerTransparencySlider.
 *
 * @class The LayerTransparencySlider
 * @extends React.Component
 */
class LayerTransparencySlider extends React.Component<LayerTransparencySliderProps> {

  /**
   * Sets the transparency to the provided layer.
   *
   * @param {Number} transparency The transparency to set, provide a value
   *                              between 0 (fully visible) and 100 (fully
   *                              transparent).
   */
  setLayerTransparency(transparency: number) {
    const {
      layer
    } = this.props;
    let opacity = 1 - (transparency / 100);
    // Round the opacity to two digits.
    opacity = Math.round((opacity) * 100) / 100;
    layer.setOpacity(opacity);
  }

  /**
   * Returns the transparency from the provided layer.
   *
   * @return {Number} The transparency of the layer.
   */
  getLayerTransparency() {
    const {
      layer
    } = this.props;
    // 1 = fully opaque/visible.
    let opacity = layer.getOpacity();
    let transparency = (1 - opacity) * 100;
    // Remove any digits.
    transparency = Math.round(transparency);
    return transparency;
  }

  /**
   * The render function.
   */
  render() {
    const {
      layer,
      ...passThroughProps
    } = this.props;

    return (
      <Slider
        tipFormatter={value => `${value}%`}
        defaultValue={this.getLayerTransparency()}
        onChange={(value) => {
          this.setLayerTransparency(value as number);
        }}
        {...passThroughProps}
      />
    );
  }
}

export default LayerTransparencySlider;
