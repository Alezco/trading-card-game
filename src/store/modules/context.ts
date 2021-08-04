import { Context } from "../../types/types";
import { createPlayer } from "../../models/Player";
import {
  gameLoop,
  initRound,
  startPlayerRound,
  playCard
} from "@/handlers/GameHandler";

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
 * 2.1 - joue une carte
 * 2.1.1 - Vérifier que la bonne carte est jouée --> Card.ts
 * 3 - passer son tour
 */

const actions = {
  initRound: ({ commit, getters }) => {
    commit("updatePlayer", startPlayerRound(getters.getActivePlayer));
  },
  playCard: ({ commit, getters }, card) => {
    const { error, newPlayer } = playCard(getters.getActivePlayer, card);

    commit("updateError", error);
    if (!error) commit("updatePlayer", newPlayer);
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
