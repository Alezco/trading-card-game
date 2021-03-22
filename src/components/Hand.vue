<template>
  <div v-for="card in hand" :key="card.id" @click="handleAction(card)">
    {{ card.id }}: {{ card.mana }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { handleAction } from "@/handlers/GameHandler";

export default defineComponent({
  props: {
    hand: Array
  },
  methods: {
    handleAction(card) {
      handleAction(card);
    }
  }
});
</script>
