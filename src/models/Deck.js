import { createCard } from "@/models/Card";

export const createDeck = () => {
  const cards = [
    { id: "Hassan", mana: 0 },
    { id: "Benjamin", mana: 0 },
    { id: "Matthias", mana: 1 },
    { id: "Marianne", mana: 8 },
  ];
  return cards.map((card) => createCard(card.id, card.mana));
};
