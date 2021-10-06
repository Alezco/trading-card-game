<template>
  <h1>Trading Card game</h1>
  <h4>Round: {{ round }}</h4>
  <button @click="nextRound()">Fin du tour</button>
  <div class="player-container">
    <Player
      v-for="player in players"
      :key="player.id"
      :player="player"
      :context="context"
    />
  </div>
  <div v-if="error">Error {{ error }}</div>
  <div class="winner-block" v-if="winner">
    Le Vainqueur est : <br />
    {{ winner.name }}
  </div>
</template>

<script lang="ts">
import Player from "./Player.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Player
  },
  setup() {
    const store = useStore();

    const round = computed(() => store.getters.getRound);
    const players = computed(() => store.getters.getPlayers);
    const error = computed(() => store.getters.getError);
    const winner = computed(() => store.getters.getWinner);

    return {
      round,
      players,
      nextRound: () => store.dispatch("endRound"),
      error,
      winner
    };
  }
});
</script>

<style scoped>
.player-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.winner-block {
  align-items: center;
  background: green;
  border-radius: 5px;
  color: white;
  display: flex;
  font-size: 36px;
  font-weight: 800;
  height: 50vh;
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 50vw;
}
</style>
