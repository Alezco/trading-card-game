import { createPlayer, Player } from "@/models/Player";
import {
  canPlayerPlayCard,
  isDeckEmpty,
  isDrawable,
  isHandFull,
  removePlayerMana
} from "@/utils/player";
import { removeHandCard } from "@/utils/hand";
import { Context } from "@/types/types";
import { Card } from "@/models/Card";

const MAX_MANA = 10;

export const initBoard = (): Context => {
  const player1 = createPlayer("Pablo");
  const player2 = createPlayer("Yannick");

  return {
    round: 1,
    players: { [player1.id]: player1, [player2.id]: player2 },
    activePlayerId: player1.id,
    error: null
  };
};

const getNewPlayerWithPenalties = (player: Player): Player => {
  if (isDeckEmpty(player)) {
    return { ...player, health: player.health - 1 };
  }

  if (isHandFull(player)) {
    const [, ...newDeck] = player.deck.cards;
    return {
      ...player,
      deck: {
        ...player.deck,
        cards: newDeck
      }
    };
  }

  return player;
};

export const drawCard = (player: Player): Player => {
  let newPlayer;

  if (isDrawable(player)) {
    const [drawnCard, ...newDeck] = player.deck.cards;
    newPlayer = {
      ...player,
      deck: {
        ...player.deck,
        cards: newDeck
      },
      hand: [...player.hand, drawnCard]
    };
  } else {
    newPlayer = getNewPlayerWithPenalties(player);
  }

  return newPlayer;
};

const handleHand = (player: Player): Player => {
  return drawCard(player);
};

const handleMana = (player: Player): Player => {
  return {
    ...player,
    mana: player.mana < MAX_MANA ? player.mana + 1 : MAX_MANA
  };
};

export const playCard = (player: Player, card: Card) => {
  const updatedPlayer = { ...player };
  if (!canPlayerPlayCard(player, card)) {
    return {
      error: {
        message: "Vous n'avez pas assez de mana"
      }
    };
  }

  updatedPlayer.mana = removePlayerMana(updatedPlayer.mana, card.mana);
  updatedPlayer.hand = removeHandCard(updatedPlayer.hand, card.id);
  return { updatedPlayer };
};

export const startPlayerRound = (player: Player): Player => {
  let handledPlayer;
  handledPlayer = handleHand(player);
  handledPlayer = handleMana(handledPlayer);
  return handledPlayer;
};
