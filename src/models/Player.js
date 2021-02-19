import { createDeck } from "@/models/Deck";
import { createHand } from "@/models/Hand";

export const createPlayer = id => {
  const deck = createDeck();
  //TODO: change name value
  const hand = createHand(deck);

  return {
    id,
    health: 30,
    mana: 0,
    hand: hand.hand,
    deck: hand.newDeck
  };
};
