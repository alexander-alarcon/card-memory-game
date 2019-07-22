import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { PropTypes } from 'prop-types';

import './index.css';

import { GameContext } from '../../store/GameContext';
import GameStates from '../../constants/GameStates';

let countdown;

function Countdown({ isEnabled, onGameOver, progressBar }) {
  const fillEl = useRef(null);
  const { addLost, game } = useContext(GameContext);
  const [secondsLeft, setSecondsLeft] = useState(game.seconds);

  const displayTimer = useCallback(() => {
    if (progressBar) {
      const perc = secondsLeft / game.seconds;
      fillEl.current.style.transform = `scaleX(${perc})`;
    } else {
      const minutes = Math.floor(secondsLeft / 60);
      const remainder = secondsLeft % 60;
      const display = `${minutes}:${remainder < 10 ? '0' : ''}${remainder}`;
      fillEl.current.textContent = display;
    }
  }, [game.seconds, progressBar, secondsLeft]);

  useEffect(() => {
    clearInterval(countdown);

    const then = game.startDate + game.seconds * 1000;
    displayTimer();

    countdown = setInterval(() => {
      setSecondsLeft(Math.round((then - Date.now()) / 1000));
      if (secondsLeft < 1) {
        onGameOver();
        clearInterval(countdown);
        return;
      }

      if (game.gameState === GameStates.FINISHED) {
        clearInterval(countdown);
        return;
      }

      displayTimer();
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [
    game.seconds,
    game.gameState,
    displayTimer,
    onGameOver,
    game.startDate,
    secondsLeft,
    game.level,
    addLost,
  ]);

  return (
    <div className="w-full max-w-xl">
      {progressBar && (
        <div className="ProgressBar w-full max-w-xl bg-blue-500 p-1 rounded shadow">
          <span
            className="ProgressBar__Fill block h-2 rounded bg-blue-300"
            ref={fillEl}
          />
        </div>
      )}
      {progressBar || (
        <p className="w-full max-w-xl text-center" ref={fillEl} />
      )}
    </div>
  );
}

Countdown.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onGameOver: PropTypes.func.isRequired,
  progressBar: PropTypes.bool,
};

Countdown.defaultProps = {
  progressBar: true,
};

export default Countdown;
