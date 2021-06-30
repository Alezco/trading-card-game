<template>
  <h1>Trading Card game</h1>
  <h4>Round: {{ round }}</h4>
  <button @click="nextRound()">Fin du tour</button>
  <div class="player-container">
    <Player
      v-for="player in context.players"
      :key="player.id"
      :player="player"
      :context="context"
    />
  </div>
</template>

<script lang="ts">
import Player from "./Player.vue";
import { gameLoop, initBoard } from "@/handlers/GameHandler";
import { Context } from "@/types/types";
import { defineComponent, onMounted, reactive, watch, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Player
  },
  setup() {
    let context = reactive<Context>(initBoard());
    const store = useStore();

    const nextRound = () => {
      gameLoop(context);
    };

    const round = computed(() => store.getters.getRound);

    console.log(round);
    onMounted(() => {
      context = gameLoop(context);
    });

    watch(context, () => {
      console.log(context);
    });

    return {
      context,
      round,
      nextRound
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
