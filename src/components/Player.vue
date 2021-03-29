<template>
  <div class="player-item">
    <h2>Player {{ playerId }}</h2>
    <div class="player-item-description">
      <span>Healthpoints: </span> {{ health }} <span>Mana: </span> {{ mana }}
      <span>Deck: </span>
      {{ deck.length }} cards
    </div>
    <Hand :hand="hand" :playerId="playerId" :context="context" />
  </div>
</template>

<script lang="ts">
import Hand from "./Hand.vue";
import { defineComponent, PropType } from "vue";
import { Context } from "@/types/types";

export default defineComponent({
  components: {
    Hand
  },
  props: {
    playerId: String,
    health: Number,
    mana: Number,
    hand: Array,
    deck: Array,
    context: Object as PropType<Context>
  }
});
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
