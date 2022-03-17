import {
  bool, func, number, oneOfType, string,
} from 'prop-types';
import { useEffect, useRef } from 'react';

const FormNumber = ({
  containOnBlur,
  max,
  min,
  onChange,
  value,
  ...props
}) => {
  const searchInput = useRef(null);
  useEffect(() => {
    searchInput.current.focus();
  }, []);
  return (
    <input
      ref={ searchInput }
      onBlur={ e => {
        if (!containOnBlur) {
          return;
        }

        const cur = e.target.value
          .replace(',', '.')
          .replace(/^\./, '0.');
        const newValue = parseFloat(cur);

        if (min !== null && newValue < min) {
          onChange(min);
        }
        else if (max !== null && newValue > max) {
          onChange(max);
        }
      } }
      onChange={ e => {
        const cur = e.target.value
          .replace(',', '.')
          .replace(/^\./, '0.');

        if (cur.endsWith('.') && cur.indexOf('.') !== cur.length - 1) {
          return;
        }

        if (!cur || /\.([0]{0,1})$/.test(cur)) {
          onChange(cur);
          return;
        }

        if (Number.isNaN(cur) || Number.isNaN(parseFloat(cur))) {
          return;
        }

        if (cur.includes('-')) {
          return;
        }

        if (cur.endsWith('.00')) {
          return;
        }

        if (String(cur).startsWith(value) && /\.([0-9]{2})$/.test(value)) {
          return;
        }

        const newValue = Math.round(parseFloat(cur) * (10 ** 2)) / (10 ** 2);
        if (!containOnBlur && min !== null && newValue < min) {
          onChange(min);
        }
        else if (!containOnBlur && max !== null && newValue > max) {
          onChange(max);
        }
        else {
          onChange(newValue);
        }
      } }
      type="text"
      value={ value ? String(value).replace('.', ',') : '' }
      { ...props }
    />
  );
};

FormNumber.number = value => Number(String(value).replace(/,/, '.'));

FormNumber.propTypes = {
  containOnBlur: bool,
  max: number,
  min: number,
  onChange: func.isRequired,
  value: oneOfType([ number, string ]),
};

FormNumber.defaultProps = {
  containOnBlur: false,
  max: null,
  min: null,
  value: '',
};

export default FormNumber;
