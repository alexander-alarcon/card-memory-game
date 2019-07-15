import React, { useCallback, useContext, useEffect, useState } from 'react';

import Board from '../Board';
import initializeDeck from '../../utils/deck';

import { FlipContext } from '../../store/FlipContext';

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [numCols, setNumCols] = useState(2);

  const { addOneFlip, addOneMatch, addWin, addWrongMatch, wins } = useContext(
    FlipContext,
  );

  useEffect(() => {
    setCards(initializeDeck(numCols));
  }, [numCols]);

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
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
  }, []);

  const checkWin = useCallback(() => {
    if (solved.length === numCols * numCols - 2) {
      addWin();
      resetValues();
      setNumCols(numCols + 2);
      setCards(initializeDeck(numCols));
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
      <Board
        cards={cards}
        flipped={flipped}
        handleFlip={handleFlip}
        disabled={disabled}
        solved={solved}
        numCols={numCols}
      />
    </div>
  );
}

export default App;
