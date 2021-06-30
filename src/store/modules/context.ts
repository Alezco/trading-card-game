import { Context } from "../../types/types";
// import { createPlayer } from "../../models/Player";

const state = (): Context => ({
  round: 1,
  players: {},
  activePlayerId: null
});

// getters
const getters = {
  getRound: state => {
    return state.round;
  }
};

export default {
  state,
  namespace: true,
  getters
};
