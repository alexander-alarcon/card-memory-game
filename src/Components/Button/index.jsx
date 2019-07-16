import React from 'react';
import PropTypes from 'prop-types';

function Button({ id, handleClick, children, ...rest }) {
  return (
    <button type="button" id={id} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
