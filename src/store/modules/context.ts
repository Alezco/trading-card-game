import { Context } from "../../types/types";
import { createPlayer } from "../../models/Player";

const player1 = createPlayer("Marianne");
const player2 = createPlayer("Hassan");

const state = (): Context => ({
  round: 1,
  players: {
    [player1.id]: player1,
    [player2.id]: player2
  },
  activePlayerId: player1.id
});

// getters
const getters = {
  getRound: state => {
    return state.round;
  },
  getPlayers: state => {
    return state.players;
  }
};

// getters
const setters = {
  setRound: state => {
    state.round += 1;

    return state.round;
  }
};

export default {
  state,
  namespace: true,
  getters,
  setters
};
