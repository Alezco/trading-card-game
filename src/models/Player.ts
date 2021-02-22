import { createDeck, Deck } from "@/models/Deck";
import { createHand } from "@/models/Hand";
import { Card } from "./Card";

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
    health: 30,
    mana: 0,
    hand,
    deck: newDeck
  };
};
