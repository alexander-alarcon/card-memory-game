import React, { useCallback, useState } from 'react';

import Card from '../../Components/Card';

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);
  return (
    <div className="App w-screen h-screen">
      <Card
        id="card1"
        frontSide={<div>Ipsum</div>}
        backSide={<div>Lorem</div>}
        isFlipped={isFlipped}
        handleClick={handleFlip}
      />
    </div>
  );
}

export default App;
