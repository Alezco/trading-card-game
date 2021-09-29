import { createPlayer, Player } from "@/models/Player";
import {
  canPlayerPlayCard,
  getNextPlayer,
  getPlayerById,
  isDeckEmpty,
  isDrawable,
  isHandFull,
  removePlayerMana
} from "@/utils/player";
import { removeHandCard } from "@/utils/hand";
import { Context, Steps } from "@/types/types";
import { Card } from "@/models/Card";
import { useStore } from "vuex";

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

export const initRound = (context: Context): Context => {
  // TODO : Check reactivity on player after handleHand and HandleMana funcs
  let activePlayer = getPlayerById(context.players, context.activePlayerId);

  // activePlayer = Object.assign(handleHand(activePlayer), activePlayer);
  // console.log('afterHandleHand', activePlayer);
  activePlayer = handleMana(activePlayer);
  // console.log('afterHandleMana', activePlayer);

  const nextPlayer = getNextPlayer(context.players, context.activePlayerId);

  return {
    ...context,
    players: {
      [activePlayer.id]: activePlayer,
      [nextPlayer.id]: nextPlayer
    }
  };
};

export const startPlayerRound = (player: Player): Player => {
  let handledPlayer;
  handledPlayer = handleHand(player);
  handledPlayer = handleMana(handledPlayer);
  return handledPlayer;
};

export const playerActions = (context: Context): Context => {
  return context;
};

export const endRound = (context: Context): Context => {
  const previousPlayer = getPlayerById(context.players, context.activePlayerId);
  const nextPlayer = getNextPlayer(context.players, context.activePlayerId);

  return {
    round: context.round + 1,
    players: {
      [previousPlayer.id]: previousPlayer,
      [nextPlayer.id]: nextPlayer
    },
    activePlayerId: nextPlayer.id,
    error: null
  };
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

export const gameLoop = () => {
  const store = useStore();

  store.dispatch("initRound");

  // let finalContext = context;

  // Object.values(steps).forEach(({ label: stepLabel, method: stepMethod }) => {
  //   console.log(`--------------------${stepLabel}---------------------`);
  //   console.log("before step", finalContext);
  //   finalContext = stepMethod(finalContext);
  //   console.log("after step", finalContext);
  //   console.log(`--------------------/${stepLabel}---------------------`);
  // });

  // return finalContext;
};
