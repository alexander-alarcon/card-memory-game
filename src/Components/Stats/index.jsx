import React, { useContext } from 'react';

import './index.css';

import { GameContext } from '../../store/GameContext';

const pad = (number, size) => {
  let s = String(number);
  while (s.length < (size || 2)) {
    s = `0${s}`;
  }
  return s;
};
const timeConverter = miliseconds => {
  const minutes = Math.floor(miliseconds / 60000);
  const seconds = Math.floor((miliseconds % 60000) / 1000);
  const mili = miliseconds % 1000;

  return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(mili, 3)}`;
};

function Stats(props) {
  const { persist } = useContext(GameContext);
  const levels = Object.keys(persist);

  const totals = levels.reduce(
    (acc, level) => {
      acc.wins += persist[level].wins;
      acc.lost += persist[level].lost;
      acc.abandoned += persist[level].abandoned;
      acc.flips += persist[level].totalFlips;
      acc.wrongMatches += persist[level].wrongMatches;
      acc.matches += persist[level].totalMatches;

      return acc;
    },
    { wins: 0, lost: 0, abandoned: 0, flips: 0, wrongMatches: 0, matches: 0 },
  );

  const bestTimes = levels.map(level => {
    return (
      <div className="flex" key={level}>
        <div className="Stats__Label">{`Best ${level.toLowerCase()}: `}</div>
        <div className="Stats__Value relative w-full relative w-full">
          <div className="Stats__Total absolute flex">
            {`${timeConverter(persist[level].bestTime)}`}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="Stats__Container w-full max-w-xl flex flex-col">
      <div className="Stats__Totals flex flex-col">
        <div className="Stats__Totals_scores">
          <div className="Stats flex">
            <div className="Stats__Label">Wins:</div>
            <div className="Stats__Value relative w-full relative w-full">
              <div className="Stats__Total absolute flex">{totals.wins}</div>
              <div className="Stats__Levels absolute flex">
                {levels.map(level => (
                  <span className="pl-1" key={`wins${level}`}>
                    {`${level[0]}: ${persist[level].wins}`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="Stats flex">
            <div className="Stats__Label">Lost:</div>
            <div className="Stats__Value relative w-full">
              <div className="Stats__Total absolute flex">{totals.lost}</div>
              <div className="Stats__Levels absolute flex">
                {levels.map(level => (
                  <span className="pl-1" key={`lost${level}`}>
                    {`${level[0]}: ${persist[level].lost}`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="Stats flex">
            <div className="Stats__Label">Left:</div>
            <div className="Stats__Value relative w-full">
              <div className="Stats__Total absolute flex">
                {totals.abandoned}
              </div>
              <div className="Stats__Levels absolute flex">
                {levels.map(level => (
                  <span className="pl-1" key={`left${level}`}>
                    {`${level[0]}: ${persist[level].abandoned}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="Stats__Totals_flips">
          <div className="Stats flex">
            <div className="Stats__Label">Flips:</div>
            <div className="Stats__Value relative w-full">
              <div className="Stats__Total absolute flex">{totals.flips}</div>
              <div className="Stats__Levels absolute flex">
                {levels.map(level => (
                  <span className="pl-1" key={`flips${level}`}>
                    {`${level[0]}: ${persist[level].totalFlips}`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="Stats flex">
            <div className="Stats__Label">Wrong Matches:</div>
            <div className="Stats__Value relative w-full">
              <div className="Stats__Total absolute flex">
                {totals.wrongMatches}
              </div>
              <div className="Stats__Levels absolute flex">
                {levels.map(level => (
                  <span className="pl-1" key={`wrongMatches_${level}`}>
                    {`${level[0]}: ${persist[level].wrongMatches}`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="Stats flex">
            <div className="Stats__Label">Matches:</div>
            <div className="Stats__Value relative w-full">
              <div className="Stats__Total absolute flex">{totals.matches}</div>
              <div className="Stats__Levels absolute flex">
                {levels.map((level, index) => (
                  <span className="pl-1" key={`totalMatches_${level}`}>
                    {`${level[0]}: ${persist[level].totalMatches}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Stats__BestTimes">{bestTimes}</div>
    </div>
  );
}

export default Stats;
