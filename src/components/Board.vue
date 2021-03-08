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
    />
  </div>
</template>

<script lang="ts">
import Player from "./Player.vue";
import { gameLoop, initBoard } from "@/handlers/GameHandler";
import { Context } from "@/types/types";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Player
  },
  data() {
    return {
      context: {} as Context
    };
  },
  mounted: function() {
    this.context = initBoard();
  },
  methods: {
    nextRound() {
      gameLoop(this.context);
    }
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
