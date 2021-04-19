import { createPlayer, Player } from "@/models/Player";
import {
  isDrawable,
  isDeckEmpty,
  isHandFull,
  getPlayerById,
  getNextPlayer,
  canPlayerPlayCard,
  removePlayerMana,
  removePlayerHealth
} from "@/utils/player";
import { isActivePlayer } from "@/utils/context";
import { removeHandCard } from "@/utils/hand";
import { Context, Steps } from "@/types/types";
import { Card } from "@/models/Card";

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

export const playCard = (player: Player, card: Card, context: Context) => {
  player.mana = removePlayerMana(player.mana, card.mana);
  player.hand = removeHandCard(player.hand, card.id);
  const nextPlayer = getNextPlayer(context.players, context.activePlayerId);
  nextPlayer.health = removePlayerHealth(nextPlayer.health, card.mana);
};

export const handleAction = (
  context: Context,
  card: Card,
  playerId: string
) => {
  if (isActivePlayer(playerId, context.activePlayerId)) {
    const player = getPlayerById(context.players, playerId);
    if (canPlayerPlayCard(player, card)) {
      playCard(player, card, context);
      console.log(`La carte ${card.id} a été jouée`);
    } else {
      console.warn("Tu n'as pas assez de mana");
    }
  } else {
    console.log("ISSOU C'EST PAS A TOI");
  }
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

const steps: Steps = {
  initRound: {
    label: "initRound",
    method: initRound
  },
  playerActions: {
    label: "playerActions",
    method: playerActions
  },
  endRound: {
    label: "endRound",
    method: endRound
  }
};

export const gameLoop = (context: Context): Context => {
  let finalContext;

  Object.values(steps).forEach(({ label: stepLabel, method: stepMethod }) => {
    console.log(`--------------------${stepLabel}---------------------`);
    console.log("before step", finalContext);
    finalContext = stepMethod(context);
    console.log("after step", finalContext);
    console.log(`--------------------/${stepLabel}---------------------`);
  });

  return finalContext;
};
