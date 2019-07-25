import React, { useCallback, useContext } from 'react';

import Menu from '../Menu';
import Board from '../Board';

import { GameContext } from '../../store/GameContext';

import GameStates from '../../constants/GameStates';

import Countdown from '../../Components/Countdown';
import Stats from '../../Components/Stats';

function App() {
  const {
    game,
    addWin,
    addLost,
    initGame,
    resetGame,
    addAbandon,
    addOneFlip,
    finishGame,
    addOneMatch,
    enableBoard,
    disableBoard,
    addWrongMatch,
    addFlippedCard,
    addSolvedCards,
    removeFlippedCard,
  } = useContext(GameContext);

  const handleInitGame = useCallback(
    (level, num, secs) => {
      initGame(level, num, secs);
      addAbandon(level);
    },
    [addAbandon, initGame],
  );

  const sameCardFlipped = useCallback(id => game.flipped.includes(id), [
    game.flipped,
  ]);

  const isMatch = useCallback(
    id => {
      const clickedCard = game.deck.find(card => card.id === id);
      const flippedCard = game.deck.find(card => card.id === game.flipped[0]);
      return clickedCard.type === flippedCard.type;
    },
    [game.deck, game.flipped],
  );

  const checkWin = useCallback(() => {
    if (game.solved.length === game.numCols * game.numCols - 2) {
      addWin(game.level);
      finishGame(game.level, game.startDate, Date.now());
      setTimeout(() => {
        // checkBestTime();
        resetGame();
      }, 1200);
    }
  }, [
    addWin,
    finishGame,
    game.level,
    game.numCols,
    game.solved.length,
    game.startDate,
    resetGame,
  ]);

  const checkGameOver = useCallback(() => {
    if (
      game.solved.length !== game.numCols * game.numCols - 2 &&
      game.gameState === GameStates.PLAYING
    ) {
      addLost(game.level);
      finishGame(game.level, game.startDate, Date.now());
      setTimeout(() => {
        resetGame();
      }, 1200);
    }
  }, [
    addLost,
    finishGame,
    game.gameState,
    game.level,
    game.numCols,
    game.solved.length,
    game.startDate,
    resetGame,
  ]);

  const handleFlip = useCallback(
    id => {
      disableBoard();
      if (game.flipped.length === 0) {
        addOneFlip(game.level);
        addFlippedCard(id);
        enableBoard();
      } else {
        addOneFlip(game.level);
        if (sameCardFlipped(id)) {
          enableBoard();
          return;
        }
        addFlippedCard(id);
        if (isMatch(id)) {
          addOneMatch(game.level);
          addSolvedCards(id);
          removeFlippedCard();
          checkWin();
          enableBoard();
        } else {
          addWrongMatch(game.level);
          setTimeout(() => {
            removeFlippedCard();
          }, 500);
          enableBoard();
        }
      }
    },
    [
      addFlippedCard,
      addOneFlip,
      addOneMatch,
      addSolvedCards,
      addWrongMatch,
      checkWin,
      disableBoard,
      enableBoard,
      game,
      isMatch,
      removeFlippedCard,
      sameCardFlipped,
    ],
  );

  return (
    <div className="App w-screen h-screen flex flex-col items-center justify-center">
      {game.gameState === GameStates.MENU && (
        <React.Fragment>
          <Menu onInitGame={handleInitGame} />
          <Stats />
        </React.Fragment>
      )}
      {game.gameState === GameStates.PLAYING && (
        <React.Fragment>
          <Board
            cards={game.deck}
            onFlip={handleFlip}
            numCols={game.numCols}
            solvedCards={game.solved}
            flippedCards={game.flipped}
            isEnabled={game.isBoardEnabled}
          />
          <Countdown
            progressBar={false}
            seconds={game.seconds}
            onGameOver={checkGameOver}
            isEnabled={game.gameState === GameStates.PLAYING}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
