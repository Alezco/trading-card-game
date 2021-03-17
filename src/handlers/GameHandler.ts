import { createPlayer, Player } from "@/models/Player";
import {
  isDrawable,
  isDeckEmpty,
  isHandFull,
  getPlayerById,
  getNextPlayer
} from "@/utils/player";
import { Context } from "@/types/types";

const MAX_MANA = 10;

export const initBoard = (): Context => {
  const player1 = createPlayer("Pablo");
  const player2 = createPlayer("Yannick");

  return {
    round: 1,
    players: [player1, player2],
    activePlayerId: player1.id
  };
};

const getNewPlayerWithPenalties = (player: Player): Player => {
  if (isDeckEmpty(player)) {
    return { ...player, health: player.health - 1 };
  }

  if (isHandFull(player)) {
    const [, ...newDeck] = player.deck;
    return {
      ...player,
      deck: newDeck
    };
  }

  return player;
};

export const drawCard = (player: Player): Player => {
  let newPlayer;

  if (isDrawable(player)) {
    const [drawnCard, ...newDeck] = player.deck;
    newPlayer = {
      ...player,
      deck: newDeck,
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
  const newPlayer = {
    ...player,
    mana: player.mana < MAX_MANA ? player.mana + 1 : MAX_MANA
  };

  return newPlayer;
};

export const initRound = (context: Context): Context => {
  const previousPlayer = getPlayerById(context.players, context.activePlayerId);
  let nextPlayer = getNextPlayer(context.players, context.activePlayerId); // TODO : Utiliser previousPlayer pour récupérer le nextPlayer ?

  nextPlayer = handleHand(nextPlayer);
  nextPlayer = handleMana(nextPlayer);

  return {
    ...context,
    players: [previousPlayer, nextPlayer]
  };
};

export const playerActions = (context: Context): Context => {
  return context;
};

export const endRound = (context: Context): Context => {
  return context;
};

const steps = [initRound, playerActions, endRound];

export const gameLoop = (context: Context): Context => {
  let finalContext;

  steps.forEach(step => {
    console.log("before step", finalContext);
    finalContext = step(context);
    console.log("after", finalContext);
  });

  return finalContext;
};
