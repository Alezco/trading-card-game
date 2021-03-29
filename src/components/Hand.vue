<template>
  <div v-for="card in hand" :key="card.id" @click="handleAction(card)">
    {{ card.id }}: {{ card.mana }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { handleAction } from "@/handlers/GameHandler";
import { Context } from "@/types/types";

export default defineComponent({
  props: {
    hand: Array,
    playerId: String,
    context: Object as PropType<Context>
  },
  methods: {
    handleAction(card) {
      handleAction(this.context, card, this.playerId);
    }
  }
});
</script>
