export type Card = {
  id: string;
  mana: number;
};

export const createCard = (id: string, mana: number): Card => ({
  id,
  mana
});
