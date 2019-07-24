const addOne = num => num + 1;

const reduceByOne = num => num - 1;

const checkBestTime = (startDate, finishDate, bestTime) => {
  const timeUsed = Math.round(finishDate - startDate);
  if (bestTime === 0) {
    return timeUsed;
  }
  if (timeUsed < bestTime) {
    return timeUsed;
  }
  return bestTime;
};

const persistReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_FLIP':
      return {
        ...state,
        [payload.level]: {
          ...state[payload.level],
          totalFlips: addOne(state[payload.level].totalFlips),
        },
      };
    case 'ADD_MATCH':
      return {
        ...state,
        [payload.level]: {
          ...state[payload.level],
          totalMatches: addOne(state[payload.level].totalMatches),
        },
      };
    case 'ADD_WRONG_MATCH':
      return {
        ...state,
        [payload.level]: {
          ...state[payload.level],
          wrongMatches: addOne(state[payload.level].wrongMatches),
        },
      };
    case 'ADD_WIN':
      return {
        ...state,
        [payload.level]: {
          ...state[payload.level],
          wins: addOne(state[payload.level].wins),
          abandoned: reduceByOne(state[payload.level].abandoned),
        },
      };
    case 'ADD_ABANDON':
      return {
        ...state,
        [payload.level]: {
          ...state[payload.level],
          abandoned: addOne(state[payload.level].abandoned),
        },
      };
    case 'ADD_LOST':
      return {
        ...state,
        [payload.level]: {
          ...state[payload.level],
          lost: addOne(state[payload.level].lost),
          abandoned: reduceByOne(state[payload.level].abandoned),
        },
      };
    case 'FINISH_GAME':
      return {
        ...state,
        [payload.level]: {
          ...state[payload.level],
          bestTime: checkBestTime(
            payload.startDate,
            payload.finishDate,
            state[payload.level].bestTime,
          ),
        },
      };
    default:
      return state;
  }
};

export default persistReducer;
