import React from 'react';
import { PropTypes } from 'prop-types';

import Button from '../../Components/Button';

function Menu({ handleInitGame, ...rest }) {
  return (
    <div className="Menu flex flex-col items-center justify-center w-full max-w-xl">
      <p className="my-8 font-bold uppercase italic">Memory Game</p>
      <Button
        id="btn-easy"
        className="btn"
        handleClick={() => {
          handleInitGame(4);
        }}
      >
        Easy
      </Button>
      <Button
        id="btn-medium"
        className="btn"
        handleClick={() => {
          handleInitGame(6);
        }}
      >
        Medium
      </Button>
      <Button
        id="btn-hard"
        className="btn"
        handleClick={() => {
          handleInitGame(8);
        }}
      >
        Hard
      </Button>
    </div>
  );
}

Menu.propTypes = {
  handleInitGame: PropTypes.func.isRequired,
};

export default Menu;
