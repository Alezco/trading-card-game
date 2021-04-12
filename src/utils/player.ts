import { Player } from "@/models/Player";
import { Card } from "@/models/Card";

const MAX_HAND_SIZE = 5;

export const isDeckEmpty = (player: Player): boolean =>
  player.deck.length === 0;
export const isHandFull = (player: Player): boolean =>
  player.hand.length === MAX_HAND_SIZE;
export const isDrawable = (player: Player): boolean =>
  !isDeckEmpty(player) && !isHandFull(player);

export const getPlayerById = (players: Player[], id: string): Player => {
  return players.find(player => player.id === id) || null;
};

export const getNextPlayer = (players: Player[], id: string): Player => {
  let newActivePlayer;

  if (getPlayerById(players, id)) {
    players.map(player => {
      if (player.id !== id) {
        newActivePlayer = player;
      }
    });

    return newActivePlayer;
  }

  return null;
};

export const canPlayerPlayCard = (player: Player, card: Card): boolean =>
  player.mana >= card.mana;

export const removePlayerMana = (playerMana: number, mana: number): number =>
  playerMana - mana;
