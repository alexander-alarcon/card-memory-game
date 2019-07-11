import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Card({
  id,
  backSide,
  frontSide,
  isFlipped,
  handleClick,
  solved,
  disabled,
  ...rest
}) {
  const cardClasses = `Card relative w-full h-full ${
    !isFlipped ? 'flipped' : ''
  }`;
  return (
    <div
      className="Card__Container w-full h-full outline-none"
      role="button"
      aria-pressed="false"
      onClick={handleClick}
      onKeyDown={() => {}}
      tabIndex={0}
    >
      <div className={cardClasses}>
        <div className="Card__Front absolute w-full h-full bg-red-500">
          {frontSide}
        </div>
        <div className="Card__Back absolute w-full h-full bg-blue-500">
          {backSide}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  backSide: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  frontSide: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  isFlipped: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  solved: PropTypes.bool,
  disabled: PropTypes.bool,
};

Card.defaultProps = {
  isFlipped: false,
  solved: false,
  disabled: false,
};

export default Card;
