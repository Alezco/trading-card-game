import { Context } from "../../types/types";
import { createPlayer } from "../../models/Player";
import { startPlayerRound, playCard } from "@/handlers/GameHandler";
import { getNextPlayer, removePlayerHealth } from "@/utils/player";

const player1 = createPlayer("Marianne");
const player2 = createPlayer("Hassan");

const state = (): Context => ({
  round: 1,
  players: {
    [player1.id]: player1,
    [player2.id]: player2
  },
  activePlayerId: player1.id,
  error: null,
  winner: null
});

// getters
const getters = {
  getRound: state => {
    return state.round;
  },
  getActivePlayerId: state => {
    return state.activePlayerId;
  },
  getActivePlayer: state => {
    return state.players[state.activePlayerId];
  },
  getPlayers: state => {
    return state.players;
  },
  getError: state => state.error,
  getWinner: state => state.players[state.winner]
};

// setters
const setters = {
  setRound: state => {
    state.round += 1;

    return state.round;
  }
};

// TODO
// quand un joueur joue une carte ouvrir un gif aleatoir de yugiho qui pose une carte

const actions = {
  initRound: ({ commit, getters }) => {
    commit("updatePlayer", startPlayerRound(getters.getActivePlayer));
  },
  playCard: ({ commit, getters, dispatch }, card) => {
    const { error, updatedPlayer } = playCard(getters.getActivePlayer, card);

    commit("updateError", error);
    if (error) return;
    commit("updatePlayer", updatedPlayer);

    const nextPlayer = getNextPlayer(
      getters.getPlayers,
      getters.getActivePlayer.id
    );

    let nextPlayerHealth = removePlayerHealth(nextPlayer.health, card.mana);

    if (nextPlayerHealth <= 0) {
      nextPlayerHealth = 0;
      dispatch("handleEndgame");
    }
    commit("updatePlayer", { ...nextPlayer, health: nextPlayerHealth });
  },
  endRound: ({ commit, getters, dispatch }) => {
    const { id } = getNextPlayer(
      getters.getPlayers,
      getters.getActivePlayer.id
    );
    commit("updateRound");
    commit("updateActivePlayerId", id);
    dispatch("initRound");
  },
  handleEndgame({ commit, getters }) {
    commit("updateWinner", getters.getActivePlayerId);
  }
};

const mutations = {
  updatePlayer: (state, payload) => {
    state.players[payload.id] = payload;
  },
  updateState: (state, payload) => {
    state = payload;
  },
  updateError: (state, payload) => {
    state.error = payload || null;
  },
  updateRound: state => {
    state.round += 1;
  },
  updateActivePlayerId: (state, payload) => {
    state.activePlayerId = payload;
  },
  updateWinner: (state, payload) => {
    state.winner = payload;
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
