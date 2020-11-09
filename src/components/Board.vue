<template>
  <h1>Trading Card game</h1>
  <Player v-for="player in players"
          :health="player.health"
          :hand="player.hand"
          :mana="player.mana"
          :key="player.id"
          :playerId="player.id"
          :deck="player.deck"/>
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
    this.players = initBoard()
  }
}
</script>
