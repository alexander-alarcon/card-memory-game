import React from 'react';
import { PropTypes } from 'prop-types';

import Button from '../../Components/Button';

import levels from '../../constants/Levels';

function Menu({ onInitGame, ...rest }) {
  return (
    <div className="Menu flex flex-col items-center justify-center w-full max-w-xl">
      <p className="my-8 font-bold uppercase italic">Memory Game</p>
      {levels.map(({ name, numCols, seconds }) => (
        <Button
          className="btn"
          id={`btn-${name}`}
          key={`btn-${name}`}
          onClick={() => {
            onInitGame(name, numCols, seconds);
          }}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}

Menu.propTypes = {
  onInitGame: PropTypes.func.isRequired,
};

export default Menu;
