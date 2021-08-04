<template>
  <div v-for="card in hand" :key="card.id" @click="playCard(card)">
    {{ card.id }}: {{ card.mana }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { handleAction } from "@/handlers/GameHandler";
import { Context } from "@/types/types";
import { mapActions } from "vuex";

export default defineComponent({
  props: {
    hand: Array,
    playerId: String,
    context: Object as PropType<Context>
  },
  methods: {
    ...mapActions({
      playCard: "playCard"
    }),
    handleAction(card) {
      handleAction(this.context, card, this.playerId);
    }
  }
});
</script>
