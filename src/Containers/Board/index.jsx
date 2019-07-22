import React from 'react';
import { PropTypes } from 'prop-types';

import './index.css';
import Card from '../../Components/Card';

function Board({
  cards,
  onFlip,
  numCols,
  isEnabled,
  solvedCards,
  flippedCards,
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
        const isFlipped = flippedCards.includes(card.id);
        const isSolved = solvedCards.includes(card.id);
        const isBoardEnabled = isEnabled || isSolved;

        return (
          <Card
            id={card.id}
            type={card.type}
            isSolved={isSolved}
            isDisabled={isEnabled}
            backSide={card.backSide}
            frontSide={card.frontSide}
            isFlipped={isFlipped || isSolved}
            flippedkey={`${card.type}-${card.id}`}
            onClick={() => (isBoardEnabled ? onFlip(card.id) : null)}
          />
        );
      })}
    </div>
  );
}

Board.propTypes = {
  onFlip: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  numCols: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  solvedCards: PropTypes.arrayOf(PropTypes.string),
  flippedCards: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Board.defaultProps = {
  cards: [],
  solvedCards: [],
};

export default Board;
