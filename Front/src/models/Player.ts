import { createDeck, Deck } from "@/models/Deck";
import { createHand } from "@/models/Hand";
import { Card } from "./Card";
import { v4 as uuidv4 } from "uuid";

const MAX_HEALTH = 30;
const START_MANA = 0;

export type Player = {
  id: string;
  name: string;
  health: number;
  mana: number;
  hand: Card[];
  deck: Deck;
};

export const createPlayer = (name: string): Player => {
  const id = uuidv4();
  const deck = createDeck(id);
  const { hand, newDeck } = createHand(deck);

  return {
    id,
    name,
    health: MAX_HEALTH,
    mana: START_MANA,
    hand,
    deck: newDeck
  };
};
