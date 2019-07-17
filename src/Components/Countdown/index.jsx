import React, { useCallback, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

import './index.css';

let countdown;

function Countdown({ seconds, enabled, progressBar }) {
  const fillEl = useRef(null);

  const updateWidth = useCallback(
    (totalSeconds, remainderSeconds) => {
      if (progressBar) {
        const perc = remainderSeconds / totalSeconds;
        fillEl.current.style.transform = `scaleX(${perc})`;
      } else {
        const minutes = Math.floor(remainderSeconds / 60);
        const secondsLeft = remainderSeconds % 60;
        const display = `${minutes}:${
          secondsLeft < 10 ? '0' : ''
        }${secondsLeft}`;
        fillEl.current.textContent = display;
      }
    },
    [progressBar],
  );

  const timer = useCallback(
    secs => {
      clearInterval(countdown);

      const now = Date.now();
      const then = now + secs * 1000;
      updateWidth(seconds, secs);

      countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0 || !enabled) {
          clearInterval(countdown);
          // callback();
          return;
        }

        updateWidth(seconds, secondsLeft);
      }, 1000);
    },
    [enabled, seconds, updateWidth],
  );

  useEffect(() => {
    timer(seconds);
  }, [seconds, timer]);

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
  seconds: PropTypes.number.isRequired,
  enabled: PropTypes.bool.isRequired,
  progressBar: PropTypes.bool,
};

Countdown.defaultProps = {
  progressBar: true,
};

export default Countdown;
