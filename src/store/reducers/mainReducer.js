import gameReducer from './gameReducer';
import persistReducer from './persistReducer';

const mainReducer = (state, action) => {
  return {
    game: gameReducer(state.game, action),
    persist: persistReducer(state.persist, action),
  };
};

export default mainReducer;
