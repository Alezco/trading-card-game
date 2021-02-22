import { Card } from "./Card";
import { Deck } from "./Deck";

export type Hand = {
  hand: Card[];
  newDeck: Deck;
};

export const createHand = (deck: Deck): Hand => {
  const [drawnCard0, drawnCard1, drawnCard2, ...newDeck] = deck;

  return {
    hand: [drawnCard0, drawnCard1, drawnCard2],
    newDeck
  };
};
