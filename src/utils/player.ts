import { Player } from "@/models/Player";

const MAX_HAND_SIZE = 5;

export const isDeckEmpty = (player: Player): boolean =>
  player.deck.length === 0;
export const isHandFull = (player: Player): boolean =>
  player.hand.length === MAX_HAND_SIZE;
export const isDrawable = (player: Player): boolean =>
  !isDeckEmpty(player) && !isHandFull(player);
