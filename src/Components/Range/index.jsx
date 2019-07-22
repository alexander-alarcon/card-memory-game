import React from 'react';
import PropTypes from 'prop-types';

function Range({ id, min, max, step, value, onChange, ...rest }) {
  let options = [];

  for (let index = min; index <= max; index += step) {
    const option = (
      <option key={`option-${index}`} value={index} label={index} />
    );
    options = [...options, option];
  }

  return (
    <div className="Range__Container mt-4 flex flex-col items-center justify-center">
      <output
        htmlFor={id}
        className="Range__Output flex items-center justify-center w-8 h-8 text-center text-white bg-blue-500 font-bold rounded-full mb-2"
      >
        {value}
      </output>

      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        {...rest}
        list="tickmarks"
        value={value}
        onChange={onChange}
      />

      <datalist id="tickmarks">{options}</datalist>
    </div>
  );
}

Range.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

Range.defaultProps = {
  id: 'range',
  min: 2,
  max: 10,
  step: 2,
};

export default Range;
