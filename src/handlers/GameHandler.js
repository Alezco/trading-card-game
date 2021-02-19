import { createPlayer } from "@/models/Player";
import { isDrawable, isDeckEmpty, isHandFull } from "@/utils/player";

export const initBoard = () => {
  const player1 = createPlayer("Pablo");
  const player2 = createPlayer("Yannick");

  return {
    round: 0,
    players: [player1, player2]
  };
};

const getNewPlayerWithPenalties = player => {
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

export const drawCard = player => {
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

const handleHand = context => {
  const { players } = context;

  return {
    ...context,
    players: players.map(player => drawCard(player))
  };
};

const handleMana = context => {
  // TODO: handle mana
  return context;
};

export const initRound = context => {
  let newContext = context;

  newContext = handleHand(context);
  newContext = handleMana(context);

  return newContext;
};

export const playerActions = context => {
  return context;
};

export const endRound = context => {
  return context;
};

// const steps = [
//     initRound,
//     playerActions,
//     endRound
// ]

// export const gameLoop = context => {
//     let finalContext;

//     steps.forEach( step => {
//         console.log('before step', finalContext);
//         finalContext = step(context)
//         console.log('after', finalContext);
//     } );

//     return finalContext;
// }
