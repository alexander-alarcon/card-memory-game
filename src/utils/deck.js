const backSide = 'X';

const shuffleCards = cards => {
  const array = [...cards];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export default function initializeDeck() {
  let id = 0;
  const cards = ['A', 'B', 'C', 'D'].reduce((acc, type) => {
    acc.push({
      id: `${(id += 1)}`,
      type,
      backSide,
      frontSide: type,
    });
    acc.push({
      id: `${(id += 1)}`,
      type,
      backSide,
      frontSide: type,
    });
    return acc;
  }, []);

  return shuffleCards(cards);
}
