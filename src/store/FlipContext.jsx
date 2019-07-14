import React, { useCallback, useReducer } from 'react';
import { PropTypes } from 'prop-types';

const initialState = {
  totalFlips: 0,
  totalMatches: 0,
  wrongMatches: 0,
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
    default:
      return state;
  }
};

const FlipContext = React.createContext(initialState);

function FlipProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addOneFlip = useCallback(() => {
    dispatch({
      type: 'ADD_FLIP',
    });
  }, []);

  const addOneMatch = useCallback(() => {
    dispatch({
      type: 'ADD_MATCH',
    });
  }, []);

  const addWrongMatch = useCallback(() => {
    dispatch({
      type: 'ADD_WRONG_MATCH',
    });
  }, []);

  return (
    <FlipContext.Provider
      value={{
        addOneFlip,
        addOneMatch,
        addWrongMatch,
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
