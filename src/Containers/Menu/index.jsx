import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import Button from '../../Components/Button';
import Range from '../../Components/Range';

function Menu({ handleInitGame, ...rest }) {
  const [customGrid, setCustomGrid] = useState(2);

  return (
    <div className="Menu flex flex-col items-center justify-center w-full max-w-xl">
      <p className="my-8 font-bold uppercase italic">Memory Game</p>
      <Button
        id="btn-easy"
        className="btn"
        handleClick={() => {
          handleInitGame(4, 60);
        }}
      >
        Easy
      </Button>
      <Button
        id="btn-medium"
        className="btn"
        handleClick={() => {
          handleInitGame(6, 180);
        }}
      >
        Medium
      </Button>
      <Button
        id="btn-hard"
        className="btn"
        handleClick={() => {
          handleInitGame(8, 300);
        }}
      >
        Hard
      </Button>
      <Button
        id="btn-custom"
        className="btn"
        handleClick={() => {
          const seconds = (customGrid * 60) / 4;
          handleInitGame(customGrid, seconds);
        }}
      >
        Custom
      </Button>
      <Range
        value={customGrid}
        handleChange={event => setCustomGrid(parseInt(event.target.value, 10))}
      />
    </div>
  );
}

Menu.propTypes = {
  handleInitGame: PropTypes.func.isRequired,
};

export default Menu;
