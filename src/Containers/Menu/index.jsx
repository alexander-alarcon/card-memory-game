import React from 'react';
import { PropTypes } from 'prop-types';

import Button from '../../Components/Button';
// import Range from '../../Components/Range';

// import { GameContext } from '../../store/GameContext';
import levels from '../../constants/Levels';

function Menu({ handleInitGame, ...rest }) {
  return (
    <div className="Menu flex flex-col items-center justify-center w-full max-w-xl">
      <p className="my-8 font-bold uppercase italic">Memory Game</p>
      {levels.map(({ name, numCols, seconds }) => (
        <Button
          key={`btn-${name}`}
          id={`btn-${name}`}
          className="btn"
          handleClick={() => {
            handleInitGame(name, numCols, seconds);
          }}
        >
          {name.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

Menu.propTypes = {
  handleInitGame: PropTypes.func.isRequired,
};

export default Menu;
