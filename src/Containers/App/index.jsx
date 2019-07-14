import React, { useCallback, useEffect, useState, useRef } from 'react';

import Board from '../Board';
import initializeDeck from '../../utils/deck';

const nCards = 4;

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCards(initializeDeck(nCards));
  }, []);

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

  const handleFlip = useCallback(
    id => {
      setDisabled(true);
      if (flipped.length === 0) {
        setFlipped([...flipped, id]);
        setDisabled(false);
      } else {
        if (sameCardFlipped(id)) {
          setDisabled(false);
          return;
        }
        setFlipped([...flipped, id]);
        if (isMatch(id)) {
          setSolved([...solved, ...flipped, id]);
          resetCards();
        }
        setTimeout(resetCards, 500);
      }
    },
    [flipped, isMatch, sameCardFlipped, solved],
  );

  return (
    <div className="App w-screen h-screen">
      <Board
        cards={cards}
        flipped={flipped}
        handleFlip={handleFlip}
        disabled={disabled}
        solved={solved}
        numCols={nCards}
      />
    </div>
  );
}

export default App;
