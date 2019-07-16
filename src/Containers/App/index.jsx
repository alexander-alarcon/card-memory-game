import React, { useCallback, useContext, useEffect, useState } from 'react';

import Menu from '../Menu';
import Board from '../Board';

import initializeDeck from '../../utils/deck';

import { FlipContext } from '../../store/FlipContext';

import GameStates from '../../constants/GameStates';

function App() {
  const [gameState, setGameState] = useState(GameStates.MENU);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [numCols, setNumCols] = useState(2);

  const {
    addAbandon,
    addOneFlip,
    addOneMatch,
    addWin,
    addWrongMatch,
  } = useContext(FlipContext);

  useEffect(() => {
    setCards(initializeDeck(numCols));
  }, [numCols, cards.length]);

  const handleInitGame = useCallback(
    num => {
      setGameState(GameStates.PLAYING);
      setNumCols(num);
      addAbandon();
    },
    [addAbandon],
  );

  const sameCardFlipped = useCallback(id => flipped.includes(id), [flipped]);

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const isMatch = useCallback(
    id => {
      const clickedCard = cards.find(card => card.id === id);
      const flippedCard = cards.find(card => card.id === flipped[0]);
      return clickedCard.type === flippedCard.type;
    },
    [cards, flipped],
  );

  const resetValues = useCallback(() => {
    setCards([]);
  }, []);

  const checkWin = useCallback(() => {
    if (solved.length === numCols * numCols - 2) {
      addWin();
      setTimeout(() => setSolved([]), 500);
      resetCards();
      setTimeout(() => {
        setGameState(GameStates.MENU);
        resetValues();
      }, 1200);
    }
  }, [addWin, numCols, resetValues, solved.length]);

  const handleFlip = useCallback(
    id => {
      setDisabled(true);
      if (flipped.length === 0) {
        setFlipped([id]);
        setDisabled(false);
        addOneFlip();
      } else {
        if (sameCardFlipped(id)) {
          setDisabled(false);
          return;
        }
        setFlipped([flipped[0], id]);
        if (isMatch(id)) {
          setSolved([...solved, flipped[0], id]);
          addOneMatch();
          checkWin();
          resetCards();
        } else {
          addWrongMatch();
        }
        addOneFlip();
        setTimeout(resetCards, 500);
      }
    },
    [
      addOneFlip,
      addOneMatch,
      addWrongMatch,
      checkWin,
      flipped,
      isMatch,
      sameCardFlipped,
      solved,
    ],
  );

  return (
    <div className="App w-screen h-screen flex items-center justify-center">
      {gameState === GameStates.MENU && (
        <Menu handleInitGame={handleInitGame} />
      )}
      {gameState === GameStates.PLAYING && (
        <Board
          cards={cards}
          flipped={flipped}
          handleFlip={handleFlip}
          disabled={disabled}
          solved={solved}
          numCols={numCols}
        />
      )}
    </div>
  );
}

export default App;
