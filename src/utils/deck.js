const backSide = 'X';
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

  return cards;
}
