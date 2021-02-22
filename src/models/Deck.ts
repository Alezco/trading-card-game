import { Card, createCard } from "@/models/Card";
import { shuffle } from "@/utils/arrays";

const cards: Deck = [
  { id: "Hassan", mana: 0 },
  { id: "Benjamin", mana: 0 },
  { id: "Matthias", mana: 1 },
  { id: "Julien", mana: 1 },
  { id: "Polo", mana: 2 },
  { id: "Gosia", mana: 2 },
  { id: "Kevin", mana: 2 },
  { id: "Martin", mana: 3 },
  { id: "Alexandre", mana: 3 },
  { id: "Antoine", mana: 3 },
  { id: "Cédric", mana: 3 },
  { id: "Constance", mana: 4 },
  { id: "Eddy", mana: 4 },
  { id: "Fabien", mana: 4 },
  { id: "Faissal", mana: 5 },
  { id: "Jawad", mana: 5 },
  { id: "JC", mana: 6 },
  { id: "Jordan", mana: 6 },
  { id: "Mike", mana: 7 },
  { id: "Marianne", mana: 8 }
];

export type Deck = Card[];

export const createDeck = (): Deck => {
  return shuffle(cards.map(card => createCard(card.id, card.mana)));
};
