import { Card, createCard } from "@/models/Card";
import { shuffle } from "@/utils/arrays";

const cards: Card[] = [
  { id: "Hassan", mana: 0, playerId: null },
  { id: "Benjamin", mana: 0, playerId: null },
  { id: "Matthias", mana: 1, playerId: null },
  { id: "Julien", mana: 1, playerId: null },
  { id: "Polo", mana: 2, playerId: null },
  { id: "Gosia", mana: 2, playerId: null },
  { id: "Kevin", mana: 2, playerId: null },
  { id: "Martin", mana: 3, playerId: null },
  { id: "Alexandre", mana: 3, playerId: null },
  { id: "Antoine", mana: 3, playerId: null },
  { id: "Cédric", mana: 3, playerId: null },
  { id: "Constance", mana: 4, playerId: null },
  { id: "Eddy", mana: 4, playerId: null },
  { id: "Fabien", mana: 4, playerId: null },
  { id: "Faissal", mana: 5, playerId: null },
  { id: "Jawad", mana: 5, playerId: null },
  { id: "JC", mana: 6, playerId: null },
  { id: "Jordan", mana: 6, playerId: null },
  { id: "Mike", mana: 7, playerId: null },
  { id: "Marianne", mana: 8, playerId: null }
];

export type Deck = {
  cards: Card[];
  playerId: string;
};

export const createDeck = (playerId: string): Deck => {
  return {
    cards: shuffle(cards.map(card => createCard(card.id, card.mana, playerId))),
    playerId
  };
};
