import { Context } from "../../types/types";
import { createPlayer } from "../../models/Player";
import { gameLoop, initRound, startPlayerRound } from "@/handlers/GameHandler";

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
  getActivePlayer: state => {
    return state.players[state.activePlayerId];
  },
  getPlayers: state => {
    return state.players;
  }
};

// setters
const setters = {
  setRound: state => {
    state.round += 1;

    return state.round;
  }
};

/**
 * Les actions d'un TCG :
 *
 * 1 - mise en place du tour d'un joueur
 * 1.1 - Piocher
 * 1.2 - gérer le mana
 * 2 - le tour du joueur
 * 2.1 - joue une carte
 * 3 - passer son tour
 */

const actions = {
  initRound: ({ commit, getters }) => {
    commit("updatePlayer", startPlayerRound(getters.getActivePlayer));
  }
};

const mutations = {
  updatePlayer: (state, payload) => {
    state.players[payload.id] = payload;
  },
  updateState: (state, payload) => {
    state = payload;
  }
};

export default {
  state,
  namespace: true,
  getters,
  setters,
  actions,
  mutations
};
