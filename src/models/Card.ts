export type Card = {
  id: string;
  mana: number;
  playerId: string;
};

export const createCard = (
  id: string,
  mana: number,
  playerId: string
): Card => ({
  id,
  mana,
  playerId
});
