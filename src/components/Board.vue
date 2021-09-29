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
  Error {{ error }}
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

    return {
      round,
      players,
      nextRound: () => store.dispatch("endRound"),
      error
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
</style>
