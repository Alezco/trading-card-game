export const createHand = (deck) => {

  const [drawnCard0, drawnCard1, drawnCard2,...newDeck] = deck;

  return {
    hand: [drawnCard0, drawnCard1, drawnCard2],
    newDeck
  };
};
