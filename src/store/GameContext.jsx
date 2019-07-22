import React, { useCallback } from 'react';
import { usePersistReducer } from 'use-persist';
import { PropTypes } from 'prop-types';

import GameStates from '../constants/GameStates';
import Levels from '../constants/Levels';

import mainReducer from './reducers/mainReducer';

const levels = Levels.reduce(
  (acc, level) => ({
    ...acc,
    [level.name]: {
      lost: 0,
      wins: 0,
      abandoned: 0,
      totalFlips: 0,
      totalMatches: 0,
      wrongMatches: 0,
    },
  }),
  {},
);

const initialState = {
  game: {
    level: '',
    numCols: 0,
    seconds: 0,
    gameState: GameStates.MENU,
    flipped: [],
    solved: [],
    deck: [],
    isBoardEnabled: false,
    startDate: '',
  },
  persist: {
    ...levels,
  },
};

const persistenceSettings = {
  key: 'card-game',
  blacklist: {
    game: true,
  },
};

const GameContext = React.createContext(initialState);

function GameProvider({ children }) {
  const [state, dispatch] = usePersistReducer(
    persistenceSettings,
    mainReducer,
    initialState,
  );

  const initGame = useCallback(
    (level, numCols, seconds) => {
      dispatch({
        type: 'INIT_GAME',
        payload: {
          level,
          numCols,
          seconds,
        },
      });
    },
    [dispatch],
  );

  const resetGame = useCallback(() => {
    dispatch({
      type: 'RESET_GAME',
    });
  }, [dispatch]);

  const finishGame = useCallback(() => {
    dispatch({
      type: 'FINISH_GAME',
    });
  }, [dispatch]);

  const enableBoard = useCallback(() => {
    dispatch({
      type: 'ENABLE_BOARD',
    });
  }, [dispatch]);

  const disableBoard = useCallback(() => {
    dispatch({
      type: 'DISABLE_BOARD',
    });
  }, [dispatch]);

  const addOneFlip = useCallback(
    level => {
      dispatch({
        type: 'ADD_FLIP',
        payload: {
          level,
        },
      });
    },
    [dispatch],
  );

  const addOneMatch = useCallback(
    level => {
      dispatch({
        type: 'ADD_MATCH',
        payload: {
          level,
        },
      });
    },
    [dispatch],
  );

  const addWrongMatch = useCallback(
    level => {
      dispatch({
        type: 'ADD_WRONG_MATCH',
        payload: {
          level,
        },
      });
    },
    [dispatch],
  );

  const addWin = useCallback(
    level => {
      dispatch({
        type: 'ADD_WIN',
        payload: {
          level,
        },
      });
    },
    [dispatch],
  );

  const addAbandon = useCallback(
    level => {
      dispatch({
        type: 'ADD_ABANDON',
        payload: {
          level,
        },
      });
    },
    [dispatch],
  );

  const addLost = useCallback(
    level => {
      dispatch({
        type: 'ADD_LOST',
        payload: {
          level,
        },
      });
    },
    [dispatch],
  );

  const addFlippedCard = useCallback(
    id => {
      dispatch({
        type: 'ADD_FLIPPED_CARD',
        payload: {
          id,
        },
      });
    },
    [dispatch],
  );

  const removeFlippedCard = useCallback(
    id => {
      dispatch({
        type: 'REMOVE_FLIPPED_CARD',
      });
    },
    [dispatch],
  );

  const addSolvedCards = useCallback(
    id => {
      dispatch({
        type: 'ADD_SOLVED_CARDS',
        payload: {
          id,
        },
      });
    },
    [dispatch],
  );

  return (
    <GameContext.Provider
      value={{
        addAbandon,
        addFlippedCard,
        addLost,
        addOneFlip,
        addOneMatch,
        addSolvedCards,
        addWrongMatch,
        addWin,
        disableBoard,
        enableBoard,
        finishGame,
        initGame,
        removeFlippedCard,
        resetGame,
        ...state,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const GameConsumer = GameContext.Consumer;

export { GameContext, GameProvider, GameConsumer };
