<template>
  <h2>Player {{ playerId }}</h2>
  <div>Healthpoints: {{ health }}</div>
  <div>Mana: {{ mana }}</div>
  <div>Number of cards: {{ hand.length }}</div>
  <br />
  <Deck :deck="deck" />
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

