import { usePersistReducer } from 'use-persist';
import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

const initialState = {
  totalFlips: 0,
  totalMatches: 0,
  wrongMatches: 0,
  wins: 0,
};

const persistenceSettings = {
  key: 'card-game',
};

const addOne = num => num + 1;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_FLIP':
      return {
        ...state,
        totalFlips: addOne(state.totalFlips),
      };
    case 'ADD_MATCH':
      return {
        ...state,
        totalMatches: addOne(state.totalMatches),
      };
    case 'ADD_WRONG_MATCH':
      return {
        ...state,
        wrongMatches: addOne(state.wrongMatches),
      };
    case 'ADD_WIN':
      return {
        ...state,
        wins: addOne(state.wins),
      };
    default:
      return state;
  }
};

const FlipContext = React.createContext(initialState);

function FlipProvider({ children }) {
  const [state, dispatch] = usePersistReducer(
    persistenceSettings,
    reducer,
    initialState,
  );

  const addOneFlip = useCallback(() => {
    dispatch({
      type: 'ADD_FLIP',
    });
  }, [dispatch]);

  const addOneMatch = useCallback(() => {
    dispatch({
      type: 'ADD_MATCH',
    });
  }, [dispatch]);

  const addWrongMatch = useCallback(() => {
    dispatch({
      type: 'ADD_WRONG_MATCH',
    });
  }, [dispatch]);

  const addWin = useCallback(() => {
    dispatch({
      type: 'ADD_WIN',
    });
  }, [dispatch]);

  return (
    <FlipContext.Provider
      value={{
        addOneFlip,
        addOneMatch,
        addWrongMatch,
        addWin,
        ...state,
      }}
    >
      {children}
    </FlipContext.Provider>
  );
}

FlipProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const FlipConsumer = FlipContext.Consumer;

export { FlipContext, FlipProvider, FlipConsumer };
