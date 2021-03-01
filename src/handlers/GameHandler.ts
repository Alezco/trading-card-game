import { createPlayer, Player } from "@/models/Player";
import { isDrawable, isDeckEmpty, isHandFull } from "@/utils/player";
import { Context } from "@/types/types";

export const initBoard = (): Context => {
  const player1 = createPlayer("Pablo");
  const player2 = createPlayer("Yannick");

  return {
    round: 1,
    players: [player1, player2]
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

const handleHand = (context: Context): Context => {
  const { players } = context;

  return {
    ...context,
    players: players.map(player => drawCard(player))
  };
};

const handleMana = (context: Context): Context => {
  // TODO: handle mana
  return context;
};

export const initRound = (context: Context): Context => {
  let newContext = context;

  newContext = handleHand(context);
  newContext = handleMana(context);

  return newContext;
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
