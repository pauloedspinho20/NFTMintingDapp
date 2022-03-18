import { number } from 'prop-types';
import { useState } from 'react';
import 'rc-slider/assets/index.css';

import Slider, { SliderTooltip } from 'rc-slider';

import './Range.scss';

const { Handle } = Slider;

const handle = props => {
  const {
    value, dragging, index, ...restProps
  } = props;

  return (
    <SliderTooltip
      overlay={ `${parseInt(restProps.offset, 10)} %` }
      visible
      placement="bottom"
      key={ index }
    >
      <Handle value={ value } { ...restProps } />
    </SliderTooltip>
  );
};

const Range = (...props) => {
  const [ value, setValue ] = useState(props.value);
  return (
    <Slider
      min={ props.min }
      max={ props.max }
      value={ value }
      onChange={ event => {
        setValue(event);
      } }
      handle={ handle }
    />
  );
};
Range.propTypes = {
  min: number,
  max: number,
  value: number,
};

Range.defaultProps = {
  min: 0,
  max: 0,
  value: 0,
};

export default Range;
