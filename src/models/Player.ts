import { createDeck, Deck } from "@/models/Deck";
import { createHand } from "@/models/Hand";
import { Card } from "./Card";

const MAX_HEALTH = 30;
const START_MANA = 10;

export type Player = {
  id: string;
  health: number;
  mana: number;
  hand: Card[];
  deck: Deck;
};

export const createPlayer = (id: string): Player => {
  const deck = createDeck();
  const { hand, newDeck } = createHand(deck);

  return {
    id,
    health: MAX_HEALTH,
    mana: START_MANA,
    hand,
    deck: newDeck
  };
};
