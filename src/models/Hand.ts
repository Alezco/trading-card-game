import { Card } from "./Card";
import { Deck } from "./Deck";

// TODO: think about Hand.hand ? hand = card[] change maybe
export type Hand = {
  hand: Card[];
  newDeck: Deck;
};

export const createHand = (deck: Deck): Hand => {
  const [drawnCard0, drawnCard1, drawnCard2, ...newDeck] = deck.cards;

  return {
    hand: [drawnCard0, drawnCard1, drawnCard2],
    newDeck: {
      ...deck,
      cards: newDeck
    }
  };
};
