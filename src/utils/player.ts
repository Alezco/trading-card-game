import { Players } from "@/types/types";
import { Player } from "@/models/Player";
import { Card } from "@/models/Card";

const MAX_HAND_SIZE = 5;

export const isDeckEmpty = (player: Player): boolean =>
  player.deck.length === 0;
export const isHandFull = (player: Player): boolean =>
  player.hand.length === MAX_HAND_SIZE;
export const isDrawable = (player: Player): boolean =>
  !isDeckEmpty(player) && !isHandFull(player);

export const getPlayerById = (players: Players, id: string): Player => {
  return players[id] || null;
};

export const getNextPlayer = (players: Players, id: string): Player => {
  if (!Object.keys(players).find(playerId => playerId === id)) {
    return null;
  }
  return Object.values(players).find(({ id: playerId }) => playerId !== id);
};

export const canPlayerPlayCard = (player: Player, card: Card): boolean =>
  player.mana >= card.mana;

export const removePlayerMana = (playerMana: number, mana: number): number =>
  playerMana - mana;

export const removePlayerHealth = (
  playerHealth: number,
  health: number
): number => playerHealth - health;
