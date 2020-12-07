<template>
  <h1>Trading Card game</h1>
  <div class="player-container">
    <Player v-for="player in context.players"
            :health="player.health"
            :hand="player.hand"
            :mana="player.mana"
            :key="player.id"
            :playerId="player.id"
            :deck="player.deck"/>
  </div>
</template>

<script>
import Player from "@/components/Player";
import { initBoard, initRound, playerActions, endRound } from "@/handlers/GameHandler";


export default {
  components: {
    Player
  },
  data: function() {
    return {
      context: {}
    }
  },
  mounted: function() {
    this.context = initBoard();
    // this.context = gameLoop(this.context);
    this.context = initRound(this.context);
    this.context = playerActions(this.context);
    this.context = endRound(this.context);
  }
}
</script>


<style scoped>
  .player-container {
    display:flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
