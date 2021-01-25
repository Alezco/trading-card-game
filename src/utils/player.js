const MAX_HAND_SIZE = 5;

export const isDeckEmpty = (player) => player.deck.length === 0;
export const isHandFull = (player) => player.hand.length === MAX_HAND_SIZE;
export const isDrawable = (player) => !isDeckEmpty(player) && !isHandFull(player);
