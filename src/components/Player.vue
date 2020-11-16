<template>
<div class="player-item">
  <h2>Player {{ playerId }}</h2>
  <div class="player-item-description">
    <span>Healthpoints:</span> {{ health }} <span>Mana:</span> {{ mana }} <span>Number of cards:</span> {{ hand.length }}</div>
    <Deck :deck="deck" />
</div>
</template>

<script>
import Deck from "@/components/Deck";

export default {
  components: {
    Deck
  },
  props: {
    playerId: String,
    health: Number,
    mana: Number,
    hand: Array,
    deck: Array,
  },
}
</script>

<style scoped>
 .player-item-description {
   display: inline-flex;
   align-items: center;
 }
 .player-item-description span {
    font-weight: bold;
    padding-left: 8px;
  }
</style>