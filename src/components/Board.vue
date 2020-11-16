<template>
  <h1>Trading Card game</h1>
  <div class="player-container">
    <Player v-for="player in players"
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
import {initBoard} from "@/handlers/GameHandler";


export default {
  components: {
    Player
  },
  data: function() {
    return {
      players: []
    }
  },
  mounted: function() {
    const {players} = initBoard()
    this.players = players
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