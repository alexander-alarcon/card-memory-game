import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function Card({
  id,
  onClick,
  backSide,
  isSolved,
  frontSide,
  isFlipped,
  isDisabled,
  ...rest
}) {
  const cardClasses = `Card absolute w-full h-full rounded-lg ${
    !isFlipped ? 'flipped' : ''
  }`;

  return (
    <div
      className="Card__Container outline-none rounded-lg"
      role="button"
      aria-pressed="false"
      onClick={onClick}
      onKeyDown={() => {}}
      tabIndex={0}
    >
      <div className={cardClasses}>
        <div className="Card__Front absolute flex items-center justify-center w-full h-full rounded-lg text-center leading-loose font-bold bg-red-500">
          <svg
            className="fill-current bg-blue-300 text-white w-full h-full rounded-lg"
            viewBox="0 0 24 24"
          >
            <text x="50%" y="50%" textAnchor="middle" dy="0.36em">
              {frontSide}
            </text>
          </svg>
        </div>
        <div className="Card__Back absolute flex items-center justify-center w-full h-full rounded-lg text-center leading-loose font-bold bg-blue-500">
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
  onClick: PropTypes.func.isRequired,
  isSolved: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Card.defaultProps = {
  isFlipped: false,
  isSolved: false,
  isDisabled: false,
};

export default Card;
