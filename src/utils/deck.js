const backSide = ' ';

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

const createCards = num => {
  const totalCards = (num * num) / 2;
  const cards = [...Array(totalCards).keys()];
  return cards;
};

export default function initializeDeck(nCards) {
  let id = 0;
  let cards = createCards(nCards);
  cards = cards.reduce((acc, type) => {
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
