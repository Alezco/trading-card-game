<template>
  <div class="player-item">
    <h2>{{ player.name }}</h2>
    <div class="player-item-description">
      <span>Healthpoints: </span> {{ player.health }} <span>Mana: </span>
      {{ player.mana }}
      <span>Deck: </span>
      {{ player.deck.length }} cards
    </div>
    <Hand :hand="player.hand" :playerId="player.id" :context="context" />
  </div>
</template>

<script lang="ts">
import Hand from "./Hand.vue";
import { defineComponent, PropType } from "vue";
import { Context } from "@/types/types";
import type {Player} from "@/models/Player"

export default defineComponent({
  components: {
    Hand
  },
  props: {
    player: Object as PropType<Player>,
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
