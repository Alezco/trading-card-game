import { createPlayer, Player } from "@/models/Player";
import {
  canPlayerPlayCard,
  getNextPlayer,
  getPlayerById,
  isDeckEmpty,
  isDrawable,
  isHandFull,
  removePlayerHealth,
  removePlayerMana
} from "@/utils/player";
import { isActivePlayer } from "@/utils/context";
import { removeHandCard } from "@/utils/hand";
import { Context, Steps } from "@/types/types";
import { Card } from "@/models/Card";
import { createToast } from "mosha-vue-toastify";
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
  console.log(player);
  return drawCard(player);
};

const handleMana = (player: Player): Player => {
  return {
    ...player,
    mana: player.mana < MAX_MANA ? player.mana + 1 : MAX_MANA
  };
};

// export const playCard = (player: Player, card: Card, context: Context) => {
//   player.mana = removePlayerMana(player.mana, card.mana);
//   player.hand = removeHandCard(player.hand, card.id);
//   const nextPlayer = getNextPlayer(context.players, context.activePlayerId);
//   nextPlayer.health = removePlayerHealth(nextPlayer.health, card.mana);
// };
export const playCard = (player: Player, card: Card) => {
  const newPlayer = { ...player };
  if (!canPlayerPlayCard(player, card)) {
    return {
      error: {
        message: "Vous n'avez pas assez de mana"
      }
    };
  }

  newPlayer.mana = removePlayerMana(newPlayer.mana, card.mana);
  newPlayer.hand = removeHandCard(newPlayer.hand, card.id);
  return { newPlayer };
};

export const handleAction = (
  context: Context,
  card: Card,
  playerId: string
) => {
  return true;
};
// export const handleAction = (
//   context: Context,
//   card: Card,
//   playerId: string
// ) => {
//   if (isActivePlayer(playerId, context.activePlayerId)) {
//     const player = getPlayerById(context.players, playerId);
//     if (canPlayerPlayCard(player, card)) {
//       playCard(player, card, context);
//       createToast(`La carte ${card.id} a été jouée`);
//     } else {
//       createToast("Tu n'as pas assez de mana", { type: "danger" });
//     }
//   } else {
//     createToast("ISSOU C'EST PAS A TOI", { type: "danger" });
//   }
// };

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
