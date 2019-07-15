import React from 'react';
import { PropTypes } from 'prop-types';

import './index.css';
import Card from '../../Components/Card';

function Board({
  cards,
  flipped,
  handleFlip,
  disabled,
  solved,
  numCols,
  ...rest
}) {
  return (
    <div
      className="Board w-full max-w-xl"
      style={{
        '--grid-columns': numCols,
      }}
    >
      {cards.map(card => {
        const isFlipped = flipped.includes(card.id);
        const isSolved = solved.includes(card.id);
        const isDisabled = disabled || isSolved;

        return (
          <Card
            key={`${card.type}-${card.id}`}
            id={card.id}
            type={card.type}
            frontSide={card.frontSide}
            backSide={card.backSide}
            isFlipped={isFlipped || isSolved}
            solved={isSolved}
            disabled={isDisabled}
            handleClick={() => (isDisabled ? null : handleFlip(card.id))}
          />
        );
      })}
    </div>
  );
}

Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  flipped: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFlip: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  solved: PropTypes.arrayOf(PropTypes.string),
  numCols: PropTypes.number.isRequired,
};

Board.defaultProps = {
  cards: [],
  solved: [],
};

export default Board;
