<template>
  <div v-for="card in hand" :key="card.id">{{ card.id }}: {{ card.mana }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    hand: Array
  }
});
</script>
