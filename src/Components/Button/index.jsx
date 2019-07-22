import React from 'react';
import PropTypes from 'prop-types';

function Button({ id, onClick, children, ...rest }) {
  return (
    <button type="button" id={id} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
