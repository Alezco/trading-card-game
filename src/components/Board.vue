<template>
  <h1>Trading Card game</h1>
  <h4>Round: {{ context.round }}</h4>
  <button @click="nextRound()">Fin du tour</button>
  <div class="player-container">
    <Player
      v-for="player in context.players"
      :health="player.health"
      :hand="player.hand"
      :mana="player.mana"
      :key="player.id"
      :playerId="player.id"
      :deck="player.deck"
      :context="context"
    />
  </div>
</template>

<script lang="ts">
import Player from "./Player.vue";
import { gameLoop, initBoard } from "@/handlers/GameHandler";
import { Context } from "@/types/types";
import { defineComponent, onMounted, reactive, watch } from "vue";

export default defineComponent({
  components: {
    Player
  },
  setup() {
    let context = reactive<Context>(initBoard());

    const nextRound = () => {
      gameLoop(context);
    };

    onMounted(() => {
      context = gameLoop(context);
    });

    watch(context, () => {
      console.log(context);
    });

    return {
      context,
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
