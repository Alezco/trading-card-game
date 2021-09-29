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
  error: null
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
  getError: state => state.error
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
 * 1.1 - Piocher -- DONE
 * 1.2 - gérer le mana -- DONE
 * 2 - le tour du joueur
 * 2.1 - joue une carte - DONE
 * 2.1.1 - Vérifier que la bonne carte est jouée DONE
 * 3 - passer son tour -- DONE
 */

const actions = {
  initRound: ({ commit, getters }) => {
    commit("updatePlayer", startPlayerRound(getters.getActivePlayer));
  },
  playCard: ({ commit, getters }, card) => {
    const { error, updatedPlayer } = playCard(getters.getActivePlayer, card);

    commit("updateError", error);
    if (error) return;
    commit("updatePlayer", updatedPlayer);
    const nextPlayer = getNextPlayer(
      getters.getPlayers,
      getters.getActivePlayer.id
    );
    const nextPlayerHealth = removePlayerHealth(nextPlayer.health, card.mana);
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
