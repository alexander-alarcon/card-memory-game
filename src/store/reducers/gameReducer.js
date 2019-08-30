import GameStates from '../../constants/GameStates';
import initializeDeck from '../../utils/deck';

const gameReducer = (state, { type, payload }) => {
  switch (type) {
    case 'INIT_GAME':
      return {
        ...state,
        level: payload.level,
        numCols: payload.numCols,
        gameState: GameStates.PLAYING,
        seconds: payload.seconds,
        deck: initializeDeck(payload.numCols),
        isBoardEnabled: true,
        startDate: Date.now(),
      };
    case 'RESET_GAME':
      return {
        ...state,
        level: '',
        numCols: 0,
        seconds: 0,
        flipped: [],
        solved: [],
        deck: [],
        isBoardEnabled: false,
        gameState: GameStates.MENU,
      };
    case 'CLEAR_BOARD':
      return {
        ...state,
        flipped: [],
        solved: [],
      };
    case 'FINISH_GAME':
      return {
        ...state,
        finishDate: payload.finishDate,
        gameState: GameStates.FINISHED,
      };
    case 'ENABLE_BOARD':
      return {
        ...state,
        isBoardEnabled: true,
      };
    case 'DISABLE_BOARD':
      return {
        ...state,
        isBoardEnabled: false,
      };
    case 'ADD_FLIPPED_CARD':
      return {
        ...state,
        flipped: [...state.flipped, payload.id],
      };
    case 'REMOVE_FLIPPED_CARD':
      return {
        ...state,
        flipped: [],
      };
    case 'ADD_SOLVED_CARDS':
      return {
        ...state,
        solved: [...state.solved, state.flipped[0], payload.id],
      };
    default:
      return state;
  }
};

export default gameReducer;
